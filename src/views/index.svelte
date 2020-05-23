<script>
  import Header from '@components/Header.svelte';
  import CategoryBar from '@components/CategoryBar/CategoryBar.svelte';
  import NotesBar from '@components/NotesBar.svelte';
  import Editor from '@components/Editor.svelte';

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
  <CategoryBar userID={uid} />
  <NotesBar />
  <div id="content-box">
    <div id="content">
      <Editor />
    </div>
  </div>
</div>
