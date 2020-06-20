import { writable } from 'svelte/store';
import firebase from 'firebase/app';
import { navigateTo } from 'svelte-router-spa';

export const userID = writable('');

export function getUid() {
  let uid;
  userID.subscribe((u) => {
    uid = u;
  });
  return uid;
}

export function isLoggedIn() {
  let isLoggedIn;
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      isLoggedIn = true;
    } else {
      isLoggedIn = false;
    }
  });
  return isLoggedIn;
}

export function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      navigateTo('/login');
    })
    .catch((error) => {
      console.log(error);
    });
}
