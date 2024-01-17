<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Card from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
	import type { ServerNews } from "$lib/types";
	import type { Session } from "@supabase/supabase-js";
	import type { SubmitFunction } from "@sveltejs/kit";
	import { scale } from "svelte/transition";

    import { toast } from "svelte-sonner";
	import { navState } from "$lib";
	import Mikespin from "$lib/components/loaders/mikespin.svelte";
	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";

    type SignUpValidation = {
        firstName: string[]
        middleName: string[]
        lastName: string[]
        email: string[]
        password: string[]
        confirmPass: string[]
    };

    type SignUpNews = {
        msg: string
        session: Session
        errors: SignUpValidation
    };

    let inputErrors: SignUpValidation | null = null;
    let signUpLoader = false;

    const signUpNews: SubmitFunction = () => 
    {
        signUpLoader = true;
        return async ({ result, update }) => 
        {
            const {status, data: {msg, session, errors} } = result as ServerNews<SignUpNews>
                
            switch (status) {
                case 200:
                    $navState.sessionState = session;
                    toast.success("Account Created", { description: msg});
                    signUpLoader = false;

                    const {user:{user_metadata: {role}}} = session;

                    if(role === "student") {
                        $navState.defaultNav = $navState.studentNav;
                        goto("/admission");
                    }else if(role === "admin"){
                        $navState.defaultNav = $navState.adminNav;
                        goto("/");
                    };
                    
                    break;
                
                case 402:
                    toast.error("Failed To Create Account", { description: msg});
                    signUpLoader = false;
                    inputErrors = null;
                    break;
                
                case 403:
                    inputErrors = errors;
                    signUpLoader = false;
                    break;

                default:
                    break;
            };
            await update();
        };
    };

</script>

<div class="flex flex-col justify-center min-h-[80dvh] py-[10dvh] sm:p-0" in:scale>
    <Card.Root class="shadow-sm shadow-black dark:shadow-white w-full sm:max-w-lg mx-auto ">
        <Card.Header>
            <Card.Title class="text-center">Sign up</Card.Title>
        </Card.Header>

        <form method="POSt" action="?/signUp" enctype="multipart/form-data" use:enhance={signUpNews}>
            <Card.Content class="flex flex-col gap-4">

                <div class="flex flex-col gap-1.5">
                    <Label class="font-bold" for="firstName">First Name:</Label>
                    <Input name="firstName" type="firstName" placeholder="Enter Your First Name" />
                    {#each inputErrors?.firstName ?? [] as errMsg}
                        <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">{errMsg}</p>
                    {/each}
                </div>

                <div class="flex flex-col gap-1.5">
                    <Label class="font-bold" for="middleName">Middle Name:</Label>
                    <Input name="middleName" type="middleName" placeholder="Enter Your Middle Name" />
                    {#each inputErrors?.middleName ?? [] as errMsg}
                        <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">{errMsg}</p>
                    {/each}
                </div>

                <div class="flex flex-col gap-1.5">
                    <Label class="font-bold" for="lastName">Last Name:</Label>
                    <Input name="lastName" type="lastName" placeholder="Enter Your Last Name" />
                    {#each inputErrors?.lastName ?? [] as errMsg}
                        <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">{errMsg}</p>
                    {/each}
                </div>

                <div class="flex flex-col gap-1.5">
                    <Label class="font-bold" for="email">Email:</Label>
                    <Input name="email" type="email" placeholder="Enter Your Email" />
                    {#each inputErrors?.email ?? [] as errMsg}
                        <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">{errMsg}</p>
                    {/each}
                </div>

                <div class="flex flex-col gap-1.5">
                    <Label class="font-bold" for="password">Password:</Label>
                    <Input name="password" type="password" placeholder="Enter Your Password" />
                    {#each inputErrors?.password ?? [] as errMsg}
                        <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">{errMsg}</p>
                    {/each}
                </div>

                <div class="flex flex-col gap-1.5">
                    <Label class="font-bold" for="confirmPass">Confirm Password:</Label>
                    <Input name="confirmPass" type="password" placeholder="Confirm Your Password" />
                    {#each inputErrors?.confirmPass ?? [] as errMsg}
                        <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">{errMsg}</p>
                    {/each}
                </div>

                <Button type="submit">
                    <Mikespin name="Register" loader={signUpLoader} loader_name="Creating.." />
                </Button>
            </Card.Content>
        </form>

        <Card.Footer class="flex flex-col gap-5 mt-[1dvh]">
            <p>Already have an account? <a href="/signin" class="text-blue-700 dark:blue-500 underline transition-all hover:text-red-500 font-bold">Sign in</a></p>
        </Card.Footer>
    
    </Card.Root>
</div>