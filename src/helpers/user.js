import { writable } from 'svelte/store';
import firebase from 'firebase/app';
import { navigateTo } from 'svelte-router-spa';
import log from '@helpers/log.js';

export const userID = writable('');

export function getUid() {
  let uid;
  userID.subscribe((u) => {
    uid = u;
  });
  return uid;
}

// export function isLoggedIn() {
//   // if (firebase.auth().currentUser != null) {
//   //   console.log('User');
//   //   return true;
//   // } else {
//   //   console.log(firebase.auth().currentUser);
//   //   return false;
//   // }
//   const getLoginState = new Promise((resolve, reject) => {
//     firebase.auth().onAuthStateChanged(function (user) {
//       if (user == null) {
//         resolve(false);
//       } else {
//         resolve(true);
//       }
//     });
//   }).then((loggedIn) => {
//     console.log('logged in: ' + loggedIn);
//     return loggedIn;
//   });
// }

// export function isNotLoggedIn() {
//   const getNotLoginState = new Promise((resolve, reject) => {
//     firebase.auth().onAuthStateChanged(function (user) {
//       console.log(user);
//       if (user == null) {
//         resolve(true);
//       } else {
//         resolve(false);
//       }
//     });
//   }).then((notLoggedIn) => {
//     console.log('not logged in: ' + notLoggedIn);
//     return notLoggedIn;
//   });
// }

export function logout() {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigateTo('/login');
      })
      .catch((error) => {
        console.log(error);
        reject(errorMessage);
      });
  });
}

// export function signInUser(email, password) {
//   return firebase.auth().signInWithEmailAndPassword(email, password);
//   // .then(() => {

//   // })
//   // .catch(function (error) {
//   //   var errorCode = error.code;
//   //   var errorMessage = error.message;
//   //   showSpinner = false;
//   //   console.log(`Error ${errorCode}: ${errorMessage}`);
//   //   errorMsg = errorMessage;
//   // });
// }

// export function createUser(email, password) {
//   return new Promise((resolve, reject) => {
//     firebase
//       .auth()
//       .createUserWithEmailAndPassword(email, password)
//       .then(() => {
//         resolve();
//       })
//       .catch((error) => {
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         console.log(`Error ${errorCode}: ${errorMessage}`);
//         reject(new Error(errorMessage));
//       });
//   });
// }
