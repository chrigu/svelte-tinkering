<script>
	import { openModal, closeModal, Modals } from 'svelte-modals';
	import Modal from './Modal.svelte';

	import Column from './Column.svelte';
	import Card from './Card.svelte';

	import createRecipe from './recipe';

	let cookbook = [];
	let recipes = [];

	let days = [
		{
			id: 0,
			name: 'Montag',
			recipeId: -1
		},
		{
			id: 1,
			name: 'Dienstag',
			recipeId: -1
		},
		{
			id: 2,
			name: 'Mittwoch',
			recipeId: -1
		},
		{
			id: 3,
			name: 'Donnerstag',
			recipeId: -1
		}
	];

	const addRecipe = (title, url) => {
		const recipe = createRecipe(title, url);
		recipes = [...recipes, recipe];
		cookbook = [...cookbook, recipe.id];
		console.log(cookbook, recipes);
	};

	const add = () =>
		openModal(Modal, {
			title: 'Rezept hinzufügen',
			message: 'This is an alert',
			onSave: addRecipe
		});

	const moveRecipe = (event) => {
		const recipeId = event.detail.recipeId;
		const columnId = event.detail.columnId;
		console.log(`Move ${recipeId} to ${columnId}`);

		// remove
		cookbook = cookbook.filter((recipe) => recipe != event.detail.recipeId);
		days = days.map((day) => {
			if (day.recipeId === event.detail.recipeId) {
				day.recipeId = -1;
			}
			return day;
		});

    console.log(recipeId, columnId)
		if (columnId == -1) {
			cookbook = [...cookbook, recipeId];
		} else {
			for (let day of days) {
				if (day.id === columnId) {
					day.recipeId = recipeId;
				}
			}
		}
		console.log(cookbook, days);
	};
</script>

<div class="flex h-96 flex-row">
	<Column id={-1} on:recipePlaced={moveRecipe}>
		Kochbuch
		<button on:click={add}>Hinzufügen</button>
		{#each recipes.filter((recipe) => cookbook.indexOf(recipe.id) > -1) as recipe}
			<Card {recipe} />
		{/each}
	</Column>
	{#each days as day}
		<Column id={day.id} on:recipePlaced={moveRecipe}>
			{day.name}
			{#if day.recipeId > -1}
        <Card recipe={recipes.filter(recipe => recipe.id === day.recipeId)[0]} />
			{/if}
		</Column>
	{/each}
</div>
