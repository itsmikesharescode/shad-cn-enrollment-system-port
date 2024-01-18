<script lang="ts">
    import { Terminal } from "lucide-svelte";
    import * as Alert from "$lib/components/ui/alert";
    import * as Card from "$lib/components/ui/card";
    import Button from "$lib/components/ui/button/button.svelte";

    import { generatedText } from "$lib/helpers/generatetext";
	import { onMount } from "svelte";
	import { scale } from "svelte/transition";
	import { goto } from "$app/navigation";
	import { navState } from "$lib";

    let displayTexts = "";

    function displayText () {
        const setz = setInterval(() => {
            displayTexts = $generatedText[Math.round(Math.random() * $generatedText.length - 1)];
        }, 4000);
    };

    onMount( () => {
        $navState .activeItem = "/";
        displayText();
    
    });
    
</script>


<div class="min-h-[70dvh] flex flex-col justify-center items-center sm:max-w-xl mx-auto gap-10">

    <Alert.Root class="-z-10">
        <Terminal class="h-4 w-4" />

        
        {#key displayTexts}
            <div class="" in:scale>
                <Alert.Description>
                    {displayTexts ? displayTexts : $generatedText[Math.round(Math.random() * $generatedText.length)]}
                </Alert.Description>
            </div>
        {/key}
        

    </Alert.Root>

    <Card.Root class="w-full border-none">

        <Card.Header class="text-center">
            <Card.Title class="text-xl">Simple Enrollment System</Card.Title>
        </Card.Header>

        <Card.Content class="text-center flex flex-col gap-2 text-xl">
            <Card.Description>
                Where simplicity meets efficiency! Let our friendly interaction guide you through the process seamlessly, making enrollment a breeze.
            </Card.Description>

            <Card.Description>
                Say goodbye to complexities and hello to hassle-free enrollment. Let's get started!"
            </Card.Description>
        </Card.Content>

        <Card.Footer class="flex justify-between">
            <Button class="mx-auto " on:click={() => goto("/signin")}>Let's go</Button>
        </Card.Footer>

    </Card.Root>

</div>