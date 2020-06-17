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

export function logout() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      console.log('Hello');
      navigateTo('/login');
    })
    .catch(function (error) {
      console.log(error);
    });
}
