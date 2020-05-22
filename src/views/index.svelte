<script>
  import Header from '@components/Header.svelte';
  import CategoryBar from '@components/CategoryBar/CategoryBar.svelte';
  import NotesBar from '@components/NotesBar.svelte';
  import Editor from '@components/Editor.svelte';

  import firebase from 'firebase/app';

  const user = firebase.auth().currentUser;

  let uid;

  if (user != null) {
    uid = user.uid;
    console.log(uid);
  }
</script>

<style lang="scss">
  #container {
    display: flex;
  }
  #content-box {
    padding-top: 80px;
    width: auto;
    display: block;
    flex: 1;
    #content {
      margin: 0 60px;
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
