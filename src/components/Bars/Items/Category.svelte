<script>
  import Item from '@components/Bars/Item.svelte';
  import {
    draggedCategory,
    changeCategoryParent,
    categorySelected,
    addCategory,
    draggedItemIsCategory,
    getDraggedItemIsCategory,
    deleteCategory,
  } from '@helpers/category.js';
  import { changeNoteParent } from '@helpers/note.js';
  import { getUid } from '@helpers/user.js';

  export let expanded = false,
    name,
    categories,
    id = '',
    parent = '',
    renaming = false,
    newCategory = false;
  let item, categoryId;
  $: nochild = categories && (nochild = categories.length == 0 ? true : false);

  function categoryExpanded(e) {
    e.stopPropagation();
    categories && (expanded = !expanded);
  }

  function renameSave() {
    addCategory(getUid(), name);
  }

  function categoryToggled() {
    categorySelected.set({ name, id });
  }

  async function categoryDragged() {
    draggedItemIsCategory.set(true);
    draggedCategory.set(id);
  }

  async function categoryDropped() {
    const destination = id || '';
    if (getDraggedItemIsCategory() === true) {
      await changeCategoryParent(getUid(), destination);
    } else {
      await changeNoteParent(getUid(), destination);
    }
    expanded = true;
  }

  function categoryDelete() {
    const categoryIds = [];
    categoryIds.push(id);
    JSON.stringify(categories, (key, value) => {
      if (key === 'id') categoryIds.push(value);
      return value;
    });
    deleteCategory(getUid(), categoryIds);
  }
</script>

<style lang="scss">
  ul {
    list-style: none;
    padding-left: 0.5em;
    transition: 0.3s ease;
  }
  .expand {
    height: 1.5rem;
    width: 1.5rem;
    min-width: 1.5rem;
    transition: transform 0.1s;
    &.nochild {
      display: none;
    }
    &:hover {
      transform: scale(1.1);
    }
  }
  .folder {
    width: 1.3rem;
    min-width: 1.3rem;
  }
  #space2 {
    width: 1.5rem;
    min-width: 1.5rem;
  }
</style>

<Item
  {name}
  {renaming}
  newItem={newCategory}
  path="M312 320h136V56c0-13.3-10.7-24-24-24H24C10.7 32 0 42.7 0 56v400c0 13.3
  10.7 24 24 24h264V344c0-13.2 10.8-24 24-24zm129 55l-98 98c-4.5 4.5-10.6 7-17
  7h-6V352h128v6.1c0 6.3-2.5 12.4-7 16.9z"
  viewBox="0 0 448 512"
  droppable
  on:renameSave={renameSave}
  on:selectItem={categoryToggled}
  on:dragItem={categoryDragged}
  on:dropItem={categoryDropped}
  on:delete={categoryDelete}
  bind:newName={name}>
  {#if nochild}
    <div id="space2" />
  {/if}
  {#if expanded}
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="caret-down"
      class="expand svg-inline--fa fa-caret-down fa-w-10"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      on:click={categoryExpanded}
      class:nochild>
      <path
        fill="currentColor"
        d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5
        7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" />
    </svg>
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="folder-open"
      class="folder svg-inline--fa fa-folder-open fa-w-18"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512">
      <path
        fill="currentColor"
        d="M572.694 292.093L500.27 416.248A63.997 63.997 0 0 1 444.989
        448H45.025c-18.523 0-30.064-20.093-20.731-36.093l72.424-124.155A64 64 0
        0 1 152 256h399.964c18.523 0 30.064 20.093 20.73 36.093zM152
        224h328v-48c0-26.51-21.49-48-48-48H272l-64-64H48C21.49 64 0 85.49 0
        112v278.046l69.077-118.418C86.214 242.25 117.989 224 152 224z" />
    </svg>
  {:else}
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="caret-right"
      class="expand svg-inline--fa fa-caret-right fa-w-6"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 192 512"
      on:click={categoryExpanded}
      class:nochild>
      <path
        fill="currentColor"
        d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662
        128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0
        402.48 0 384.662z" />
    </svg>
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="folder"
      class="folder svg-inline--fa fa-folder fa-w-16"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512">
      <path
        fill="currentColor"
        d="M464 128H272l-64-64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48
        48h416c26.51 0 48-21.49 48-48V176c0-26.51-21.49-48-48-48z" />
    </svg>
  {/if}
</Item>

{#if expanded}
  <ul>
    {#if categories}
      {#each categories as category}
        <li>
          <svelte:self {...category} />
        </li>
      {/each}
    {/if}
  </ul>
{/if}
