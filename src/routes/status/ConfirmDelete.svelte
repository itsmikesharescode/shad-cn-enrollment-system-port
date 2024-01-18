<script lang="ts">
	import { enhance } from "$app/forms";
	import { navState, statusState } from "$lib";
	import Mikespin from "$lib/components/loaders/mikespin.svelte";
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import * as Dialog from "$lib/components/ui/dialog";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
	import type { ServerNews } from "$lib/types";
	import type { Session } from "@supabase/supabase-js";
	import type { SubmitFunction } from "@sveltejs/kit";
	import { toast } from "svelte-sonner";

    type DeleteApplicationValidation = {
        inputCompar: string[]
    };

    type DeleteApplicationNews = {
        msg: string
        session: Session
        errors: DeleteApplicationValidation
    };

    let inputErrors: DeleteApplicationValidation | null = null;
    let deleteApplicationLoader = false;
    let closeDialog: boolean;

    const deleteApplicationNews: SubmitFunction = () => {

        deleteApplicationLoader = true;

        return async ({ result, update }) => {
            const {status, data: {msg, session, errors}} = result as ServerNews<DeleteApplicationNews>
                
            switch (status) {
                case 200:
                    $navState.sessionState = session;
                    toast.success("Application Deleted", { description: msg});
                    deleteApplicationLoader = false;
                    $statusState.application = null;
                    closeDialog = false;
                    break;
                
                case 402:
                    toast.error("Authentication Failed", { description: msg});    
                    inputErrors = null;
                    deleteApplicationLoader = false;
                    break;
                
                case 403:
                    inputErrors = errors;
                    deleteApplicationLoader = false;
                    break;

                default:
                    break;
            };

            await update();
        };
    };

</script>

<Dialog.Root bind:open={closeDialog}>

    <Dialog.Trigger>
        <Button variant="destructive">Delete</Button>
    </Dialog.Trigger>
    
    <Dialog.Content class="sm:max-w-[425px]">

        <Dialog.Header>

            <Dialog.Title>Once done, it's done. -mikey</Dialog.Title>

            <Dialog.Description>
                <p>To proceed with deleting your application, type the following. <b class="text-red-500">Yes, delete my application</b></p>
            </Dialog.Description>

        </Dialog.Header>

        <form method="POST" action="?/deleteApplication" enctype="multipart/form-data" use:enhance={deleteApplicationNews} class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
                <div class="">
                    <Label class="text-sm">Enter your input:</Label>
                    <Input name="inputCompar" type="text" />
                    {#each inputErrors?.inputCompar ?? [] as errMsg}
                        <p class="text-xs p-2 text-red-700 font-bold dark:text-red-500">{errMsg}</p>
                    {/each}
                </div>
            </div>
            <Dialog.Footer>
                <Button type="submit">
                    <Mikespin name="Proceed" loader_name="Deleting.." loader={deleteApplicationLoader}/>
                </Button>
            </Dialog.Footer>
        </form>

    </Dialog.Content>
</Dialog.Root>