import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as rp from 'request-promise';
admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

exports.createProfile = functions.auth.user().onCreate((user) => {
  const userObject = {
    email: user.email,
  };

  return admin.firestore().doc(`users/${user.uid}`).set(userObject);
});

exports.checkRecaptcha = functions.https.onRequest((req, res) => {
  const response = req.query.response;
  console.log('recaptcha response', response);
  rp({
    uri: 'https://recaptcha.google.com/recaptcha/api/siteverify',
    method: 'POST',
    formData: {
      secret: '6LeLUKcZAAAAAMhUrzLf411yevC3WyYXoW4zXi1v',
      response: response,
    },
    json: true,
  })
    .then((result) => {
      console.log('recaptcha result', result);
      if (result.success) {
        res.send("You're good to go, human.");
      } else {
        res.send('Recaptcha verification failed. Are you a robot?');
      }
    })
    .catch((reason) => {
      console.log('Recaptcha request failure', reason);
      res.send('Recaptcha request failed.');
    });
});
