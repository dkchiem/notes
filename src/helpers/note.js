import { writable } from 'svelte/store';
import firebase from 'firebase/app';

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
            dataArray.push(doc.data());
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
        console.log('Error getting documents: ', error);
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
        console.log('Error getting documents: ', error);
        reject();
      });
  });
}
