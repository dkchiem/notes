<script>
  import { onMount } from 'svelte';

  export let viewBox, path;
  let active = false,
    menuItem;

  // const outsideClickListener = (e) => {
  //   if (!menuItem.contains(e.target) && active) {
  //     // or use: event.target.closest(selector) === null
  //     active = false;
  //     removeClickListener();
  //   }
  // };

  // const removeClickListener = () => {
  //   document.removeEventListener('click', outsideClickListener);
  // };

  // onMount(() => {
  //   // window.addEventListener('click', (e) => {
  //   //   e.preventDefault();
  //   //   e.stopPropagation();
  //   //   active = !active;
  //   // });
  //   window.addEventListener('click', function (e) {
  //     if (this === e.target) {
  //       active = false;
  //     }
  //   });
  //   // document.addEventListener('click', outsideClickListener);
  // });

  function toggleItem() {
    //e.stopPropagation();
    // active = !active;
    active = true;
  }

  function closeDropdown() {
    active = false;
  }
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';

  .item {
    cursor: pointer;
    height: 25px;
    margin: 0 6px;
    width: 25px;
    position: relative;
    svg {
      height: 100%;
      width: 100%;
      color: $color-gray;
      &:hover {
        color: lighten($color-gray, 20%);
      }
    }
    .dropdown {
      position: absolute;
      top: 35px;
      right: -5px;
      display: none;
      z-index: 2000;
      &.active {
        display: block;
      }
    }
  }

  #overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    display: none;
    z-index: 1050;
    &.active {
      display: block;
    }
  }
</style>

<div class="item" bind:this={menuItem}>
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="info-circle"
    class="svg-inline--fa fa-info-circle fa-w-16"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    {viewBox}
    on:click={toggleItem}>
    <path fill="currentColor" d={path} />
  </svg>
  <div class="dropdown" class:active>
    <slot />
  </div>
</div>

<div id="overlay" class:active on:click={closeDropdown} />
