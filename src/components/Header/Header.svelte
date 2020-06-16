<script>
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
    #logo {
      height: 75%;
      margin-right: 10px;
    }
    #space {
      flex: 1;
    }
  }
</style>

<header>
  <img id="logo" src="../../assets/logo.png" alt="logo" />
  <h1>Notes</h1>
  <div id="space" />
  <ItemBar>
    {#each itemBarItems as item}
      <Item {...item} />
    {/each}
  </ItemBar>
</header>
