<script lang="ts">
    export let name = "mike";
    export let loader_name = "mike loading";
    export let loader = false;
</script>


{#if loader}
    <div class="flex items-center justify-center gap-1">
        <p class="">{loader_name}</p>
        <div class="w-4 h-4 border-2 border-b-black dark:border-b-white animate-spin rounded-full"></div>
    </div>
{:else}
    <p>{name}</p>
{/if}
