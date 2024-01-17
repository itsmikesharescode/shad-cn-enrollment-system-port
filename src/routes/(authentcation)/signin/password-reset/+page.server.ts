import type { Actions, PageServerLoad } from "../$types";
import { updatePassSchema } from "$lib/server-schemas/signin";
import {ZodError, z} from "zod";
import { fail, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({url, locals: {supabase}}) => 
{

    const {data: {session}, error: tokenError} = await supabase.auth.verifyOtp({token_hash: url.search.slice(1), type: "email"});
    if(tokenError){
        throw redirect(302, "/signin?error=Invalid-token.");
        
    }else if(session){
        return {session};
    }else throw redirect(302, "/signin?error=Invalid-token.");

};

export const actions: Actions = {

    recoverPass: async ({request, locals: {supabase}}) => 
    {
        const formData = Object.fromEntries(await request.formData());
        
        try {
            const result = updatePassSchema.parse(formData);

            if(result.password === result.confirmPass){

                const {data: {user}, error:updatePassError } = await supabase.auth.updateUser({
                    password: result.password
                });

                if(updatePassError) return fail(402, {msg: updatePassError.message});

                else if(user){
                    const {error:signOutError} = await supabase.auth.signOut();

                    if(signOutError) return fail(402, {msg: signOutError.message});
                    else return fail(200, {msg: "Successfully updated password."});
                };

            }else return fail(402, {msg: "Passwords do not match."});
            
        } catch (error) {
            const zodError = error as ZodError;
            const {fieldErrors} = zodError.flatten();

            return fail(403, {errors: fieldErrors});
        };
    }
};