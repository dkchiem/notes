<script>
  import { Router } from 'svelte-router-spa';
  import { routes } from './routes';
  import firebase from 'firebase/app';
  import 'firebase/performance';

  import 'firebase/auth';
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
  firebase.analytics();
  const perf = firebase.performance();
</script>

<svelte:head>
  <title>Notes</title>
</svelte:head>

<Router {routes} />
