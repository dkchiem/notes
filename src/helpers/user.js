import { writable } from 'svelte/store';
import firebase from 'firebase/app';
import log from '@helpers/log.js';

export const userID = writable('');

export function getUid() {
  let uid;
  userID.subscribe((u) => {
    uid = u;
  });
  return uid;
}

export function isLoggedIn() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user == null) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

export function logout() {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // navigateTo('/login');
      })
      .catch((error) => {
        log.error(error);
        reject(errorMessage);
      });
  });
}

export function signUp(email, password, callback) {
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          callback();
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          log.error(`Error ${errorCode}: ${errorMessage}`);
          callback(errorMessage);
        });
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      log.error(`Error ${errorCode}: ${errorMessage}`);
      callback(errorMessage);
    });
}

export function login(email, password, staySignedIn, callback) {
  if (staySignedIn) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        callback();
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        log.error(`Error ${errorCode}: ${errorMessage}`);
        callback(errorMessage);
      });
  } else {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        return firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            callback();
          })
          .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            log.error(`Error ${errorCode}: ${errorMessage}`);
            callback(errorMessage);
          });
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        log.error(`Error ${errorCode}: ${errorMessage}`);
        callback(errorMessage);
      });
  }
}
