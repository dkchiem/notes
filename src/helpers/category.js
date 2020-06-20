import { writable } from 'svelte/store';
import firebase from 'firebase/app';
import log from '@helpers/log.js';

export const categorySelected = writable({});

export const categoriesStore = writable([]);

let categoriesArray;

export function getCategories(userID) {
  return new Promise((resolve, reject) => {
    log.dev('firebase: getting categories');
    const db = firebase.firestore();
    let dataArray = [];
    let index = -1;
    db.collection('users')
      .doc(userID)
      .collection('categories')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          dataArray.push({
            name: doc.data().name,
            id: doc.id,
            parent: doc.data().parent,
          });
          index++;
          if (index === querySnapshot.size - 1) {
            categoriesArray = dataArray;
            categoriesStore.set(convertCategories(dataArray));
            resolve();
          }
        });
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
        reject();
      });
  });
}

function convertCategories(array) {
  var map = {};
  for (var i = 0; i < array.length; i++) {
    var obj = array[i];

    if (!(obj.id in map)) {
      map[obj.id] = obj;
      map[obj.id].categories = [];
    }

    if (typeof map[obj.id].name == 'undefined') {
      map[obj.id].id = obj.id;
      map[obj.id].name = obj.name;
    }

    var parent = obj.parent || '-';
    if (!(parent in map)) {
      map[parent] = {};
      map[parent].categories = [];
    }

    map[parent].categories.push(map[obj.id]);
  }

  return map['-'].categories;
}

export function addCategory(userID, name) {
  return new Promise((resolve, reject) => {
    const db = firebase.firestore();

    db.collection('users')
      .doc(userID)
      .collection('categories')
      .add({
        name: name || 'Untitled',
        parent: '',
      })
      .then((docRef) => {
        categoriesArray.push({
          name: name,
          id: docRef.id,
          parent: '',
        });
        console.log(categoriesArray);
        //categoriesArray = categoriesArray;
        categoriesStore.set(convertCategories(categoriesArray));
        log.dev('Add category - data');
        resolve();
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
        reject();
      });
  });
}

export function renameCategory(userID, categoryID, name) {
  return new Promise((resolve, reject) => {
    const db = firebase.firestore();
    db.collection('users')
      .doc(userID)
      .collection('categories')
      .doc(categoryID)
      .update({
        name: name,
      })
      .then(() => {
        categoriesArray.forEach((obj) => {
          if (obj.id === categoryID) {
            obj.name = name;
            categoriesStore.set(convertCategories(categoriesArray));
            resolve('Updated successfully');
          }
        });
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
        reject();
      });
  });
}

// Drag & drop
export const destinationCategory = writable('');
export const initalCategory = writable('');

export function changeParent(userID) {
  return new Promise((resolve, reject) => {
    log.dev('firebase: changing category parent');
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
        categoriesArray.forEach((obj) => {
          if (obj.id === categoryInitial) {
            obj.parent = categoryDest;
            categoriesStore.set(convertCategories(categoriesArray));
            resolve('Updated successfully');
          }
        });
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
        reject();
      });
  });
}
