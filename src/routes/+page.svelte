 <script lang="ts">
	import ProductCard from "$lib/productCard.svelte";
	import { get } from "svelte/store";
	import { cartItems } from "../cart";


	const products:Product[] = [
		 
		 {
			id: "1",
			name: "Sunglasses",
			price: 5
		 },
		 {
			id: "2",
			name: "coffee",
			price: 10
		 },
		 {
			id: "3",
			name: "water bottle",
			price: 15
		 },
		
	]
	async function checkout() {
		await fetch("api/stripeCheckout", { // http://localhost:5173/api/stripeCheckout
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(
				{ items: get(cartItems) }
			)
		}).then((data) => {
			return data.json()
		}).then((data) => {
			window.location.replace(data.url);
		});
	}
 </script>

<div class="container h-full mx-auto flex justify-center items-center">
	 <div class="grid grid-cols-3 gap-4">
		<div class="col-span-3">
			<h1>Svelte 1.0 store</h1>
		</div>
		{#each products as product}
		<ProductCard product = {product}/>
		{/each}
		<div class="col-span-3">
			<button class="btn variant-filled-primary" on:click={()=> checkout()}>checkout with stripe API</button>
		</div>
	 </div>
</div>
