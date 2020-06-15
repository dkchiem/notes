import SignUp from '@views/signup.svelte';
import Login from '@views/login.svelte';
import Index from '@views/index.svelte';

import firebase from 'firebase/app';

function userIsLoggedIn() {
  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      return true;
    } else {
      return false;
    }
  });
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
  },
  {
    name: '/signup',
    component: SignUp,
  },
];

// onlyIf: {
//   guard: () => {
//     return userIsLoggedIn ? false : true;
//   },
//   redirect: '/',
// },

export { routes };
