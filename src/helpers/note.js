import firebase from 'firebase/app';
import log from '@helpers/log.js';

// Get
export function getNotes(userID, categoryID) {
  return new Promise((resolve, reject) => {
    const db = firebase.firestore();
    let dataArray = [];
    let index = -1;
    db.collection('users')
      .doc(userID)
      .collection('categories')
      .doc(categoryID)
      .collection('notes')
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          querySnapshot.forEach((doc) => {
            dataArray.push({
              name: doc.data().name,
              id: doc.id,
              markdown: doc.data().markdown,
            });
            index++;
            if (index === querySnapshot.size - 1) {
              resolve(dataArray);
            }
          });
        } else {
          resolve([]);
        }
      })
      .catch((error) => {
        log.error('Error getting documents: ', error);
        reject();
      });
  });
}

// Add
export function addNote(userID, categoryID, name) {
  return new Promise((resolve, reject) => {
    const db = firebase.firestore();
    let dataArray = [];
    db.collection('users')
      .doc(userID)
      .collection('categories')
      .doc(categoryID)
      .collection('notes')
      .add({
        name: name === '' ? '' : 'Untitled',
        markdown: '',
      })
      .then((docRef) => {
        dataArray.push({
          name: name,
          id: docRef.id,
          parent: '',
        });
        log.dev('Add category - data');
        resolve(dataArray);
      })
      .catch((error) => {
        log.error('Error getting documents: ', error);
        reject();
      });
  });
}

export function saveNote(userID, categoryID, noteID, name, markdown) {
  return new Promise((resolve, reject) => {
    const db = firebase.firestore();
    db.collection('users')
      .doc(userID)
      .collection('categories')
      .doc(categoryID)
      .collection('notes')
      .doc(noteID)
      .set({
        name: name,
        markdown: markdown,
      })
      .then(() => {
        resolve('Saved successfully');
      })
      .catch((error) => {
        log.error('Error getting documents: ', error);
        reject();
      });
  });
}
