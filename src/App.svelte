<script>
  import Header from '@components/Header.svelte';
  import CategoryBar from '@components/CategoryBar/CategoryBar.svelte';
  import NotesBar from '@components/NotesBar.svelte';
  import Editor from '@components/Editor.svelte';

  import firebase from 'firebase/app';
  import { FirebaseApp } from 'sveltefire';

  import 'firebase/firestore';
  import 'firebase/analytics';

  const firebaseConfig = {
    apiKey: 'AIzaSyDjujlxZckKpcV7KWQ8T6ZVR2NSy0H9Rkc',
    authDomain: 'notes-1ee4e.firebaseapp.com',
    databaseURL: 'https://notes-1ee4e.firebaseio.com',
    projectId: 'notes-1ee4e',
    storageBucket: 'notes-1ee4e.appspot.com',
    messagingSenderId: '98144469693',
    appId: '1:98144469693:web:877a21c36438bac27c2dd4',
    measurementId: 'G-4B90G96NZN',
  };

  firebase.initializeApp(firebaseConfig);
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

<svelte:head>
  <title>Notes</title>
</svelte:head>

<FirebaseApp {firebase}>
  <Header />

  <div id="container">
    <CategoryBar userID={'UR2rQONWehG0QytSsAy4'} />
    <NotesBar />
    <div id="content-box">
      <div id="content">
        <Editor />
      </div>
    </div>
  </div>
</FirebaseApp>
