<script>
  import Header from '@components/Header.svelte';
  import Editor from '@components/Editor.svelte';
  import Bar from '@components/Bars/Bar.svelte';
  import NoteItem from '@components/Bars/Notes/NoteItem.svelte';
  import CategoryItem from '@components/Bars/Categories/CategoryItem.svelte';
  import CategoriesList from '@components/Bars/Categories/CategoriesList.svelte';

  import firebase from 'firebase/app';

  const user = firebase.auth().currentUser;
  let uid;

  user && (uid = user.uid);
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
    <CategoriesList userID="UR2rQONWehG0QytSsAy4" />
  </Bar>
  <Bar title="Notes" barColor="#303030" position="1">
    <NoteItem>Test hey heyh hey</NoteItem>
    <NoteItem>Test</NoteItem>
    <NoteItem>Test</NoteItem>
    <NoteItem>Test</NoteItem>
    <NoteItem>Test</NoteItem>
  </Bar>

  <div id="content-box">
    <Editor />
  </div>
</div>
