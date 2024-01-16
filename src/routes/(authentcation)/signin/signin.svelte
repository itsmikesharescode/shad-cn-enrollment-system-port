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


    type SignInValidation = {
        email: string[]
        password: string[]
    };
    
    type EnterUserNews = {
        msg: string
        session: any
        errors: SignInValidation
    }
    

    const enterUserNews: SubmitFunction = () => 
    {
        return async ({ result, update }) => 
        {
            const {status, data: {msg, session, errors} } = result as ServerNews<EnterUserNews>
                
            switch (status) {
                case 200:
                    toast.success("Authenticated", { description: "Sign in successfully."});

                    break;
                
                case 402:
                    toast.error("Failed To Authenticate", { description: msg})
                    break;
                
                case 403:
                    break;
                default:
                    break;
            };
            await update();
        };
    };

</script>

<Button
  variant="outline"
  on:click={() =>
    toast.success("Event has been created", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo")
      }
    })}
>
  Show Toast
</Button>

<div class="flex flex-col justify-center min-h-[70dvh]" in:scale>
    <Card.Root class="shadow-sm shadow-black dark:shadow-white w-full sm:max-w-lg mx-auto ">
        <Card.Header>
            <Card.Title class="text-center">Sign in</Card.Title>
        </Card.Header>

        <form method="POST" action="?/enterUser" enctype="multipart/form-data" use:enhance={enterUserNews} class="">
            <Card.Content class="flex flex-col gap-4">

                <div class="flex flex-col gap-1.5">
                    <Label for="email">Email:</Label>
                    <Input type="email" placeholder="Enter Email" />
                    <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">Not valid email</p>
                </div>

                <div class="flex flex-col gap-1.5">
                    <Label for="password">Password:</Label>
                    <Input type="password" placeholder="Enter Password" />
                    <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">Not valid email</p>
                </div>

                <Button type="submit" >Log in </Button>
            </Card.Content>
        </form>

        <Card.Footer class="flex flex-col gap-5 mt-[1dvh]">
            <a href="/signin?forgotpass" class="text-blue-700 dark:blue-500 underline transition-all hover:text-red-500">Forgot Password?</a>

            <p>Don't have an account yet? <a href="/signin?signup" class="text-blue-700 dark:blue-500 underline transition-all hover:text-red-500">Create Account?</a></p>
        </Card.Footer>
    
    </Card.Root>
</div>