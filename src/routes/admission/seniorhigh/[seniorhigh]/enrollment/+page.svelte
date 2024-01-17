<script lang="ts">
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import * as Card from "$lib/components/ui/card";
	import Button from "$lib/components/ui/button/button.svelte";
	import type { PageServerData } from "./$types";
	import { enhance } from "$app/forms";
	import type { SubmitFunction } from "@sveltejs/kit";
	import type { Session } from "@supabase/supabase-js";
	import type { ServerNews } from "$lib/types";
	import Mikespin from "$lib/components/loaders/mikespin.svelte";
	import { toast } from "svelte-sonner";
	import { navState } from "$lib";
	import { goto } from "$app/navigation";
   
    export let data: PageServerData;

    const {targetCourseDetails} = data;

    type SubmitApplicationValidation = {
        course: string[]
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

    type SubmitApplicationNews = {
        msg: string
        session: Session
        errors: SubmitApplicationValidation
    };

    let inputErrors: SubmitApplicationValidation | null = null;
    let submitApplicationLoader = false;

    const submitApplicationNews: SubmitFunction = () => 
    {
        submitApplicationLoader = true;
        return async ({ result, update }) => 
        {
            const {status, data: {msg, session, errors} } = result as ServerNews<SubmitApplicationNews>
                
            switch (status) {
                case 200:
                    $navState.sessionState = session;
                    toast.success("Application Submitted", { description: msg});
                    submitApplicationLoader = false;
                    goto("/status");
                    break;
                
                case 402:
                    submitApplicationLoader = false;
                    inputErrors = null;

                    if(msg === `new row violates row-level security policy for table "application_tb"`) toast.error("Failed To Submit Application", { description: "You have already submitted an application."});
                    else toast.error("Failed To Submit Application", { description: msg});
                    break;
                
                case 403:
                    inputErrors = errors;
                    submitApplicationLoader = false;
                    break;

                default:
                    break;
            };
            await update();
        };
    };
    
</script>

<div class="sm:max-w-xl mx-auto flex flex-col gap-2 py-[10dvh]">
    
    <form method="POST" action="?/submitApplication" enctype="multipart/form-data" use:enhance={submitApplicationNews}>
        <Card.Root class="shadow-sm shadow-black dark:shadow-white w-full sm:max-w-lg mx-auto ">
            <Card.Header>
                <Card.Title class="text-center">Personal Information</Card.Title>
            </Card.Header>
    
            <Card.Content class="flex flex-col gap-4">
    
                <div class="flex flex-col gap-1.5">
                    <Label for="course" class="text-xs font-bold">Course:</Label>
                    <Input type="text" disabled value={targetCourseDetails?.title}/>
                    <input name="course" type="hidden" class="hidden" value={targetCourseDetails?.title} />
                </div>
    
                <div class="flex flex-col gap-1.5">
                    <Label for="presentAddress" class="text-xs font-bold">Present Address:</Label>
                    <Input name="presentAddress" type="text" placeholder="Enter Your Present Address" />
                    {#each inputErrors?.presentAddress ?? [] as errMsg}
                        <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">{errMsg}</p>
                    {/each}
                </div>
    
                <div class="flex flex-col gap-1.5">
                    <Label for="religion" class="text-xs font-bold">Religion:</Label>
                    <Input name="religion" type="text" placeholder="Enter Your Religion" />
                    {#each inputErrors?.religion ?? [] as errMsg}
                        <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">{errMsg}</p>
                    {/each}
                </div>
    
                <div class="flex flex-col gap-1.5">
                    <Label for="dateOfBirth" class="text-xs font-bold">Date of birth:</Label>
                    <Input name="dateOfBirth" type="date" placeholder="Enter Your Date of birth" />
                    {#each inputErrors?.dateOfBirth ?? [] as errMsg}
                        <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">{errMsg}</p>
                    {/each}
                </div>
    
                <div class="flex flex-col gap-1.5">
                    <Label for="fName" class="text-xs font-bold">Fathers Full Name:</Label>
                    <Input name="fName" type="text" placeholder="Enter Your Father's Full Name" />
                    {#each inputErrors?.fName ?? [] as errMsg}
                        <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">{errMsg}</p>
                    {/each}
                </div>
    
                <div class="flex flex-col gap-1.5">
                    <Label for="mName" class="text-xs font-bold">Mothers Full Name:</Label>
                    <Input name="mName" type="text" placeholder="Enter Your Mothers Full Name" />
                    {#each inputErrors?.mName ?? [] as errMsg}
                        <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">{errMsg}</p>
                    {/each}
                </div>
    
            </Card.Content>
    
            <Card.Header>
                <Card.Title class="text-center">Education Information</Card.Title>
            </Card.Header>
    
            <Card.Content class="flex flex-col gap-4">
                <div class="flex flex-col gap-1.5">
                    <Label for="primarySchoolName" class="text-xs font-bold">Primary School Name:</Label>
                    <Input name="primarySchoolName" type="text" placeholder="Enter Your Primary School Name" />
                    {#each inputErrors?.primarySchoolName ?? [] as errMsg}
                        <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">{errMsg}</p>
                    {/each}
                </div>
    
                <div class="flex flex-col gap-1.5">
                    <Label for="primarySchoolAddress" class="text-xs font-bold">Primary School Address:</Label>
                    <Input name="primarySchoolAddress" type="text" placeholder="Enter Your Primary School Address" />
                    {#each inputErrors?.primarySchoolAddress ?? [] as errMsg}
                        <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">{errMsg}</p>
                    {/each}
                </div>
    
                <div class="flex flex-col gap-1.5">
                    <Label for="primaryGraduation" class="text-xs font-bold">Primary School Month/Year Graduated:</Label>
                    <Input name="primaryGraduation" type="text" placeholder="Enter Your Month and Year Secondary Graduation" />
                    {#each inputErrors?.primaryGraduation ?? [] as errMsg}
                        <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">{errMsg}</p>
                    {/each}
                </div>
    
                <div class="flex flex-col gap-1.5">
                    <Label for="secondarySchoolName" class="text-xs font-bold">Secondary School Name:</Label>
                    <Input name="secondarySchoolName" type="text" placeholder="Enter Your Secondary School Name" />
                    {#each inputErrors?.secondarySchoolName ?? [] as errMsg}
                        <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">{errMsg}</p>
                    {/each}
                </div>
    
                <div class="flex flex-col gap-1.5">
                    <Label for="secondarySchoolAddress" class="text-xs font-bold">Secondary School Address:</Label>
                    <Input name="secondarySchoolAddress" type="text" placeholder="Enter Your Secondary School Address" />
                    {#each inputErrors?.secondarySchoolAddress ?? [] as errMsg}
                        <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">{errMsg}</p>
                    {/each}
                </div>
    
                <div class="flex flex-col gap-1.5">
                    <Label for="secondaryGraduation" class="text-xs font-bold">Secondary School Month/Year Graduated:</Label>
                    <Input name="secondaryGraduation" type="text" placeholder="Enter Your Month and Year Secondary Graduation" />
                    {#each inputErrors?.secondaryGraduation ?? [] as errMsg}
                        <p class="text-xs px-2 text-red-700 font-bold dark:text-red-500">{errMsg}</p>
                    {/each}
                </div>
    
                <div class="flex md:justify-end justify-center">
                    <Button type="submit" class="mt-3">
                        <Mikespin name="Submit Application" loader={submitApplicationLoader} loader_name="Submitting.." />
                    </Button>
                </div>
            </Card.Content>
        </Card.Root>
    </form>
    

    

</div>