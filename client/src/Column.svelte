<script>
import { createEventDispatcher } from 'svelte';

  export let id;

  const dispatch = createEventDispatcher();

  function handleDragEnter (e) {
    e.preventDefault;
    console.log('dragenter');
  }

  const handleDragDrop = (e) => {
    let recipeId = +e.dataTransfer
      .getData("text");
    
    console.log(`dropped ${recipeId} on ${id}`);

    dispatch('recipePlaced', {
      recipeId: recipeId,
      columnId: id
		});
  }
</script>

<div 
  class="basis-1/6 h-full"
  on:dragenter={handleDragEnter}
  on:drop={handleDragDrop}
  ondragover="return false">
  <slot />
</div>