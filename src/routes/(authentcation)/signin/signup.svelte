<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Card from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
	import { scale } from "svelte/transition";

</script>

<div class="flex flex-col justify-center min-h-[80dvh] py-[10dvh] sm:p-0" in:scale>
    <Card.Root class="shadow-sm shadow-black dark:shadow-white w-full sm:max-w-lg mx-auto ">
        <Card.Header>
            <Card.Title class="text-center">Sign up</Card.Title>
        </Card.Header>

        <Card.Content class="flex flex-col gap-4">

            <div class="flex flex-col gap-1.5">
                <Label for="firstName">First Name:</Label>
                <Input type="firstName" placeholder="Enter Your First Name" />
            </div>

            <div class="flex flex-col gap-1.5">
                <Label for="middleName">Middle Name:</Label>
                <Input type="middleName" placeholder="Enter Your Middle Name" />
            </div>

            <div class="flex flex-col gap-1.5">
                <Label for="lastName">Last Name:</Label>
                <Input type="lastName" placeholder="Enter Your Last Name" />
            </div>

            <div class="flex flex-col gap-1.5">
                <Label for="email">Email:</Label>
                <Input type="email" placeholder="Enter Your Email" />
            </div>

            <div class="flex flex-col gap-1.5">
                <Label for="password">Password:</Label>
                <Input type="password" placeholder="Enter Your Password" />
            </div>

            <div class="flex flex-col gap-1.5">
                <Label for="confirmPass">Confirm Password:</Label>
                <Input type="confirmPass" placeholder="Confirm Your Password" />
            </div>

            <Button >Register</Button>
        </Card.Content>
    
        <Card.Footer class="flex flex-col gap-5 mt-[1dvh]">
            <p>Already have an account? <a href="/signin" class="text-blue-700 dark:blue-500 underline transition-all hover:text-red-500">Sign in</a></p>
        </Card.Footer>
    
    </Card.Root>
</div>