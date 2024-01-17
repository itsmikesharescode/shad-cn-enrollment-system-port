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

    type ResetPassValidation = {
        email: string[]
    };

    type ResetPassNews = {
        msg: string
        errors: ResetPassValidation
    };

    let inputErrors: ResetPassValidation | null = null;
    let resetPassLoader = false;

    const resetPassNews: SubmitFunction = () => 
    {
        resetPassLoader = true;
        return async ({ result, update }) => 
        {
            const {status, data: {msg, errors} } = result as ServerNews<ResetPassNews>
                
            switch (status) {
                case 200:
                    toast.success("Password Recovery", { description: msg});
                    resetPassLoader = false;
                    break;
                
                case 402:
                    toast.error("Failed to send email", { description: msg});
                    resetPassLoader = false;
                    inputErrors = null;
                    break;
                
                case 403:
                    inputErrors = errors;
                    resetPassLoader = false;
                    break;

                default:
                    break;
            };
            await update();
        };
    };

</script>

<div class="flex flex-col justify-center min-h-[70dvh]" in:scale>
    <form method="POST" action="?/resetPass" enctype="multipart/form-data" use:enhance={resetPassNews}>
        <Card.Root class="shadow-sm shadow-black dark:shadow-white w-full sm:max-w-lg mx-auto ">
            <Card.Header>
                <Card.Title class="text-center">Forgot Password</Card.Title>
                <Card.Description class="text-center text-xs">Reset your password via email.</Card.Description>
            </Card.Header>
    
            <Card.Content class="flex flex-col gap-4">
    
                <div class="flex flex-col gap-1.5">
                    <Label class="font-bold" for="email">Email:</Label>
                    <Input name="email" type="email" placeholder="Enter Email" />
                    {#each inputErrors?.email ?? [] as errMsg}
                        <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">{errMsg}</p>
                    {/each}
                </div>
    
                <Button type="submit">
                    <Mikespin name="Send Password Reset" loader={resetPassLoader} loader_name="Sending.." />
                </Button>

            </Card.Content>
        
            <Card.Footer class="flex flex-col gap-5 mt-[1dvh]">
                
                <p>Already recovered your account? <a href="/signin" class="text-blue-700 dark:blue-500 underline transition-all hover:text-red-500 font-bold">Sign in</a></p>
            </Card.Footer>
        
        </Card.Root>
    </form>
</div>