import type { PostgrestError } from "@supabase/supabase-js";
import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";


export const load: LayoutServerLoad = async ({locals: {getSession, supabase}}) => {
    
    const session = await getSession();

    if(session) {
        const {data: whoareyou, error} = await supabase.rpc("who_are_you") as {data: "student" | "admin", error: PostgrestError | null};

        if(error) throw redirect(302, "/signin?error=not_authorized");
        else return {whoareyou, session};
    };

};