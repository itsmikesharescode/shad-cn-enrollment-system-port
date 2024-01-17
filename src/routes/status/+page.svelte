<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import Button from "$lib/components/ui/button/button.svelte";
	import Mikespin from "$lib/components/loaders/mikespin.svelte";
	import { onMount } from "svelte";
	import { navState, statusState } from "$lib";
	import { scale, fly } from "svelte/transition";
	import { enhance } from "$app/forms";
	import type { SubmitFunction } from "@sveltejs/kit";
	import type { Session } from "@supabase/supabase-js";
	import type { ApplicationTB, ServerNews } from "$lib/types";
	import { toast } from "svelte-sonner";
	import type { PageServerData } from "./$types";
	import ConfirmDelete from "./ConfirmDelete.svelte";
    
    export let data: PageServerData;

    const {session, application} = data;

    let showUpdate = false;

    onMount( () => {
        $navState.activeItem = "/status";
        
        if(session) $navState.sessionState = session, $statusState.application = application[0];
    });

    type UpdateApplicationValidation = {
        presentAddress: string[]
        religion: string[]
        dateOfBirth: string[]
        fName: string[]
        mName: string[]
        primarySchoolName: string[]
        primarySchoolAddress: string[]
        primaryGraduation: string[]
        secondarySchoolName: string[]
        secondarySchoolAddress: string[]
        secondaryGraduation: string[]
    };

    type UpdateApplicationNews = {
        msg: string
        session: Session
        application: ApplicationTB
        errors: UpdateApplicationValidation
    };

    let inputErrors: UpdateApplicationValidation | null = null;
    let updateApplicationLoader = false;

    const applicationTemp = {
        presentAddress: "",
        religion: "",
        dateOfBirth: "",
        fName: "",
        mName: "",
        primarySchoolName: "",
        primarySchoolAddress: "",
        primaryGraduation: "",
        secondarySchoolName: "",
        secondarySchoolAddress: "",
        secondaryGraduation: ""
    };

    const resetValue = () => 
    {
        applicationTemp.presentAddress = "";
        applicationTemp.religion = "";
        applicationTemp.dateOfBirth = "";
        applicationTemp.fName = "";
        applicationTemp.mName = "";
        applicationTemp.primarySchoolName = "";
        applicationTemp.primarySchoolAddress = "";
        applicationTemp.primaryGraduation = "";
        applicationTemp.secondarySchoolName = "";
        applicationTemp.secondarySchoolAddress = "";
        applicationTemp.secondaryGraduation = "";
    };


    const updateApplicationNews: SubmitFunction = () => 
    {   
        updateApplicationLoader = true;
        return async ({ result, update }) => 
        {
            const {status, data: {msg, session, errors, application}} = result as ServerNews<UpdateApplicationNews>;
                
            switch (status) {
                case 200:
                    $navState.sessionState = session;
                    $statusState.application = application;
                    toast.success("Application Updated", { description: msg});
                    updateApplicationLoader = false;
                    showUpdate = false;
                    break;
                
                case 402:
                    toast.error("Failed To Update Application", { description: msg});
                    updateApplicationLoader = false;
                    break;
                
                case 403:
                    inputErrors = errors;
                    updateApplicationLoader = false;
                    break;
                default:
                    break;
            };
            await update();
        };
    };

   
</script>



