import { fail, type Actions } from "@sveltejs/kit";


export const actions: Actions = {
    
    enterUser: async () => {
        
        return fail(402, {msg: "HELLO WORLD!"})
    }
};