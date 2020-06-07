<script>
  import Header from '@components/Header.svelte';
  import Editor from '@components/Editor.svelte';
  import Bar from '@components/Bars/Bar.svelte';
  import NoteItem from '@components/Bars/Notes/NoteItem.svelte';
  import Category from '@components/Bars/Category.svelte';

  import firebase from 'firebase/app';

  import { onMount } from 'svelte';

  const user = firebase.auth().currentUser;
  let uid, title, markdown;

  onMount(() => {
    user && (uid = user.uid);
  });

  function selectNote() {
    title = 'Hello';
    markdown = 'HelloWorld!';
    console.log(markdown);
  }

  let root = [
    {
      type: 'folder',
      name: 'Important work stuff',
      categories: [{ type: 'file', name: 'quarterly-results.xlsx' }],
    },
    {
      type: 'folder',
      name: 'Animal GIFs',
      categories: [
        {
          type: 'folder',
          name: 'Dogs',
          categories: [
            { type: 'file', name: 'treadmill.gif' },
            { type: 'file', name: 'rope-jumping.gif' },
          ],
        },
        {
          type: 'folder',
          name: 'Goats',
          categories: [
            { type: 'file', name: 'parkour.gif' },
            { type: 'file', name: 'rampage.gif' },
          ],
        },
        { type: 'file', name: 'cat-roomba.gif' },
        { type: 'file', name: 'duck-shuffle.gif' },
        { type: 'file', name: 'monkey-on-a-pig.gif' },
      ],
    },
    { type: 'file', name: 'TODO.md' },
  ];
</script>

<style lang="scss">
  @import 'src/styles/_colors.scss';
  @import 'src/styles/_variables.scss';

  #container {
    display: flex;
    height: 100vh;
    padding-top: $header-height;
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
    <Category name="Home" categories={root} />
  </Bar>

  <Bar title="Notes" barColor="#303030" position="1">
    <NoteItem on:click={selectNote}>Test hey heyh hey</NoteItem>
    <NoteItem>Test</NoteItem>
    <NoteItem>Test</NoteItem>
    <NoteItem>Test</NoteItem>
    <NoteItem>Test</NoteItem>
  </Bar>

  <div id="content-box">
    <Editor {title} {markdown} />
  </div>
</div>
