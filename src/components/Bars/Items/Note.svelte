<script>
  import Item from '@components/Bars/Item.svelte';
  import { addNote, draggedNote } from '@helpers/note.js';
  import { getUid } from '@helpers/user.js';
  import { createEventDispatcher } from 'svelte';
  import { draggedItemIsCategory } from '@helpers/category.js';

  const dispatch = createEventDispatcher();

  export let name,
    id,
    markdown,
    renaming = false,
    newNote = false,
    parentCategoryID;

  function renameSave() {
    addNote(getUid(), parentCategoryID, name);
  }

  function noteToggled() {
    dispatch('noteToggled', {
      name: name,
      id: id,
      markdown: markdown,
    });
  }

  async function noteDragged() {
    draggedItemIsCategory.set(false);
    draggedNote.set({ parentCategoryID, noteID: id });
  }
</script>

<Item
  {name}
  {renaming}
  newItem={newNote}
  path="M312 320h136V56c0-13.3-10.7-24-24-24H24C10.7 32 0 42.7 0 56v400c0 13.3
  10.7 24 24 24h264V344c0-13.2 10.8-24 24-24zm129 55l-98 98c-4.5 4.5-10.6 7-17
  7h-6V352h128v6.1c0 6.3-2.5 12.4-7 16.9z"
  viewBox="0 0 448 512"
  on:renameSave={renameSave}
  on:selectItem={noteToggled}
  on:dragItem={noteDragged} />
