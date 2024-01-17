import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { admissionCourses } from "../../../admission";
import type { CourseDetails } from "$lib/types";
import { applicationSchema } from "$lib/server-schemas/admission";
import type { ZodError } from "zod";
import type { PostgrestError } from "@supabase/supabase-js";

export const load: PageServerLoad = async ({url, locals: {getSession, supabase}}) => {
    
    const session = await getSession();
    const prevURL = url.pathname.split("/enrollment").join("");

    let targetCourseDetails: CourseDetails | undefined;

    if(session) {

        admissionCourses.subscribe( state => {

            state.college.map(outerItem => {
                outerItem.courses.map(innerItem => {
                    innerItem.url === prevURL ? targetCourseDetails = innerItem : null;
                })
            })
        });

        const {data:isAdmin, error:isAdminError} = await supabase.rpc("is_admin") as {data: boolean, error: PostgrestError | null};

        if(isAdmin) throw redirect(302, "/admission?error=You-are-not-authorized-to-access-this-page.");
        else{

            const {data:isAppSubmitted, error:isAppSubmittedError} = await supabase.rpc("is_application_submitted") as {data: boolean, error: PostgrestError | null};
            
            if(isAppSubmitted) throw redirect(302, "/status?error=You-have-already-submitted-your-application.");
            else return {session, targetCourseDetails};
            
        };
    }

    else throw redirect(302, "/signin?error=You-are-not-signed-in.");

};


export const actions: Actions = {

    submitApplication: async ({request, locals: {supabase, getSession}}) =>
    {   
        const formData = Object.fromEntries(await request.formData());
        
        try {
            const result = applicationSchema.parse(formData);

            const session = await getSession();

            if(session){
                const {error: insertError} = await supabase.from("application_tb").insert([{
                    application_type: "College",
                    course: result.course,
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
                    secondary_graduation_date: result.secondaryGraduation,
                    user_id: session.user.id
                }]);

                if(insertError) return fail(402, {msg: insertError.message});
                else return fail(200, {msg: "Successfully submitted application.", session});

            }else throw redirect(302, "/signin?error=You-are-not-signed-in.");

        } catch (error) {
            const zodError = error as ZodError;
            const {fieldErrors} = zodError.flatten();

            return fail(403, {errors: fieldErrors});
        }
    }
};

