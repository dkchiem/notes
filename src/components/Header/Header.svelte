<script>
  import Menu from '@components/Menu/Menu.svelte';
  import MenuItem from '@components/Menu/MenuItem.svelte';
  import ItemBar from '@components/Header/ItemBar.svelte';

  let showMenu, stayOpen;

  function logout() {
    console.log('Logout');
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigateTo('/login');
      })
      .catch(function(error) {
        console.log(error);
      });
  }
</script>

<style lang="scss">
  @import 'src/styles/_colors.scss';
  @import 'src/styles/_variables.scss';

  header {
    padding: 0 5%;
    //box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1000;
    background-color: white;
    height: $header-height;
    display: flex;
    align-items: center;
    display: flex;
    h1 {
      user-select: none;
      font-family: 'Unica One', cursive;
    }
    #space {
      flex: 1;
    }
    #menu-btn {
      margin-left: auto;
      height: 4rem;
      cursor: pointer;
      padding: 1rem;
    }
    #menu {
      opacity: 0;
      visibility: 0;
      transition: 0.3s;
      &.showMenu {
        opacity: 1;
        visibility: 1;
      }
    }
  }
</style>

<header>
  <h1>Notes</h1>
  <div id="space" />
  <ItemBar />
  <!-- <svg
    id="menu-btn"
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="ellipsis-h"
    class="svg-inline--fa fa-ellipsis-h fa-w-16"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    on:click={() => {
      stayOpen = !stayOpen;
      showMenu = stayOpen;
    }}
    on:mouseover={() => {
      !stayOpen && (showMenu = true);
    }}
    on:mouseleave={() => {
      !stayOpen && (showMenu = false);
    }}>
    <path
      fill="currentColor"
      d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72
      72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2
      72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2
      72-72-32.2-72-72-72z" />
  </svg> -->
  <!-- <div id="menu" class:showMenu>
    <Menu>
      <MenuItem>Hello</MenuItem>
      <MenuItem>test</MenuItem>
      <MenuItem>ha</MenuItem>
      <MenuItem>Log out</MenuItem>
    </Menu>
  </div> -->
</header>
