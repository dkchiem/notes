<script>
  import Header from '@components/Header/Header.svelte';
  import Editor from '@components/Editor.svelte';
  import Bar from '@components/Bars/Bar.svelte';
  import Note from '@components/Bars/Note.svelte';
  import Category from '@components/Bars/Category.svelte';
  import Toolbar from '@components/Bars/Toolbar.svelte';

  import {
    getCategories,
    getNotes,
    categoriesStore,
  } from '@helpers/database.js';
  import { userID, getUid } from '@helpers/user.js';
  import { categorySelected } from '@helpers/category.js';

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
</script>

<style lang="scss">
  @import 'src/styles/_colors.scss';
  @import 'src/styles/_variables.scss';

  #container {
    display: flex;
    height: 100vh;
    padding-top: $header-height;
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
<div id="container">

  <Bar title="Categories" barColor="#52de97" position="0">
    <div class="slot" slot="toolbar">
      <Toolbar />
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
