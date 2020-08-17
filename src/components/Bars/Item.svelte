<script>
  import { fly } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let name,
    renaming = false,
    newItem = false,
    droppable = false,
    newName = '';

  // SVG
  export let path, viewBox;

  let item, settings;

  // Click actions

  function itemToggled() {
    dispatch('selectItem');
  }

  function settingsToggled(e) {
    e.stopPropagation();
    settings = !settings;
  }

  function contextMenuToggled(e) {
    e.preventDefault();
  }

  function cancelAddItem(e) {
    e.stopPropagation();
  }

  // Text input actions
  function renameKeyup(e) {
    // Enter key
    if (e.keyCode === 13) {
      renaming = false;
      // addItem(getUid(), name);
      dispatch('renameSave');
    }
  }

  // Drag actions

  // Dragged item
  function dragStart() {
    setTimeout(() => {
      this.style.display = 'none';
      dispatch('dragItem');
    }, 0);
  }

  function dragEnd() {
    setTimeout(() => {
      this.style.display = null;
    }, 0);
  }

  // Dropped item
  function dragEnter(e) {
    e.preventDefault();
    droppable && (this.style.backgroundColor = '#eeeeee');
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragLeave() {
    droppable && (this.style.backgroundColor = null);
  }

  async function drop() {
    if (droppable) {
      this.style.backgroundColor = null;
      dispatch('dropItem');
    }
  }
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';

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
    .icon {
      width: 1.3rem;
      min-width: 1.3rem;
    }
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
</style>

<!-- class:nochild -->

<div
  class="item"
  in:fly={{ y: 20, duration: 500 }}
  draggable="true"
  bind:this={item}
  on:click={itemToggled}
  on:contextmenu={contextMenuToggled}
  on:dragstart={dragStart}
  on:dragend={dragEnd}
  on:dragenter={dragEnter}
  on:dragleave={dragLeave}
  on:dragover={dragOver}
  on:drop={drop}>

  {#if renaming}
    <svg
      id="minus"
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="minus-circle"
      class="svg-inline--fa fa-minus-circle fa-w-16"
      class:hidden={!newItem}
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      on:click={cancelAddItem}>
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
      class="icon"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      {viewBox}>
      <path fill="currentColor" d={path} />
    </svg>
    <input
      id="rename"
      type="text"
      bind:value={newName}
      placeholder="Name"
      autocomplete="off"
      on:keyup={renameKeyup}
      on:focus={() => {
        item.setAttribute('draggable', 'false');
      }}
      on:blur={() => {
        item.setAttribute('draggable', 'true');
      }} />
  {:else}
    <slot>
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        class="icon"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        {viewBox}>
        <path fill="currentColor" d={path} />
      </svg>
    </slot>
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
