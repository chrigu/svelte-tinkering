<script>
  import { closeModal } from 'svelte-modals'
  import Modal from './Modal.svelte'

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
    <Modal title={title} message={message}>
      <form>
        <input class="border-2" type="text" bind:value="{formTitle}" />
        <input class="border-2" type="text" bind:value="{formUrl}" />
      </form>
      <div class="actions">
        <button on:click={save}>Speichern</button>
      </div>
  </Modal>
{/if}
