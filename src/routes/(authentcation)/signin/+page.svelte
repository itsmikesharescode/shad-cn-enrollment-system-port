<script lang="ts">
    import { page } from "$app/stores";
    import Signin from "./signin.svelte";
    import Signup from "./signup.svelte";
    import Forgotpass from "./forgotpass.svelte";

</script>

{#if $page.url.search === "?signup"}
    <Signup />
{:else if $page.url.search === "?forgotpass"}
    <Forgotpass />
{:else}
    <Signin />
{/if}