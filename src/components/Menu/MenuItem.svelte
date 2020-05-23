<script>

</script>

<style lang="scss">
  @import 'src/styles/_colors.scss';

  #item {
    cursor: pointer;
  }
</style>

<div
  id="item"
  on:click={() => {
    console.log('Test');
  }}>
  <slot />
</div>
