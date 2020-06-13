<script>
  import Menu from '@components/Menu/Menu.svelte';
  import MenuItem from '@components/Menu/MenuItem.svelte';
  import ItemBar from '@components/Header/ItemBar.svelte';
  import Item from '@components/Header/Item.svelte';

  import itemBarItems from '@config/itemBarItems.js';

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
      font-family: 'Unica One', serif;
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
  <ItemBar>
    {#each itemBarItems as item}
      <Item {...item} />
    {/each}
  </ItemBar>
</header>
