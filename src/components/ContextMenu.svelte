<script>
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';

  let contextMenu,
    active = false;

  function activateMenu(e) {
    contextMenu.style.top = e.pageY + 'px';
    contextMenu.style.left = e.pageX + 'px';
    active = true;
  }

  onMount(() => {
    window.addEventListener('contextmenu', (e) => {
      event.preventDefault();
      activateMenu(e);
    });
    window.addEventListener('click', () => {
      active = false;
    });
    window.setTimeout(() => {
      contextMenu.style.visibility = 'visible';
    }, 1000);
  });
</script>

<style lang="scss">
  @keyframes scaleIn {
    0% {
      opacity: 1;
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      display: none;
    }
  }

  #context-menu {
    position: fixed;
    z-index: 10000;
    width: 150px;
    background: #1b1a1a;
    border-radius: 5px;
    transform-origin: top left;
    list-style: none;
    overflow: hidden;
    display: none;
    visibility: hidden;
    animation: fadeOut 0.3s;
    animation-fill-mode: forwards;
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

<ul id="context-menu" class:active bind:this={contextMenu}>
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
  <li class="item">
    <i class="fa fa-times" />
    Exit
  </li>
</ul>
