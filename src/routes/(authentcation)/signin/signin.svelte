<script lang="ts">
	import { enhance } from "$app/forms";
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Card from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
	import type { ServerNews } from "$lib/types";
	import type { SubmitFunction } from "@sveltejs/kit";
	import { scale } from "svelte/transition";

    import { toast } from "svelte-sonner";
	import type { Session } from "@supabase/supabase-js";
	import Mikespin from "$lib/components/loaders/mikespin.svelte";
	import { navState } from "$lib";
	import { goto } from "$app/navigation";


    type SignInValidation = {
        email: string[]
        password: string[]
    };
    
    type SignInNews = {
        msg: string
        session: Session
        errors: SignInValidation
    };

    let inputErrors: SignInValidation | null = null;
    let signInLoader = false;

    const signInNews: SubmitFunction = () => 
    {
        signInLoader = true;
        return async ({ result, update }) => 
        {
            const {status, data: {msg, session, errors} } = result as ServerNews<SignInNews>
                
            switch (status) {
                case 200:
                    const {user: {user_metadata: {role} }} = session;
                    $navState.sessionState = session;
                    toast.success("Authenticated", { description: "Sign in successfully."});
                    signInLoader = false;

                    if(role === "student") {
                        $navState.defaultNav = $navState.studentNav;
                        goto("/admission");
                    }else if(role === "admin"){
                        $navState.defaultNav = $navState.adminNav;
                        goto("/");
                    };
                    
                    break;
                
                case 402:
                    toast.error("Failed To Authenticate", { description: msg});
                    signInLoader = false;
                    inputErrors = null;
                    break;
                
                case 403:
                    inputErrors = errors;
                    signInLoader = false;
                    break;

                default:
                    break;
            };
            await update();
        };
    };

</script>

<div class="flex flex-col justify-center min-h-[70dvh]" in:scale>
    <Card.Root class="shadow-sm shadow-black dark:shadow-white w-full sm:max-w-lg mx-auto ">
        <Card.Header>
            <Card.Title class="text-center">Sign in</Card.Title>
        </Card.Header>

        <form method="POST" action="?/signIn" enctype="multipart/form-data" use:enhance={signInNews} class="">
            <Card.Content class="flex flex-col gap-4">

                <div class="flex flex-col gap-1.5">
                    <Label for="email">Email:</Label>
                    <Input name="email" type="email" placeholder="Enter Email" />
                    {#each inputErrors?.email ?? [] as errMsg}
                        <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">{errMsg}</p>
                    {/each}
                </div>

                <div class="flex flex-col gap-1.5">
                    <Label for="password">Password:</Label>
                    <Input name="password" type="password" placeholder="Enter Password" />
                    {#each inputErrors?.password ?? [] as errMsg}
                        <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">{errMsg}</p>
                    {/each}
                </div>

                <Button type="submit" >
                    <Mikespin name="Sign in" loader_name="Signing in.." loader={signInLoader}/>     
                </Button>

            </Card.Content>
        </form>

        <Card.Footer class="flex flex-col gap-5 mt-[1dvh]">
            <a href="/signin?forgotpass" class="text-blue-700 dark:blue-500 underline transition-all hover:text-red-500">Forgot Password?</a>

            <p>Don't have an account yet? <a href="/signin?signup" class="text-blue-700 dark:blue-500 underline transition-all hover:text-red-500">Create Account?</a></p>
        </Card.Footer>
    
    </Card.Root>
</div>