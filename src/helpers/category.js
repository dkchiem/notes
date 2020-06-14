import { writable } from 'svelte/store';
import firebase from 'firebase/app';

export const category = writable([]);

// Drag & drop
export const destinationCategory = writable('');
export const initalCategory = writable('');

export function changeParent(userID) {
  return new Promise((resolve, reject) => {
    let categoryInitial, categoryDest;
    initalCategory.subscribe((c) => {
      categoryInitial = c;
    });
    destinationCategory.subscribe((c) => {
      categoryDest = c;
    });

    const db = firebase.firestore();
    db.collection('users')
      .doc(userID)
      .collection('categories')
      .doc(categoryInitial)
      .update({
        parent: categoryDest,
      })
      .then(() => {
        resolve('Updated successfully');
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
        reject();
      });
  });
}
