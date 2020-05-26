<script>
  import Item from '@components/Bars/Categories/CategoryItem.svelte';

  // import { Doc, Collection, collectionStore } from 'sveltefire';
  import firebase from 'firebase/app';

  export let userID;

  const db = firebase.firestore();

  let component;
  let props;

  let categories = [];

  const item = (categoryName, childNumber) => {
    component = Item;
    props = { categoryName: categoryName, childNumber: childNumber };
  };

  let categoriesObj = {};
  let treeDepth = 0;

  main();

  async function main() {
    await getCategories();
    console.log(JSON.stringify(categoriesObj));
    //console.log('Array length :' + len(categoriesArray));
    // for (var i = 0; i < categoriesArray.length; i++) {
    //   console.log('hey');
    //   const parent = categoriesArray[i]['parent'];
    //   console.log(parent);
    //   if (parent != false) {
    //     treeDepth = parent.match(/.{1,3}/g).length;
    //   }
    // }
    // console.log(treeDepth);
  }

  function getCategories() {
    db.collection('users')
      .doc(userID)
      .collection('notes')
      .get()
      .then((querySnapshot) => {
        return new Promise((resolve, reject) => {
          querySnapshot.forEach((doc, index) => {
            categoriesObj[doc.id] = {
              name: doc.data().name,
              parent: doc.data().parent,
            };
            Object.assign(categoriesObj, { key: 'value3' });
            // categoriesArray.push({
            //   name: doc.data().name,
            //   id: doc.id,
            //   parent: doc.data().parent,
            //   categories: [],
            // });
            if (index === querySnapshot.length - 1) resolve();
          });
        });
      })
      .catch(function(error) {
        console.log('Error getting documents: ', error);
      });
  }

  function len(arr) {
    var count = 0;
    for (var k in arr) {
      if (arr.hasOwnProperty(k)) {
        count++;
      }
    }
    return count;
  }

  // function getCategories() {
  //   let categoriesArray = [];
  //   db.collection('users')
  //     .doc(userID)
  //     .collection('notes')
  //     .where('parent', '==', false)
  //     .get()
  //     .then(function(querySnapshot) {
  //       querySnapshot.forEach((doc) => {
  //         const id = doc.id;
  //         console.log(id, ' => ', doc.data());
  //         const index =
  //           categoriesArray.push({ name: doc.name, id: id, categories: [] }) -
  //           1;
  //         db.collection('users')
  //           .doc(userID)
  //           .collection('notes')
  //           .where('parent', '>=', doc.id)
  //           .where('parent', '<=', `${doc.id}~`)
  //           .get()
  //           .then(function(querySnapshot) {
  //             querySnapshot.forEach((doc) => {
  //               console.log(doc.id, ' => ', doc.data());
  //               const parents = doc.data().parent.match(/.{1,20}/g);
  //               categoriesArray[index].categories.push({
  //                 name: doc.name,
  //                 id: id,
  //                 categories: [],
  //               });
  //               console.log(parents);
  //               console.log(categoriesArray);
  //               return categoriesArray;
  //             });
  //           })
  //           .catch(function(error) {
  //             console.log('Error getting documents: ', error);
  //           });
  //       });
  //     })
  //     .catch(function(error) {
  //       console.log('Error getting documents: ', error);
  //     });
  // }

  // const categoriesList = getCategories('Xzvxs7gPpovAg0PX4uOy');

  // async function getCategories(id) {
  //   const data = await db
  //     .collection('users')
  //     .doc(userID)
  //     .collection('notes')
  //     .where('parent', '==', false)
  //     .get();
  //   let categories = data.docs.map((doc) => doc.data());
  //   return categories;
  // }

  //console.log();

  //console.log(getData('Xzvxs7gPpovAg0PX4uOy'));

  //const categories = getData('Xzvxs7gPpovAg0PX4uOy');

  //   const data = collectionStore('users', (ref) => ref.orderBy('time'));

  //   data.subscribe((v) => doStuff(v));

  //   const db = getContext('firebase').firestore();

  //   function depth(id) {
  //     return db
  //       .collection('users/UR2rQONWehG0QytSsAy4/notes')
  //       .where('parent', '>=', 'A')
  //       .where('parent', '<=', `A~`);
  //   }

  // console.log(categories.docs.map((doc) => doc.data()));
</script>

<style lang="scss">
  ul {
    list-style: none;
  }
</style>

<ul>
  <!-- <Item categoryName="Hey" childNumber="1">
    <Item categoryName="Test" childNumber="2">i</Item>
  </Item> -->
  <!-- <svelte:component this={component} {...props} /> -->

  <!-- <Item categoryName="Test" childNumber="3">i</Item> -->
  <!-- {#await categoriesList then categoriesList}
    {#each categoriesList as category}
      <Item categoryName={category.id} childNumber="1">i</Item>
    {/each}
  {/await} -->

  <!-- <Doc path={`users/${userID}`} log let:data={user} let:ref>
    <Collection
      path={ref.collection('notes')}
      query={(ref) => ref.where('parent', '==', false)}
      let:data={topCategories}>

      {#each topCategories as topCategory}
        <Item categoryName={topCategory.id} childNumber="0">
          <Collection
            path={ref.collection('notes').orderBy('parent')}
            query={(ref) => ref
                .where('parent', '>=', topCategory.id)
                .where('parent', '<=', `${topCategory.id}~`)}
            let:data={categories}>

            {#each categories as category}
              <Item categoryName={category.id} childNumber="1">i</Item>
            {/each}

          </Collection>
        </Item>
      {/each}
    </Collection>
  </Doc> -->

</ul>
