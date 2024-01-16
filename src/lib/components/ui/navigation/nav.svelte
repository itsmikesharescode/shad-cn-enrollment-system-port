<script lang="ts">
	import Mikemode from "../mikemode/mikemode.svelte";

    let showMobileMenu = false;

    import { navState } from "$lib";
	import { goto } from "$app/navigation";

    function showMobile () {
        showMobileMenu = !showMobileMenu;
    }

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
                {#if true}
                    <button class="text-sm font-bold p-2 rounded-sm transition-all" 
                    on:click={() => goto("/signin")}>Sign in</button>
                    <button class="text-sm font-bold p-2 rounded-sm transition-all bg-green-500 dark:bg-green-600 text-white"
                    on:click={() => goto("/signin?signup")}
                    >Sign up Free</button>
                {:else}
                    <button class="text-sm font-bold p-2 rounded-sm transition-all bg-red-500 dark:bg-red-600 text-white">Sign out</button>
                {/if}

                
            </div>
    
            <Mikemode />
        </div>

    </div>
</div>

{#if showMobileMenu}
    <div class="fixed text-slate-400 bg-[#00000050]  top-0 left-0 right-0 bottom-0 md:hidden z-1">
        

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
                    on:click={() => $navState.activeItem = selection.url}
                    >{selection.title}</a>
                {/each}
            </div>
            
        </div>

    </div>
{/if}