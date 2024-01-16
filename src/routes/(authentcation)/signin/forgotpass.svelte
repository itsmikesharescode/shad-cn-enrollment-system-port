<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Card from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
	import { scale } from "svelte/transition";

    

</script>

<div class="flex flex-col justify-center min-h-[70dvh]" in:scale>
    <Card.Root class="shadow-sm shadow-black dark:shadow-white w-full sm:max-w-lg mx-auto ">
        <Card.Header>
            <Card.Title class="text-center">Forgot Password</Card.Title>
            <Card.Description class="text-center text-xs">Reset your password via email.</Card.Description>
        </Card.Header>

        <Card.Content class="flex flex-col gap-4">

            <div class="flex flex-col gap-1.5">
                <Label for="email">Email:</Label>
                <Input type="email" placeholder="Enter Email" />
                <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">Not valid email</p>
            </div>

            <Button >Send Password Reset</Button>
        </Card.Content>
    
        <Card.Footer class="flex flex-col gap-5 mt-[1dvh]">
            
            <p>Already recovered your account? <a href="/signin" class="text-blue-700 dark:blue-500 underline transition-all hover:text-red-500">Sign in</a></p>
        </Card.Footer>
    
    </Card.Root>
</div>