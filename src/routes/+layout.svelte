<script lang="ts">
	import '../app.pcss';
	import { page } from '$app/stores';
	import Nav from '$lib/components/ui/navigation/nav.svelte';
	import { Toaster } from "$lib/components/ui/sonner";
	import { onMount } from 'svelte';
	import { navState } from '$lib';
	import Footer from '$lib/components/ui/footer/footer.svelte';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;
	const {session} = data;

	onMount( () => {

		if(session){
			const {user:{user_metadata: {role}}} = session;
			$navState.sessionState = session;
			if(role === "student") $navState.defaultNav = $navState.studentNav;
			else if(role === "admin") $navState.defaultNav = $navState.adminNav;

		}else $navState.defaultNav = $navState.staticNav;
		
	})
	
</script>
<Toaster richColors />

<Nav />

<div class="mt-[10dvh] sm:mt-[8dvh] p-2 text-sm min-h-screen">
	<slot />
</div>

<Footer />


