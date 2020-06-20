<script>
  import Header from '@components/Header/Header.svelte';
  import Editor from '@components/Editor.svelte';
  import Bar from '@components/Bars/Bar.svelte';
  import Note from '@components/Bars/Note.svelte';
  import Category from '@components/Bars/Category.svelte';
  import Tool from '@components/Bars/Tool.svelte';
  import ContextMenu from '@components/ContextMenu.svelte';

  import {
    categoriesStore,
    getCategories,
    categorySelected,
  } from '@helpers/category.js';
  import { getNotes } from '@helpers/note.js';
  import { userID, getUid } from '@helpers/user.js';
  import log from '@helpers/log.js';

  import firebase from 'firebase/app';
  import { onMount } from 'svelte';

  const user = firebase.auth().currentUser;
  let title,
    markdown,
    categories,
    notes = [];

  // const selectCategory = async (categoryID) => {
  //   console.log(categoryID);
  //   if (categoryID) {
  //     notes = await getNotes(getUid(), categoryID);
  //   }
  // };

  onMount(() => {
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

  async function selectNote(event) {
    const data = event.detail;
    title = data.name;
    markdown = '# HelloWorld!';
  }

  function addToggled() {
    console.log('add');
    categories.push({
      name: 'New Category',
      parent: '',
      categories: [],
      renaming: true,
    });
    categories = categories;
  }

  function searchToggled() {
    console.log('search');
  }
</script>

<style lang="scss">
  @import 'src/styles/_colors.scss';
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

<Header />
<ContextMenu />
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

  <Bar title="Notes" barColor="#303030" position="1">
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
