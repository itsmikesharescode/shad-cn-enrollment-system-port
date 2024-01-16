<script lang="ts">

    import * as Card from "$lib/components/ui/card";
	import { onMount } from "svelte";
    import { admissionCourses } from "../../admission";
    import {navState} from "$lib";
    import type { PageServerData } from "./$types";

	import Button from "$lib/components/ui/button/button.svelte";

    export let data: PageServerData;
    
    const {courseObject} = data;

    onMount( () => {
        
        $navState.activeItem = "/admission";
        
    })

    
    
</script>

<div class="mx-auto sm:max-w-[70%] flex flex-col gap-2 py-10">
    <p class="text-base">Back to <a href="/admission/seniorhigh" class="text-blue-500 underline">admission/seniorhigh</a></p>

    <div class="">
        <Card.Root class="shadow-sm shadow-black dark:shadow-white w-full ">
            <Card.Header> 
                <div class="flex flex-col items-center lg:flex-row gap-4">
                    <img src={courseObject?.img} alt="" class="w-full h-[20dvh] mx-auto" />
                    <Card.Description class="text-black dark:text-white flex flex-col">
                        <h4 class="scroll-m-20 text-lg font-semibold tracking-tight">{courseObject?.title}</h4>

                        <p class="leading-7 [&:not(:first-child)]">{courseObject?.intro}</p>
                        
                        <h4 class="scroll-m-20 text-lg font-semibold tracking-tight mt-6">Curriculum</h4>
                        <p class="leading-7 [&:not(:first-child)]">{courseObject?.curriculum}</p>
                    </Card.Description>
                </div>
            </Card.Header>
    
            <Card.Content>
                <h4 class="scroll-m-20 text-lg font-semibold tracking-tight mt-6">Core Competence:</h4>
                <p class="leading-7 [&:not(:first-child)]">{courseObject?.coreCompetenies}</p>
                
                <h4 class="scroll-m-20 text-lg font-semibold tracking-tight mt-6">Specialization:</h4>
                <p class="leading-7 [&:not(:first-child)]">{courseObject?.specialization}</p>

                <h4 class="scroll-m-20 text-lg font-semibold tracking-tight mt-6">Opportunities:</h4>
                <p class="leading-7 [&:not(:first-child)]">{courseObject?.opportunities}</p>

                <h4 class="scroll-m-20 text-lg font-semibold tracking-tight mt-6">Experience:</h4>
                <p class="leading-7 [&:not(:first-child)]">{courseObject?.experience}</p>
            </Card.Content>
        
            <Card.Footer class="flex justify-center lg:justify-end"> 
                <Button class="bg-blue-500" >Enroll Now</Button>
            </Card.Footer>
        
        </Card.Root>
    </div>
</div>