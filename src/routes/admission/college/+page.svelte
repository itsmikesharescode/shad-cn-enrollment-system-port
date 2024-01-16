<script lang="ts">
	import { navState } from "$lib";
	import { onMount } from "svelte";
    import * as Card from "$lib/components/ui/card";
    import Button from "$lib/components/ui/button/button.svelte";
    import {admissionCourses} from "../admission";

    onMount( () => {
        $navState.activeItem = "/admission";
    });


</script>

<div class="sm:max-w-[70%] mx-auto flex flex-col gap-4 py-[10dvh]">
    <p class="text-base">Back to <a href="/admission" class="text-blue-500 underline">/admission</a></p>
    <div class="flex flex-col lg:flex-row lg:flex-wrap gap-2 justify-center">
        {#each $admissionCourses.college as department, index}
            <Card.Root class="shadow-sm shadow-black dark:shadow-white w-full lg:w-[45%]">
                <Card.Header>
                    <Card.Title>{department.header}</Card.Title>
                </Card.Header>
        
                <Card.Content>
                   {#each department.courses as course }
                    <Card.Description>
                        <a href={course.url} class="leading-7 [&:not(:first-child)]:mt-6 transition-all hover:text-red-500 dark:hover:text-red-500 text-blue-700 dark:text-blue-500 underline =">{course.title}</a>
                    </Card.Description>
                   {/each}
                </Card.Content>
            
                <Card.Footer class="flex justify-between">
            
                </Card.Footer>
            
            </Card.Root>
        {/each}
        
    </div>

</div>