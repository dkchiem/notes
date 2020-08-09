import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// import * as rp from 'request-promise';
admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

exports.createProfile = functions.auth.user().onCreate((user) => {
  const userObject = {
    email: user.email,
  };
  const categoryObject = {
    name: 'Example category',
    parent: '',
  };
  const noteObject = {
    name: 'Example note',
  };
  return admin
    .firestore()
    .collection('users')
    .doc(user.uid)
    .set(userObject)
    .then(() => {
      return admin
        .firestore()
        .collection('users')
        .doc(user.uid)
        .collection('categories')
        .add(categoryObject)
        .then((document) => {
          return admin
            .firestore()
            .collection('users')
            .doc(user.uid)
            .collection('categories')
            .doc(document.id)
            .collection('notes')
            .add(noteObject);
        });
    });
});

exports.deleteProfile = functions.auth.user().onDelete((user) => {
  return admin.firestore().collection('users').doc(user.uid).delete();
});

// exports.checkRecaptcha = functions.https.onRequest((req, res) => {
//   const response = req.query.response;
//   console.log('recaptcha response', response);
//   rp({
//     uri: 'https://recaptcha.google.com/recaptcha/api/siteverify',
//     method: 'POST',
//     formData: {
//       secret: '6LeLUKcZAAAAAMhUrzLf411yevC3WyYXoW4zXi1v',
//       response: response,
//     },
//     json: true,
//   })
//     .then((result) => {
//       console.log('recaptcha result', result);
//       if (result.success) {
//         res.send("You're good to go, human.");
//       } else {
//         res.send('Recaptcha verification failed. Are you a robot?');
//       }
//     })
//     .catch((reason) => {
//       console.log('Recaptcha request failure', reason);
//       res.send('Recaptcha request failed.');
//     });
// });
