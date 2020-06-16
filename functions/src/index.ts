import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

exports.createProfile = functions.auth.user().onCreate((user) => {
  const userObject = {
    email: user.email,
  };

  return admin.firestore().doc(`users/${user.uid}`).set(userObject);
});
