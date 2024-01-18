<script lang="ts">
	import { navState } from "$lib";
	import Button from "$lib/components/ui/button/button.svelte";
    import * as Table from "$lib/components/ui/table";
	import { onMount } from "svelte";

    import * as Dialog from "$lib/components/ui/dialog";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
	import { buttonVariants } from "$lib/components/ui/button";
	import StudentDetails from "./studentDetails.svelte";

    onMount( () => {
        $navState.activeItem = "/request";
    })
  
    const applications = [
        {
            studentName: "John Doe",
            status: "Pending",
            applicationType: "College",
        },
        
    ];


</script>




<div class="sm:max-w-[70%] max-h-[80dvh] flex flex-col gap-4 justify-center mx-auto">
    <p class="text-center">A list of student applications.</p>
    <Table.Root class="text-sm">
        <Table.Header class="">
            <Table.Row class="truncate">
                <Table.Head class="w-full">Student Name</Table.Head>
                <Table.Head class="w-10">Status</Table.Head>
                <Table.Head class="">Application Type</Table.Head>
            </Table.Row>
        </Table.Header>
        
        <Table.Body class="">
            {#each ["","","","","","","","","",] as application, index}
                
                <Table.Row class="">
                    <Table.Cell class="font-medium w-full">
                        <StudentDetails />
                    </Table.Cell>

                    <Table.Cell>Pending</Table.Cell>
                    <Table.Cell>College</Table.Cell>
                </Table.Row>
                
            {/each}
        </Table.Body>
        
    </Table.Root>
</div>
