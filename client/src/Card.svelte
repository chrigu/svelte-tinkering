<script>
  export let recipe;
  let status = 'static';

  function handleDragStart(e) {

    console.log('dragging', recipe.title)
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer
      .setData("text", recipe.id); 

    setTimeout(() => {
    status = 'dragging';
    }, 0);
  }

  function handleDragEnd (e) {
    status = 'static';
    console.log('dragginEnd', recipe.id)
  }
</script>


<div 
  class="{status === 'static' ? '' : 'hidden'}"
  draggable="true"
  on:dragstart={handleDragStart}
  on:dragend={handleDragEnd}>
  {recipe.title}
</div>