<div class="w-full sm:max-w-[70%] mx-auto flex flex-col gap-2 py-[10dvh]">

    {#if $statusState.application}
        <form method="POST" action="?/updateApplication" enctype="multipart/form-data" use:enhance={updateApplicationNews}>
            <Card.Root class="shadow-sm shadow-black dark:shadow-white w-full sm:max-w-2xl mx-auto ">
                <Card.Header class="">
                    <Card.Title class="text-center flex justify-start p-2">Application Status</Card.Title>
                    <Card.Title class="text-center flex justify-end gap-2">
                        
                        {#if showUpdate}
                            
                            <div class="" in:fly={{x:60, duration:400}}>
                                <Button on:click={() => {
                                    showUpdate = false;
                                    inputErrors = null;
                                    resetValue();

                                }}>Cancel</Button>
                            </div>
                            
                            <!--Update button that triggers main form-->
                            <div class="" in:fly={{x:-60, duration:400}}>
                                <Button type="submit" variant="destructive">
                                    <Mikespin name="Confirm" loader={updateApplicationLoader} loader_name="Updating.." />
                                </Button>
                            </div>


                        {:else}

                        
                            <div class="" in:fly={{x:60, duration:400}}>
                                <ConfirmDelete />
                            </div>
                        

                            <div class="" in:fly={{x:-60, duration:400}}>
                                <Button  on:click={() => showUpdate = true}>Update</Button>
                            </div>
                        {/if}
                        
        
                    </Card.Title>
                    
                </Card.Header>
        
                <Card.Content class="flex flex-col gap-4">
        
                    <div class="flex flex-col gap-1.5">
                        <Label for="course">Course:</Label>
                        <Input type="email" disabled value={$statusState.application?.course} />
                    </div>
        
                    <div class="flex flex-col gap-1.5">
                        <Label for="presentAddress">Present Address:</Label>
                        <Input name="presentAddress" type="text" value={showUpdate ? "" : $statusState.application?.present_address } disabled={!showUpdate}   />
                        {#each inputErrors?.presentAddress ?? [] as errMsg}
                            <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">{errMsg}</p>
                        {/each}
                    </div>
        
                    <div class="flex flex-col gap-1.5">
                        <Label for="religion">Religion:</Label>
                        <Input name="religion" type="text" value={showUpdate ? "" : $statusState.application?.religion} disabled={!showUpdate}  />
                        {#each inputErrors?.religion ?? [] as errMsg}
                            <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">{errMsg}</p>
                        {/each}
                    </div>
        
                
                    {#if showUpdate}
                        <div class="flex flex-col gap-1.5">
                            <Label for="dateOfBirth">Date Of Birth:</Label>
                            <Input name="dateOfBirth" type="date" />
                            {#each inputErrors?.dateOfBirth ?? [] as errMsg}
                                <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">{errMsg}</p>
                            {/each}
                        </div>
                    {:else}
                        <div class="flex flex-col gap-1.5">
                            <Label for="dateOfBirth">Date Of Birth:</Label>
                            <Input type="text" disabled value={$statusState.application?.date_of_birth} />
                        </div>
                    {/if}
        
                
        
                    <div class="flex flex-col gap-1.5">
                        <Label for="fName">Fathers Full Name:</Label>
                        <Input name="fName" type="text" value={showUpdate ? "" : $statusState.application?.fathers_name} disabled={!showUpdate} />
                        {#each inputErrors?.fName ?? [] as errMsg}
                            <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">{errMsg}</p>
                        {/each}
                    </div>
        
                    <div class="flex flex-col gap-1.5">
                        <Label for="mName">Mothers Full Name:</Label>
                        <Input name="mName" type="text" value={showUpdate ? "" : $statusState.application?.mothers_name} disabled={!showUpdate} />
                        {#each inputErrors?.mName ?? [] as errMsg}
                            <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">{errMsg}</p>
                        {/each}
                    </div>
        
                    <div class="flex flex-col gap-1.5">
                        <Label for="primarySchoolName">Primary School Name:</Label>
                        <Input name="primarySchoolName" type="text" value={showUpdate ? "" : $statusState.application?.primary_school_name} disabled={!showUpdate}  />
                        {#each inputErrors?.primarySchoolName ?? [] as errMsg}
                            <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">{errMsg}</p>
                        {/each}
                    </div>
        
                    <div class="flex flex-col gap-1.5">
                        <Label for="primarySchoolAddress">Primary School Address:</Label>
                        <Input name="primarySchoolAddress" type="text" value={showUpdate ? "" : $statusState.application?.primary_school_address} disabled={!showUpdate} />
                        {#each inputErrors?.primarySchoolAddress ?? [] as errMsg}
                            <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">{errMsg}</p>
                        {/each}
                    </div>
        
                    {#if showUpdate}
                        <div class="flex flex-col gap-1.5">
                            <Label for="primaryGraduation">Primary School Graduation Date:</Label>
                            <Input name="primaryGraduation" type="date"  />
                            {#each inputErrors?.primaryGraduation ?? [] as errMsg}
                                <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">{errMsg}</p>
                            {/each}
                        </div>
                    {:else}
                        <div class="flex flex-col gap-1.5">
                            <Label for="primaryGraduation">Primary School Graduation Date:</Label>
                            <Input type="text" disabled value={$statusState.application?.primary_graduation_date} />
                        </div>
                    {/if}
        
                    <div class="flex flex-col gap-1.5">
                        <Label for="secondarySchoolName">Secondary School Name:</Label>
                        <Input name="secondarySchoolName" type="text" value={showUpdate ? "" : $statusState.application?.secondary_school_name} disabled={!showUpdate} />
                        {#each inputErrors?.secondarySchoolName ?? [] as errMsg}
                            <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">{errMsg}</p>
                        {/each}
                    </div>
        
                    <div class="flex flex-col gap-1.5">
                        <Label for="secondarySchoolAddress">Secondary School Address:</Label>
                        <Input name="secondarySchoolAddress" type="text" value={showUpdate ? "" : $statusState.application?.secondary_school_address} disabled={!showUpdate} />
                        {#each inputErrors?.secondarySchoolAddress ?? [] as errMsg}
                            <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">{errMsg}</p>
                        {/each}
                    </div>
        
                    {#if showUpdate}
                        <div class="flex flex-col gap-1.5">
                            <Label for="secondaryGraduation">Secondary School Graduation Date:</Label>
                            <Input name="secondaryGraduation" type="date"  />
                            {#each inputErrors?.secondaryGraduation ?? [] as errMsg}
                                <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">{errMsg}</p>
                            {/each}
                        </div>
                    {:else}
                        <div class="flex flex-col gap-1.5">
                            <Label for="secondaryGraduation">Secondary School Graduation Date:</Label>
                            <Input type="text" disabled value={$statusState.application?.secondary_graduation_date} />
                        </div>
                    {/if}
        
                </Card.Content>
        
            </Card.Root>
        </form>
    {:else}
        <div class="flex flex-col gap-2 justify-center items-center">
            <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">There is no application</h3>
            <a href="/admission" class="text-blue-500 underline transition-all hover:text-red-500">Submit now?</a>
        </div>
    {/if}
</div>

