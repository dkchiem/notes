<script>
  import Item from '@components/CategoryBar/CategoryItem.svelte';

  export let userID;

  import { Doc, Collection, collectionStore } from 'sveltefire';

  //   const data = collectionStore('users', (ref) => ref.orderBy('time'));

  //   data.subscribe((v) => doStuff(v));

  //   const db = getContext('firebase').firestore();

  //   function depth(id) {
  //     return db
  //       .collection('users/UR2rQONWehG0QytSsAy4/notes')
  //       .where('parent', '>=', 'A')
  //       .where('parent', '<=', `A~`);
  //   }

  //   console.log(depth());
</script>

<ul>

  <Doc path={`users/${userID}`} log let:data={user} let:ref>
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
  </Doc>
</ul>
