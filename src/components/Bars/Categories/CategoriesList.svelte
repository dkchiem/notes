<script>
  import Category from '@components/Bars/Categories/CategoryItem.svelte';

  let expanded = false,
    name,
    files;

  let root = [
    {
      type: 'folder',
      name: 'Important work stuff',
      categories: [{ type: 'file', name: 'quarterly-results.xlsx' }],
    },
    {
      type: 'folder',
      name: 'Animal GIFs',
      categories: [
        {
          type: 'folder',
          name: 'Dogs',
          categories: [
            { type: 'file', name: 'treadmill.gif' },
            { type: 'file', name: 'rope-jumping.gif' },
          ],
        },
        {
          type: 'folder',
          name: 'Goats',
          categories: [
            { type: 'file', name: 'parkour.gif' },
            { type: 'file', name: 'rampage.gif' },
          ],
        },
        { type: 'file', name: 'cat-roomba.gif' },
        { type: 'file', name: 'duck-shuffle.gif' },
        { type: 'file', name: 'monkey-on-a-pig.gif' },
      ],
    },
    { type: 'file', name: 'TODO.md' },
  ];
</script>

<style>

</style>

<Category name="Home" categories={root} />
