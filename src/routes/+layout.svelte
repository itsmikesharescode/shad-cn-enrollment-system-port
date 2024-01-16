<script>
	import '../app.pcss';
	import { page } from '$app/stores';
	import Nav from '$lib/components/ui/navigation/nav.svelte';
	import { onMount } from 'svelte';
	import { navState } from '$lib';
	import Footer from '$lib/components/ui/footer/footer.svelte';

	onMount( () => {
		$navState.defaultNav = $navState.staticNav;
	})
	
</script>

<Nav />

<div class="mt-[10dvh] sm:mt-[8dvh] p-2 text-sm min-h-screen">
	<slot />
</div>

<Footer />


