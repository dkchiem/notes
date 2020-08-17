import { writable } from 'svelte/store';
import firebase from 'firebase/app';
import log from '@helpers/log.js';

// Current selected category
export const categorySelected = writable({});

// Categories object tree
export const categoriesStore = writable([]);

// Categories array flat tree
let categoriesArray;

// Create categories tree
function makeCategoriesObject(array) {
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

// Get
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
            categoriesStore.set(makeCategoriesObject(dataArray));
            resolve();
          }
        });
      })
      .catch((error) => {
        log.error(error);
        reject();
      });
  });
}

// Add
export function addCategory(userID, name) {
  return new Promise((resolve, reject) => {
    const db = firebase.firestore();

    db.collection('users')
      .doc(userID)
      .collection('categories')
      .add({
        name: name === '' ? '' : 'Untitled',
        parent: '',
      })
      .then((docRef) => {
        categoriesArray.push({
          name: name,
          id: docRef.id,
          parent: '',
        });
        console.log(categoriesArray);
        categoriesStore.set(makeCategoriesObject(categoriesArray));
        log.dev('Add category - data');
        resolve();
      })
      .catch((error) => {
        log.error(error);
        reject();
      });
  });
}

// Rename
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
            categoriesStore.set(makeCategoriesObject(categoriesArray));
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

// Drag & drop

export const draggedItemIsCategory = writable(true);

export function getDraggedItemIsCategory() {
  let isCategory;
  draggedItemIsCategory.subscribe((ic) => {
    isCategory = ic;
  });
  return isCategory;
}

export const draggedCategory = writable('');

export function changeCategoryParent(userID, destination) {
  return new Promise((resolve, reject) => {
    log.dev('firebase: changing category parent');
    let origin;
    draggedCategory.subscribe((c) => {
      origin = c;
    });

    const db = firebase.firestore();
    db.collection('users')
      .doc(userID)
      .collection('categories')
      .doc(origin)
      .update({
        parent: destination,
      })
      .then(() => {
        categoriesArray.forEach((obj) => {
          if (obj.id === origin) {
            obj.parent = destination;
            categoriesStore.set(makeCategoriesObject(categoriesArray));
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
