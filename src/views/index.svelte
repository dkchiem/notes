<script>
  import Header from '@components/Header/Header.svelte';
  import Editor from '@components/Editor.svelte';
  import Bar from '@components/Bars/Bar.svelte';
  import Note from '@components/Bars/Note.svelte';
  import Category from '@components/Bars/Category.svelte';

  import { getCategories, getNotes } from '@helpers/database.js';
  import firebase from 'firebase/app';
  import { Doc, Collection } from 'sveltefire';
  import { onMount } from 'svelte';

  const user = firebase.auth().currentUser;
  let uid = 'UR2rQONWehG0QytSsAy4',
    title,
    markdown,
    categories,
    notes = [],
    category;

  const selectCategory = async (categoryID) => {
    console.log(categoryID);
    if (categoryID) {
      notes = await getNotes(uid, categoryID);
    }
  };

  onMount(() => {
    //user && (uid = user.uid);
    main();
  });

  async function main() {
    categories = await getCategories(uid);
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
    <Category {categories} name="Home" callback={selectCategory} expanded />
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
