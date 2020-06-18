<script>
  import { fly } from 'svelte/transition';
  import {
    getCategories,
    destinationCategory,
    initalCategory,
    changeParent,
    categorySelected,
  } from '@helpers/category.js';
  import { getUid } from '@helpers/user.js';

  export let expanded = false,
    name,
    categories,
    parent,
    id,
    renaming = false;
  let settings, categoryId;
  $: nochild = categories && (nochild = categories.length == 0 ? true : false);

  // Click actions
  function categoryExpanded(e) {
    e.stopPropagation();
    categories && (expanded = !expanded);
  }

  function categoryToggled() {
    categorySelected.set({ name: name, id: id });
  }

  function settingsToggled(e) {
    e.stopPropagation();
    console.log('settings');
    settings = !settings;
  }

  // Text input actions
  function onKeyup(e) {
    if (e.keyCode === 13) {
      // Enter key
      renaming = false;
    }
  }

  // Drag actions
  function categoryDragStart() {
    setTimeout(() => {
      this.style.display = 'none';
      initalCategory.set(id);
    }, 0);
  }

  function categoryDragEnd() {
    setTimeout(() => {
      this.style.display = null;
      this.style.backgroundColor = null;
    }, 0);
  }

  function categoryDragEnter(e) {
    e.preventDefault();
    this.style.backgroundColor = '#eeeeee';
  }

  function categoryDragOver(e) {
    e.preventDefault();
  }

  function categoryDragLeave() {
    this.style.backgroundColor = null;
  }

  async function categoryDrop() {
    this.style.backgroundColor = null;
    destinationCategory.set(id || '');
    await changeParent(getUid());
    expanded = true;
  }
</script>

<style lang="scss">
  @import 'src/styles/_colors.scss';
  @import 'src/styles/_variables.scss';

  ul {
    list-style: none;
    padding-left: 0.5em;
    transition: 0.3s ease;
  }

  li {
    list-style: none;
  }

  .item {
    align-items: center;
    background-color: white;
    border-radius: 5px;
    color: $color-gray;
    cursor: pointer;
    display: flex;
    margin: 5px 0 5px auto;
    padding: 10px;
    transition: 0.3s ease;
    user-select: none;
    width: 100%;
    &:hover {
      background-color: $color-light-gray;
    }
    * {
      margin: 0 5px;
    }
    #rename {
      height: 1.5rem;
      flex: 1;
      border-radius: 5px;
      border: $border;
      padding: 0 10px;
    }
    .expand {
      height: 1.5rem;
      width: 1.5rem;
      min-width: 0.75rem;
      transition: transform 0.1s;
      &:hover {
        transform: scale(1.1);
      }
    }
    .folder {
      width: 1.3rem;
      min-width: 1.3rem;
    }
    #space {
      flex: 1;
    }
    #settings {
      width: 1.3rem;
      min-width: 1.3rem;
      transition: transform 0.5s ease;
      &:hover {
        transform: rotate(180deg);
      }
    }
    #grip-lines {
      cursor: grab;
      width: 1.3rem;
      min-width: 1.3rem;
    }
  }

  .nochild {
    .expand {
      opacity: 0;
    }
  }
</style>

<div
  class="item"
  class:nochild
  in:fly={{ y: 20, duration: 500 }}
  draggable="true"
  on:click={categoryToggled}
  on:dragstart={categoryDragStart}
  on:dragend={categoryDragEnd}
  on:dragenter={categoryDragEnter}
  on:dragleave={categoryDragLeave}
  on:dragover={categoryDragOver}
  on:drop={categoryDrop}>
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
      on:click={categoryExpanded}>
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
      on:click={categoryExpanded}>
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
  {#if renaming}
    <input
      id="rename"
      type="text"
      bind:value={name}
      placeholder="Category Name"
      autocomplete="off"
      on:keyup={onKeyup} />
  {:else}
    <span>{name}</span>
    <div id="space" />
  {/if}
  <svg
    on:click={settingsToggled}
    id="settings"
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="cog"
    class="svg-inline--fa fa-cog fa-w-16"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512">
    <path
      fill="currentColor"
      d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8
      7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8
      110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2
      0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7
      85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2
      5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14
      11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4
      38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0
      5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9
      2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6
      1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80
      35.9 80 80-35.9 80-80 80z" />
  </svg>
  <svg
    id="grip-lines"
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="grip-lines"
    class="svg-inline--fa fa-grip-lines fa-w-16"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512">
    <path
      fill="#b0b0b0"
      d="M496 288H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2
      16-16v-32c0-8.8-7.2-16-16-16zm0-128H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16
      16 16h480c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16z" />
  </svg>
</div>

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
