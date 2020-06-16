<script>
  import Popper from '@popperjs/svelte';
  import { onMount } from 'svelte';

  export let show = false;
  //   let referenceElement;
  //   let popperElement;
  //   let arrowElement;
  //   let styles = {};
  //   let attributes = {};
  //   let css;

  //   onMount(() => {
  //     css = (obj) =>
  //       Object.entries(obj || {})
  //         .map((x) => x.join(':'))
  //         .join(';');

  //     console.log(styles);
  //   });

  //   $: options = {
  //     modifiers: [
  //       { name: 'offset', options: { offset: [0, 5] } },
  //       { name: 'arrow', options: { element: arrowElement } },
  //     ],
  //   };

  const css = (obj) =>
    Object.entries(obj || {})
      .map((x) => x.join(':'))
      .join(';');
  let referenceElement;
  let popperElement;
  let arrowElement;
  $: options = {
    modifiers: [
      { name: 'offset', options: { offset: [0, 5] } },
      { name: 'arrow', options: { element: arrowElement } },
    ],
  };
  let styles = {};
  let attributes = {};
  console.log(styles);

  function togglePopopver() {
    show = !show;
  }
</script>

<style lang="scss">
  .tooltip {
    background: #333;
    color: white;
    font-weight: bold;
    padding: 4px 8px;
    font-size: 13px;
    border-radius: 4px;
    display: none;
    &.show {
      display: block;
    }
  }
  //   .arrow,
  //   .arrow::before {
  //     position: absolute;
  //     width: 8px;
  //     height: 8px;
  //     z-index: -1;
  //   }
  //   .arrow::before {
  //     content: '';
  //     transform: rotate(45deg);
  //     background: #333;
  //   }
  .tooltip[data-popper-placement^='top'] > .arrow {
    bottom: -4px;
  }
  .tooltip[data-popper-placement^='bottom'] > .arrow {
    top: -4px;
  }
  .tooltip[data-popper-placement^='left'] > .arrow {
    right: -4px;
  }
  .tooltip[data-popper-placement^='right'] > .arrow {
    left: -4px;
  }
</style>

<Popper
  reference={referenceElement}
  popper={popperElement}
  {options}
  bind:styles
  bind:attributes>
  <div
    bind:this={referenceElement}
    on:mouseenter={togglePopopver}
    on:mouseleave={togglePopopver}>
    <slot />
  </div>

  <div
    bind:this={popperElement}
    class="tooltip"
    style={css(styles.popper)}
    {...attributes.popper}
    class:show>
    <slot name="options" />
    <!-- <div bind:this={arrowElement} class="arrow" style={css(styles.arrow)} /> -->
  </div>
</Popper>
