<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let disabled;

  function click() {
    if (!disabled) {
      dispatch('btnClicked');
    }
  }
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';
  .button {
    padding: 5px 20px;
    border-radius: 10px;
    background-color: $color-green;
    color: white;
    font-size: 1.2em;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      background-color: darken($color-green, 10%);
    }
    &.disabled {
      cursor: default;
      background-color: lighten($color-green, 15%);
    }
  }
</style>

<div class="button" on:click={click} class:disabled>Save</div>
