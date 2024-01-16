import { fail, type Actions } from "@sveltejs/kit";
import { signInSchema, signUpSchema, forgotPasswordSchema } from "$lib/server-schemas/signin";
import {ZodError, z} from "zod";



export const actions: Actions = {
    
    signIn: async ({request, locals: {supabase}}) => 
    {
        
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = signInSchema.parse(formData);

            const {data:{session}, error:signInError} = await supabase.auth.signInWithPassword({
                email: result.email,
                password: result.password
            });

            if(signInError) return fail(402, {msg: signInError.message});
            else if(session) return fail(200, {msg: "Successfully signed in.", session});
            
        } catch (error) {
            const zodError = error as ZodError;
            const {fieldErrors} = zodError.flatten();
            console.log(fieldErrors)
            return fail(403, {errors: fieldErrors});
        }
    },

    signUp: async ({request, locals: {supabase}}) => 
    {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = signUpSchema.parse(formData);

            if(result.confirmPass === result.password){

                const {data: {session} , error: signUpError} = await supabase.auth.signUp({
                    email: result.email,
                    password: result.password,
                    options: {
                        data: {
                            fullname: `${result.lastName}, ${result.firstName} ${result.middleName}`,
                            role: "student",
                        }
                    }
                });

                if(signUpError) return fail(402, {msg: signUpError.message});
                else if(session){
                    const {error: insertError} = await supabase.from("user_list").insert([{
                        user_id: session.user.id,
                        user_email: session.user.email,
                        user_fullname: session.user.user_metadata.fullname,
                    }]);

                    if(insertError) return fail(402, {msg: insertError.message});
                    else {
                        return fail(200, {msg: "Successfully signed up.", session});
                    }
                }

            }else return fail(402, {msg: "Password does not match."});
            
        } catch (error) {
            const zodError = error as ZodError;
            const {fieldErrors} = zodError.flatten();
            console.log(fieldErrors)
            return fail(403, {errors: fieldErrors});
        }
    },

    signOut: async ({locals: {supabase}}) => 
    {
       const {error: signOutError} = await supabase.auth.signOut();

       if(signOutError) return fail(402, {msg: signOutError.message});
       else return fail(200, {msg: "Successfully signed out."});
    }
};