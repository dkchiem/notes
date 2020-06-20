<script>
  import { onMount } from 'svelte';
  import tippy from 'tippy.js';
  import '@styles/tippy.scss';

  export let icon,
    viewBox,
    path,
    options = false,
    trigger = 'mouseenter click';

  let item, popover;

  onMount(() => {
    if (options) {
      tippy(item, {
        content: popover.innerHTML,
        allowHTML: true,
        arrow: false,
        trigger: trigger,
        interactive: true,
        onTrigger(instance, event) {
          console.log(instance);
          console.log(event);
        },
      });
    }
  });
</script>

<style lang="scss">
  @import 'src/styles/_colors.scss';

  #item {
    align-items: center;
    background-color: $color-gray;
    border-radius: 50%;
    color: white;
    display: flex;
    height: 40px;
    justify-content: center;
    margin: 0 5px;
    width: 40px;
    transition: 0.2s ease;
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
    .icon {
      height: 50%;
    }
  }

  #popover {
    display: none;
    * {
      background-color: red;
    }
  }
</style>

<div id="item" bind:this={item}>
  <svg
    height="20px"
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon={icon}
    class="icon"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    {viewBox}>
    <path fill="currentColor" d={path} />
  </svg>
</div>

<div id="popover" bind:this={popover}>
  <slot />
</div>
