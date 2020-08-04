<script>
  import Router, { replace, location } from 'svelte-spa-router';
  import { routes } from './routes';
  import firebase from 'firebase/app';
  import 'firebase/performance';
  import 'firebase/auth';
  import 'firebase/firestore';
  import 'firebase/analytics';
  import { isLoggedIn } from '@helpers/user.js';
  import log from '@helpers/log.js';

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

  let loggedIn;

  firebase.auth().onAuthStateChanged(function (user) {
    if (user === null) {
      loggedIn = false;
      log.dev('User disconnected');
      replace('/login');
    } else {
      loggedIn = true;
      log.dev('User connected');
      replace('/');
    }
  });

  function routeLoaded() {
    if (loggedIn === false) {
      if ($location === '/') {
        replace('/login');
      }
    } else if (loggedIn === true) {
      if ($location === '/login' || $location === '/signup') {
        replace('/');
      }
    } else {
      console.error('routeLoaded Error');
    }
  }
</script>

<svelte:head>
  <title>Notes</title>
</svelte:head>

{#await isLoggedIn()}
  loading...
{:then value}
  <Router {routes} on:routeLoaded={routeLoaded} />
{:catch error}
  Error
{/await}
