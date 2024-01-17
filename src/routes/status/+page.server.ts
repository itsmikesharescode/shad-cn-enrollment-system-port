import type { ZodError } from "zod";
import type { Actions, PageServerLoad } from "./$types";
import { updateApplicationSchema, deleteApplicationSchema } from "$lib/server-schemas/status";
import { fail, redirect } from "@sveltejs/kit";
import type { PostgrestError } from "@supabase/supabase-js";

const applicationQuery = "id, created_at,application_type, course, present_address, religion, date_of_birth, fathers_name, mothers_name, primary_school_name, primary_school_address, primary_graduation_date, secondary_school_name, secondary_school_address, secondary_graduation_date";

export const load: PageServerLoad = async ({locals: {supabase, getSession}}) => {
    
    const session = await getSession();

    if(session){
        const {data:isAdmin, error:isAdminError} = await supabase.rpc("is_admin") as {data: boolean, error: PostgrestError | null};
        if(isAdmin) throw redirect(302, "/?error=you-are-not-allowed");
        else{
            const {data: application, error: applicationError} = await supabase.from("application_tb")
            .select(applicationQuery)
            .eq("user_id", session.user.id);

            if(application) return {application, session};
            else if(applicationError) throw redirect(302, "/?connection-lost-try-again");
        };
        

    }else throw redirect(302, "/signin?error=You-have-to-login");
};

export const actions: Actions = {

    updateApplication: async ({request, locals: {supabase, getSession}}) =>
    {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = updateApplicationSchema.parse(formData);
            const session = await getSession();
            
            if(session){

                const {error: insertError} = await supabase.from("application_tb").update([{
                    present_address: result.presentAddress,
                    religion: result.religion,
                    date_of_birth: result.dateOfBirth,
                    fathers_name: result.fName,
                    mothers_name: result.mName,
                    primary_school_name: result.primarySchoolName,
                    primary_school_address: result.primarySchoolAddress,
                    primary_graduation_date: result.primaryGraduation,
                    secondary_school_name: result.secondarySchoolName,
                    secondary_school_address: result.secondarySchoolAddress,
                    secondary_graduation_date: result.secondaryGraduation
                }]).eq("user_id", session.user.id);

                if(insertError) return fail(402, {msg: insertError.message});

                else {
                    const {data:application, error:applicationError} = await supabase.from("application_tb").select(applicationQuery).eq("user_id", session.user.id);
                    if(applicationError) return fail(402, {msg: applicationError.message});
                    else if(application) return fail(200, {msg: "Successfully updated application.", application: application[0], session});
                };


            }else throw redirect(302, "/signin?error=You-have-to-login");
            
        } catch (error) {

            const zodError = error as ZodError;
            const {fieldErrors} = zodError.flatten();
            return fail(403, {errors: fieldErrors});

        }
    },

    deleteApplication: async ({request, locals: {supabase}}) =>
    {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = deleteApplicationSchema.parse(formData);

            const {data:{session}, error:deleteError} = await supabase.auth.signInWithPassword({email: result.email, password: result.password});
            if(deleteError) return fail(402, {msg: deleteError.message});
            else {
                const {error:deleteApplicationError} = await supabase.from("application_tb").delete().eq("user_id", session?.user.id);
                if(deleteApplicationError) return fail(402, {msg: deleteApplicationError.message});
                else return fail(200, {msg: "Successfully deleted application."});
            };

        } catch (error) {
            const zodError = error as ZodError;
            const {fieldErrors} = zodError.flatten();
            return fail(403, {errors: fieldErrors});
        }
    }
};