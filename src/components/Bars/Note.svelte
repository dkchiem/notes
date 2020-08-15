<script>
  import { fly } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import { addNote } from '@helpers/note.js';
  import { getUid } from '@helpers/user.js';

  const dispatch = createEventDispatcher();

  export let name,
    id,
    markdown,
    renaming = false,
    newNote = false,
    parentCategoryID;

  // Click actions
  function noteToggled() {
    dispatch('noteToggled', {
      name: name,
      id: id,
      markdown: markdown,
    });
  }

  function cancelAddNote(e) {
    e.stopPropagation();
  }

  // Text input actions
  async function renameKeyup(e) {
    // Enter key
    if (e.keyCode === 13) {
      renaming = false;
      const data = await addNote(getUid(), parentCategoryID, name);
      id = data[0].id;
      dispatch('renameSave', data);
    }
  }
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';

  .item {
    align-items: center;
    background-color: white;
    border-radius: 10px;
    color: $color-gray;
    cursor: pointer;
    display: flex;
    margin-bottom: 5px;
    padding: 10px 20px;
    transition: 0.3s ease;
    width: 100%;
    #minus {
      height: 1rem;
      width: 1.5rem;
      min-width: 1.5rem;
      transition: transform 0.1s;
      &:hover {
        transform: scale(1.1);
      }
      &.hidden {
        display: none;
      }
    }
    svg {
      height: 1.2rem;
      margin-right: 10px;
    }
    &:hover {
      background-color: $color-light-gray;
    }
  }
</style>

<div
  class="item"
  transition:fly={{ y: 20, duration: 500 }}
  on:click={noteToggled}>

  {#if renaming}
    <svg
      id="minus"
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="minus-circle"
      class="svg-inline--fa fa-minus-circle fa-w-16"
      class:hidden={!newNote}
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      on:click={cancelAddNote}>
      <path
        fill="currentColor"
        d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256
        8zM124 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4
        12 12v56c0 6.6-5.4 12-12 12H124z" />
    </svg>
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="sticky-note"
      class="svg-inline--fa fa-sticky-note fa-w-14"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512">
      <path
        fill="currentColor"
        d="M312 320h136V56c0-13.3-10.7-24-24-24H24C10.7 32 0 42.7 0 56v400c0
        13.3 10.7 24 24 24h264V344c0-13.2 10.8-24 24-24zm129 55l-98 98c-4.5
        4.5-10.6 7-17 7h-6V352h128v6.1c0 6.3-2.5 12.4-7 16.9z" />
    </svg>
    <input
      id="rename"
      type="text"
      bind:value={name}
      placeholder="Category Name"
      autocomplete="off"
      on:keyup={renameKeyup} />
  {:else}
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="sticky-note"
      class="svg-inline--fa fa-sticky-note fa-w-14"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512">
      <path
        fill="currentColor"
        d="M312 320h136V56c0-13.3-10.7-24-24-24H24C10.7 32 0 42.7 0 56v400c0
        13.3 10.7 24 24 24h264V344c0-13.2 10.8-24 24-24zm129 55l-98 98c-4.5
        4.5-10.6 7-17 7h-6V352h128v6.1c0 6.3-2.5 12.4-7 16.9z" />
    </svg>
    <span>{name}</span>
  {/if}
</div>
