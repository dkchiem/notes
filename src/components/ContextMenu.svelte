<script>
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';

  let transformOrigin = 'top left';

  let menu,
    active = false;

  function activateContextMenu(e) {
    // console.log(e);
    transformOrigin = 'top left';
    menu.style.top = e.pageY + 'px';
    menu.style.left = e.pageX + 'px';
    active = true;
  }

  export function activateDropdownMenu(e) {
    transformOrigin = 'top right';
    // console.log(e);
    // menu.style.top = e.pageY + 'px';
    // menu.style.right = e.pageX + 'px';
    // active = true;
    active = true;
  }

  onMount(() => {
    // window.addEventListener('contextmenu', (e) => {
    //   e.preventDefault();
    //   activateContextMenu(e);
    // });
    // window.addEventListener('click', () => {
    //   active = false;
    // });
    // window.setTimeout(() => {
    //   contextMenu.style.visibility = 'visible';
    // }, 1000);
  });
</script>

<style lang="scss">
  $transform-origin: var(--transform-origin);

  @keyframes scaleIn {
    0% {
      opacity: 1;
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  #menu {
    position: fixed;
    z-index: 10000;
    width: 150px;
    background: #1b1a1a;
    border-radius: 5px;
    transform-origin: $transform-origin;
    list-style: none;
    overflow: hidden;
    display: none;
    &.active {
      display: block;
      animation: scaleIn 0.3s ease-in-out;
      animation-fill-mode: forwards;
    }
    .item {
      padding: 8px 10px;
      font-size: 15px;
      color: white;
      cursor: pointer;
      &:hover {
        background-color: #555;
      }
      i {
        display: inline-block;
        margin-right: 5px;
      }
    }
    hr {
      margin: 2px 0px;
      background-color: #555;
      border: none;
      height: 1px;
    }
  }
</style>

<ul
  id="menu"
  class:active
  bind:this={menu}
  style="--transform-origin: {transformOrigin};">
  <li class="item">
    <i class="fa fa-cut" />
    Cut
  </li>
  <li class="item">
    <i class="fa fa-clone" />
    Copy
  </li>
  <li class="item">
    <i class="fa fa-paste" />
    Paste
  </li>
  <li class="item">
    <i class="fa fa-trash-o" />
    Delete
  </li>
  <hr />
  <li class="item">
    <i class="fa fa-refresh" />
    Reload
  </li>
</ul>
