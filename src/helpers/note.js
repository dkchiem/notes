import { writable } from 'svelte/store';
import firebase from 'firebase/app';
import log from '@helpers/log.js';

// Notes store
export const notesStore = writable([]);

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
              notesStore.set(dataArray);
              resolve(dataArray);
            }
          });
        } else {
          resolve([]);
        }
      })
      .catch((error) => {
        log.error(error);
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
        log.error(error);
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
        log.error(error);
        reject();
      });
  });
}

// Drag & drop

export const draggedNote = writable({});

export function changeNoteParent(userID, destination) {
  return new Promise((resolve, reject) => {
    log.dev('firebase: changing note parent');
    let origin;
    draggedNote.subscribe((c) => {
      origin = c;
    });

    const db = firebase.firestore();
    moveFbRecord(
      db
        .collection('users')
        .doc(userID)
        .collection('categories')
        .doc(origin.parentCategoryID)
        .collection('notes')
        .doc(origin.noteID),
      db
        .collection('users')
        .doc(userID)
        .collection('categories')
        .doc(destination)
        .collection('notes')
        .doc(origin.noteID),
    )
      .then(() => {
        let notesArray;
        notesStore.subscribe((n) => {
          notesArray = n;
        });
        notesArray.forEach((obj, index) => {
          if (obj.id === origin.noteID) {
            notesArray.splice(index, 1);
            notesStore.set(notesArray);
            resolve('Updated successfully');
          }
        });
      })
      .catch((error) => {
        log.error(error);
        reject();
      });
  });
}

function moveFbRecord(oldRef, newRef) {
  return new Promise(async (resolve, reject) => {
    oldRef.get().then(function (doc) {
      newRef
        .set(doc.data())
        .then(() => {
          oldRef.delete();
          resolve('Moved successfully');
        })
        .catch((error) => {
          log.error(error);
          reject();
        });
    });
  });
}

// Delete
export function deleteNote(userID, categoryID, noteID) {
  return new Promise((resolve, reject) => {
    const db = firebase.firestore();
    db.collection('users')
      .doc(userID)
      .collection('categories')
      .doc(categoryID)
      .collection('notes')
      .doc(noteID)
      .delete()
      .then(() => {
        let notesArray;
        notesStore.subscribe((n) => {
          notesArray = n;
        });
        notesArray.forEach((obj, index) => {
          if (obj.id === noteID) {
            notesArray.splice(index, 1);
            notesStore.set(notesArray);
            resolve('Deleted successfully');
          }
        });
      })
      .catch((error) => {
        log.error(error);
        reject();
      });
  });
}
