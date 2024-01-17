<script lang="ts">
	import Mikemode from "../mikemode/mikemode.svelte";



    let showMobileMenu = false;

    import { navState } from "$lib";
	import { goto } from "$app/navigation";
	import Mikespin from "$lib/components/loaders/mikespin.svelte";
	import { enhance } from "$app/forms";
	import type { SubmitFunction } from "@sveltejs/kit";
	import type { ServerNews } from "$lib/types";
	import { toast } from "svelte-sonner";
	import Button from "../button/button.svelte";

    function showMobile () {
        showMobileMenu = !showMobileMenu;
    };

    let signOutLoader = false;

    const signOutNews: SubmitFunction = () => 
    {
        signOutLoader = true;
        return async ({ result, update }) => 
        {
            const {status, data: {msg}} = result as ServerNews<{msg: string}>
                
            switch (status) {
                case 200:
                    $navState.sessionState = null;
                    $navState.defaultNav = $navState.staticNav;
                    toast.success("Signed out", { description: msg});
                    signOutLoader = false;
                    goto("/signin?Thank-you!");
                    break;
                
                case 402:
                    toast.error("Failed To Sign out", { description: msg});
                    signOutLoader = false;
                    break;
                
                default:
                    break;
            };
            await update();
        };
    };

</script>

<div class="fixed left-0 right-0 top-0 backdrop-blur-sm p-2 w-full shadow-sm shadow-black dark:shadow-white flex items-center md:justify-center">
    <div class="flex items-center w-full md:max-w-[70%] truncate">
        <button class="flex flex-col gap-1 p-2 md:hidden " on:click={() => showMobileMenu = true}>
            <div class="w-2 border-b-2 border-black dark:border-slate-400"></div>
            <div class="w-4 border-b-2 border-black dark:border-slate-400"></div>
            <div class="w-8 border-b-2 border-black dark:border-slate-400"></div>
        </button>
    
        <div class="hidden md:flex items-center text-slate-500">
            {#each $navState.defaultNav as selection}
                <a href={selection.url} 
                class="p-2 transition-all rounded-lg {$navState.activeItem === selection.url ? "text-black font-bold dark:text-white" : ""}"
                on:click={() => $navState.activeItem = selection.url}
                >{selection.title}</a>
            {/each}
        </div>
    
        <div class="flex w-full justify-end items-center gap-2 truncate">
    
            <div class="flex items-center gap-2">
                {#if $navState.sessionState}
                    <div class="hidden lg:flex items-center">
                        <p class="leading-7 [&:not(:first-child)] text-sm font-bold">Hello,</p>
                        <p class="leading-7 [&:not(:first-child)] text-sm font-bold">{$navState.sessionState.user.user_metadata.fullname}</p>
                    </div>

                    <form method="POST" action="/signin?/signOut" enctype="multipart/form-data" use:enhance={signOutNews}>
                        <Button type="submit" variant="destructive" >
                            <Mikespin name="Sign out" loader={signOutLoader} loader_name="Signing out.."  />
                        </Button>
                    </form>

                {:else}
                    <Button variant="ghost" on:click={() => goto("/signin")} > Sign in</Button>
                    <Button on:click={() => goto("/signin?signup")} > Sign up Free </Button>
                {/if}

                
            </div>
    
            <div class="truncate">
                <Mikemode />
            </div>
        </div>

    </div>
</div>

{#if showMobileMenu}
    <div class="fixed text-slate-400 bg-[#00000050]  top-0 left-0 right-0 bottom-0 md:hidden z-10">
        

        <div class="bg-white dark:bg-[#070606] shadow-sm shadow-white">
            <div class="flex flex-row-reverse p-2">
                <button class="flex gap-1 p-2 flex-col-reverse items-end" on:click={() => showMobileMenu = false}>
                    <div class="w-2 border-b-2 border-black dark:border-slate-400"></div>
                    <div class="w-4 border-b-2 border-black dark:border-slate-400"></div>
                    <div class="w-8 border-b-2 border-black dark:border-slate-400"></div>
                </button>
            </div>
        
        
            <div class="flex flex-col justify-center items-center p-5 gap-5">
                {#each $navState.defaultNav as selection}
                    <a href={selection.url} 
                    class="p-2 transition-all rounded-lg {$navState.activeItem === selection.url ? "text-black font-bold dark:text-white" : ""}"
                    on:click={() => {
                        $navState.activeItem = selection.url;
                        showMobileMenu = false;
                    }}
                    >{selection.title}</a>
                {/each}
            </div>

            
            
        </div>

    </div>
{/if}