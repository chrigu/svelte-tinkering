<script>
  import { closeModal } from 'svelte-modals'

  // provided by <Modals />
  export let isOpen

  export let title
  export let message
  export let onSave;

  let formTitle = "";
  let formUrl = "";

  const save = () => {
    onSave(formTitle, formUrl);
    formTitle = "";
    formUrl = "";
    closeModal();
  };

</script>

{#if isOpen}
  <div role="dialog" class="modal">
    <div class="contents">
      <h2>{title}</h2>
      <p>{message}</p>
      <form>
        <input class="border-2" type="text" bind:value="{formTitle}" />
        <input class="border-2" type="text" bind:value="{formUrl}" />
      </form>
      <div class="actions">
        <button on:click={save}>Speichern</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    /* allow click-through to backdrop */
    pointer-events: none;
  }

  .contents {
    min-width: 240px;
    border-radius: 6px;
    padding: 16px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: auto;
  }

  h2 {
    text-align: center;
    font-size: 24px;
  }

  p {
    text-align: center;
    margin-top: 16px;
  }

  .actions {
    margin-top: 32px;
    display: flex;
    justify-content: flex-end;
  }

</style>