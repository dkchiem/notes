import { writable } from 'svelte/store';
import firebase from 'firebase/app';

export const categorySelected = writable({});

export const categoriesStore = writable([]);

let categoriesArray;

export function getCategories(userID) {
  return new Promise((resolve, reject) => {
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

export function addCategory() {
  categoriesArray.push({
    name: 'New Category',
    id: '',
    parent: '',
  });
  categoriesStore.set(convertCategories(categoriesArray));
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
      map[obj.id].parent = obj.parent;
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
        categoriesArray.forEach((obj, index) => {
          if (obj.id === categoryInitial) {
            obj.parent = categoryDest;
          } else if (obj.id === categoryDest) {
            obj.expanded = true;
          }
          if (index === categoriesArray.length - 1) {
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
