<script>
  import Item from '@components/Header/Item.svelte';
  import itemBarItems from '@config/itemBarItems.js';
</script>

<style lang="scss">
  #item-bar {
    display: flex;
    height: 40px;
  }
</style>

<div id="item-bar">
  {#each itemBarItems as item}
    <Item {...item} />
  {/each}
</div>
