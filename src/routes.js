import SignUp from '@views/signup.svelte';
import Login from '@views/login.svelte';
import Index from '@views/index.svelte';

import firebase from 'firebase/app';

function userIsLoggedIn() {
  const user = firebase.auth().currentUser;
  return user ? true : false;
}

const routes = [
  {
    name: '/',
    component: Index,
    onlyIf: { guard: userIsLoggedIn, redirect: '/login' },
  },
  {
    name: '/login',
    component: Login,
    onlyIf: { guard: !userIsLoggedIn, redirect: '/' },
  },
  {
    name: '/signup',
    component: SignUp,
    onlyIf: { guard: !userIsLoggedIn, redirect: '/' },
  },
];

export { routes };
