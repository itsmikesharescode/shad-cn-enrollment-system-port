<script lang="ts">
	import { goto } from "$app/navigation";
	import { navState } from "$lib";
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
	import { onMount } from "svelte";

    onMount( () => {
        $navState.activeItem = "/admission";
        
    });
  
</script>


<div class="sm:max-w-[70%] min-h-[70dvh] flex flex-col gap-4 justify-center mx-auto py-[10dvh]">
    <Card.Root class="w-full shadow-sm shadow-black dark:shadow-white">
        <Card.Header>
            <Card.Title>College Courses</Card.Title>
        </Card.Header>

        <Card.Content>
            <Card.Description>
                <ul class="list-disc px-4">
                    <li>
                        <p class="leading-7 [&:not(:first-child)]:mt-6 text-black dark:text-white">
                            Improve your knowledge and skills. College courses can help you gain new knowledge and skills that can be valuable in your personal and professional life.
                        </p>
                    </li>

                    <li>
                        <p class="leading-7 [&:not(:first-child)]:mt-6 text-black dark:text-white">
                            Prepare for a career. Many college courses are designed to prepare students for specific careers.
                        </p>
                    </li>

                    <li>
                        <p class="leading-7 [&:not(:first-child)]:mt-6 text-black dark:text-white">
                            Become a more well-rounded person. College courses can help you develop critical thinking, communication, and problem-solving skills.
                        </p>
                    </li>

                    <li>
                        <p class="leading-7 [&:not(:first-child)]:mt-6 text-black dark:text-white">
                            Meet new people. College courses can be a great way to meet new people and make friends.
                        </p>
                    </li>
                </ul>
            </Card.Description>
        </Card.Content>
    
        <Card.Footer class="flex justify-between">
            <Button class="mx-auto bg-blue-500" on:click={() => goto("/admission/college")}>Let's go</Button>
        </Card.Footer>
    
    </Card.Root>

    <Card.Root class="w-full shadow-sm shadow-black dark:shadow-white">
        <Card.Header>
            <Card.Title>Senior High Tracks</Card.Title>
    
            <Card.Description>
                Senior high school, or SHS, is the last two years of secondary education in the Philippines. It is part of the K to 12 Basic Education Program implemented in 2012.
            </Card.Description>
    
        </Card.Header>
        <Card.Content>
            <Card.Description>
                <p class="leading-7 [&:not(:first-child)]:mt-6 text-black dark:text-white">
                    Senior high offers three tracks:
                </p>

                <ul class="list-disc px-4">
                    <li>
                        <p class="leading-7 [&:not(:first-child)]:mt-6 text-black dark:text-white">
                            Accountancy, Business and Management (ABM)
                        </p>
                    </li>

                    <li>
                        <p class="leading-7 [&:not(:first-child)]:mt-6 text-black dark:text-white">
                            Humanities and Social Sciences (HUMSS)
                        </p>
                    </li>

                    <li>
                        <p class="leading-7 [&:not(:first-child)]:mt-6 text-black dark:text-white">
                            Science, Technology, Engineering, and Mathematics (STEM)
                        </p>
                    </li>

                    <li>
                        <p class="leading-7 [&:not(:first-child)]:mt-6 text-black dark:text-white">
                            General Academic Strand (GAS)
                        </p>
                    </li>
                </ul>
                
            </Card.Description>
        </Card.Content>
    
        <Card.Footer class="flex justify-between">
            <Button class="mx-auto bg-blue-500" on:click={() => goto("/admission/seniorhigh")} >Let's go</Button>
        </Card.Footer>
    
    </Card.Root>
</div>
