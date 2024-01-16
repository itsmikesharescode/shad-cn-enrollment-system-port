<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Card from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";

</script>

<div class="flex flex-col justify-center min-h-[70dvh]">
    <Card.Root class="shadow-sm shadow-black dark:shadow-white w-full sm:max-w-lg mx-auto">
        <Card.Header>
            <Card.Title class="text-center">Sign in</Card.Title>
        </Card.Header>

        <Card.Content class="flex flex-col gap-4">

            <div class="flex flex-col gap-1.5">
                <Label for="email">Email:</Label>
                <Input type="email" placeholder="Enter Email" />
            </div>

            <div class="flex flex-col gap-1.5">
                <Label for="password">Password:</Label>
                <Input type="password" placeholder="Enter Password" />
            </div>

            <Button >Log in </Button>
        </Card.Content>
    
        <Card.Footer class="flex flex-col gap-5 mt-[1dvh]">
            <a href="/?forgotpass" class="text-blue-700 dark:blue-500 underline">Forgot Password?</a>

            <p>Don't have an account uet? <a href="/?forgotpass" class="text-blue-700 dark:blue-500 underline">Forgot Password?</a></p>
        </Card.Footer>
    
    </Card.Root>
</div>