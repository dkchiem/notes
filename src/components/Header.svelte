<script>
  import Menu from './Menu/Menu.svelte';
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';
  @import 'src/styles/_variables.scss';

  header {
    padding: 0 30px;
    //box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1000;
    background-color: white;
    height: $header-height;
    display: flex;
    align-items: center;
    font-family: 'Unica One', cursive;
    display: flex;
    border-bottom: solid 1px #979797;
    #menu-btn {
      margin-left: auto;
      height: 2rem;
      cursor: pointer;
    }
  }
</style>

<header>
  <h1>Notes</h1>
  <svg
    id="menu-btn"
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="ellipsis-h"
    class="svg-inline--fa fa-ellipsis-h fa-w-16"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512">
    <path
      fill="currentColor"
      d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72
      72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2
      72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2
      72-72-32.2-72-72-72z" />
  </svg>
  <Menu />
</header>
