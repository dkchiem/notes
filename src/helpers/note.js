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
