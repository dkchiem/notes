<script>
  // Components
  import Header from '@components/Header/Header.svelte';
  import Editor from '@components/Editor.svelte';
  import Bar from '@components/Bars/Bar.svelte';
  import Note from '@components/Bars/Note.svelte';
  import Category from '@components/Bars/Category.svelte';
  import Tool from '@components/Bars/Tool.svelte';
  import Menu from '@components/Header/Menu.svelte';
  import MenuItem from '@components/Header/MenuItem.svelte';
  import Dropdown from '@components/Menus/Dropdown.svelte';
  import DropdownItem from '@components/Menus/DropdownItem.svelte';

  // Helpers
  import {
    categoriesStore,
    getCategories,
    categorySelected,
  } from '@helpers/category.js';
  import { getNotes } from '@helpers/note.js';
  import { userID, getUid, isLoggedIn } from '@helpers/user.js';
  import log from '@helpers/log.js';

  // Packages
  import firebase from 'firebase/app';
  import { onMount } from 'svelte';
  import { replace } from 'svelte-spa-router';

  let title,
    markdown,
    categories,
    notes = [];
  let menuInfo;

  onMount(() => {
    console.log(firebase.auth().currentUser);
    userID.set('UR2rQONWehG0QytSsAy4');
    console.log(getUid());
    main();
  });

  async function main() {
    await getCategories(getUid());
    categoriesStore.subscribe((c) => {
      log.dev('categoriesStore update');
      categories = c;
    });
    categorySelected.subscribe(async (c) => {
      console.log(c);
      if (c.id) {
        notes = await getNotes(getUid(), c.id);
      }
    });
  }

  async function selectNote(e) {
    const data = e.detail;
    title = data.name;
    markdown = '# HelloWorld!';
    console.log('Hello');
  }

  function addToggled() {
    categories.push({
      name: 'New Category',
      parent: '',
      categories: [],
      renaming: true,
      newCategory: true,
    });
    categories = categories;
  }

  function searchToggled() {
    console.log('search');
  }

  function logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // console.log('logout');
        // console.log(firebase.auth().currentUser);
        replace('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  }
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';
  @import 'src/styles/_variables.scss';

  #container {
    display: flex;
    height: 100vh;
    padding-top: $header-height;
    .toolbar {
      display: flex;
    }
    #no-notes {
      position: absolute;
      top: 0;
    }
    #content-box {
      width: auto;
      display: block;
      flex: 1;
      padding: 20px 60px;
    }
  }
</style>

<Header>
  <Menu>
    <MenuItem
      path="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248
      248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42
      18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0
      6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12
      12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12
      12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"
      viewBox="0 0 512 512">
      <Dropdown>
        <DropdownItem>Help</DropdownItem>
        <DropdownItem>Credit</DropdownItem>
      </Dropdown>
    </MenuItem>
    <MenuItem
      path="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248
      8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0
      344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0
      4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7
      4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"
      viewBox="0 0 496 512">
      <Dropdown>
        <DropdownItem
          on:click={() => {
            console.log(firebase.auth().currentUser);
          }}>
          Settings
        </DropdownItem>
        <DropdownItem on:click={logout}>Logout</DropdownItem>
      </Dropdown>
    </MenuItem>
  </Menu>
</Header>
<div id="container">
  <Bar title="Categories" barColor="#52de97" position="0">
    <div class="slot" slot="toolbar">
      <div class="toolbar">
        <Tool
          name="Add"
          path="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32
          32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0
          17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0
          32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
          viewBox="0 0 448 512"
          on:toggle={addToggled} />
        <Tool
          name="Search"
          path="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7
          44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0
          92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4
          33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7
          0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0
          70.7-57.2 128-128 128z"
          viewBox="0 0 512 512"
          on:toggle={searchToggled} />
      </div>
    </div>
    <Category {categories} name="Home" expanded />
  </Bar>

  <Bar title="Notes" barColor="#202226" position="1">
    {#each notes as note}
      <Note {...note} on:noteToggled={selectNote} />
    {:else}
      <span id="no-notes">No notes found</span>
    {/each}
  </Bar>

  <div id="content-box">
    <Editor {title} {markdown} />
  </div>
</div>
