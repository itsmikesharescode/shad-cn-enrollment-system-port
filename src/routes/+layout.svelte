<script lang="ts">
	import '../app.pcss';
	import { navigating, page } from '$app/stores';
	import Nav from '$lib/components/ui/navigation/nav.svelte';
	import { Toaster } from "$lib/components/ui/sonner";
	import { onMount } from 'svelte';
	import { navState } from '$lib';
	import Footer from '$lib/components/ui/footer/footer.svelte';
	import MikeLoader from '$lib/components/loaders/mikeLoader.svelte';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;

	const {session, whoareyou} = data;

	onMount( () => {

		if(session){

			$navState.sessionState = session;
			if(whoareyou === "student") $navState.defaultNav = $navState.studentNav;
			else if(whoareyou === "admin") $navState.defaultNav = $navState.adminNav;

		}else $navState.defaultNav = $navState.staticNav;
		
	})

</script>
<Toaster richColors />


	
{#if $navigating}
	<div class="fixed bottom-0 top-0 left-0 right-0 bg-[#0000009a] dark:bg-[#343a316b] flex flex-col justify-center items-center gap-4 z-10">
		<MikeLoader />
		<p class="text-center font-bold">Loading...</p>
		<p><a href="https://www.youtube.com/@mikeSharesCode" target="_blank" class="text-red-600 font-bold underline transition-all hover:text-red-400">@mikeSharesCode</a></p>
	</div>
{/if}

<Nav />
<div class="mt-[10dvh] sm:mt-[8dvh] p-2 text-sm min-h-screen">
	<slot />
</div>
<Footer />

