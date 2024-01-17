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
	import Mikespin from "$lib/components/loaders/mikespin.svelte";
	import { navState } from "$lib";
	import { goto } from "$app/navigation";

    type UpdatePassValidation = {
        password: string[]
        confirmPass: string[]
    };

    type UpdatePassNews = {
        msg: string
        errors: UpdatePassValidation
    };

    let inputErrors: UpdatePassValidation | null = null;
    let updatePassLoader = false;

    const updatePassNews: SubmitFunction = () => 
    {
        updatePassLoader = true;
        return async ({ result, update }) => 
        {
            const {status, data: {msg, errors}} = result as ServerNews<UpdatePassNews>
                
            switch (status) {
                case 200:
                    toast.success("Password Updated", { description: "Password updated successfully."});
                    $navState.sessionState = null;
                    $navState.defaultNav = $navState.staticNav;
                    updatePassLoader = false;
                    goto("/signin?password-update-success-login-again");
                    break;
                
                case 402:
                    toast.error("Failed To Update Password", { description: msg});
                    updatePassLoader = false;
                    break;
                
                case 403:
                    inputErrors = errors;
                    updatePassLoader = false;
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
            <Card.Title class="text-center">Update Your Password</Card.Title>
            <Card.Description class="text-center text-sm">Do not reload the page it will erase your session.</Card.Description>
        </Card.Header>

        <form method="POST" action="?/recoverPass" enctype="multipart/form-data" use:enhance={updatePassNews} class="">
            <Card.Content class="flex flex-col gap-4">

                <div class="flex flex-col gap-1.5">
                    <Label class="font-bold" for="password">New Password:</Label>
                    <Input name="password" type="password" placeholder="Enter Password" />
                    {#each inputErrors?.password ?? [] as errMsg}
                        <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">{errMsg}</p>
                    {/each}
                </div>

                <div class="flex flex-col gap-1.5">
                    <Label class="font-bold" for="password">Confirm New Password:</Label>
                    <Input name="confirmPass" type="password" placeholder="Enter Password" />
                    {#each inputErrors?.confirmPass ?? [] as errMsg}
                        <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">{errMsg}</p>
                    {/each}
                </div>

                <Button type="submit" >
                    <Mikespin name="Update Password" loader_name="Updating.." loader={updatePassLoader}/>     
                </Button>

            </Card.Content>
        </form>

    
    </Card.Root>
</div>