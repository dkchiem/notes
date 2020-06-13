import firebase from 'firebase/app';

function getCategories(userID) {
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
            const categories = convertCategories(dataArray);
            resolve(categories);
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

function getNotes(userID, categoryID) {
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
          console.log('No notes found!');
          resolve([]);
        }
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
        reject();
      });
  });
}

function saveNote(userID, categoryID, noteID, name, markdown) {
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

export { getCategories, getNotes, saveNote };
