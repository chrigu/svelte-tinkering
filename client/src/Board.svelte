<script>
	import { openModal, closeModal, Modals } from 'svelte-modals';
	import FormModal from './FormModal.svelte';

	import Column from './Column.svelte';
	import Card from './Card.svelte';

	import createRecipe from './recipe';

	let cookbook = [];
	let recipes = [];

	let days = [
		{
			id: 0,
			name: 'Montag',
			recipes: [] 
		},
		{
			id: 1,
			name: 'Dienstag',
			recipes: [] 
		},
		{
			id: 2,
			name: 'Mittwoch',
			recipes: [] 
		},
		{
			id: 3,
			name: 'Donnerstag',
			recipes: [] 
		}
	];

	const addRecipe = (title, url) => {
		const recipe = createRecipe(title, url);
		recipes = [...recipes, recipe];
		cookbook = [...cookbook, recipe.id];
		console.log(cookbook, recipes);
	};

	const add = () =>
		openModal(FormModal, {
			title: 'Rezept hinzufügen',
			message: 'This is an alert',
			onSave: addRecipe
		});

	const moveRecipe = (event) => {
		const recipeId = event.detail.recipeId;
		const columnId = event.detail.columnId;
		console.log(`Move ${recipeId} to ${columnId}`);

		// remove
		cookbook = cookbook.filter(recipe => recipe != recipeId);
		days = days.map(day => Object.assign({}, day, {
      recipes: day.recipes.filter(recipe => recipe != recipeId)
    }));

		if (columnId === -1) {
			cookbook = [...cookbook, recipeId];
		} else {
			for (let day of days) {
        console.log(day)
				if (day.id === columnId) {
          day.recipes = [...day.recipes, recipeId]
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
      {#each recipes.filter(recipe => day.recipes.indexOf(recipe.id) > -1) as recipe}
			  <Card {recipe} />
		  {/each}
		</Column>
	{/each}
</div>
