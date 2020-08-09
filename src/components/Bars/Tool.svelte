<script>
  import { createEventDispatcher } from 'svelte';

  export let name, path, viewBox, color;

  const dispatch = createEventDispatcher();

  function toggleName(e) {
    const toolWidth = this.scrollWidth;
    const elementTransition = this.style.transition;
    this.style.transition = '';
    requestAnimationFrame(() => {
      this.style.width = '0';

      requestAnimationFrame(() => {
        this.style.width = toolWidth + 'px';
        this.style.transition = elementTransition;
      });
    });
  }

  function untoggleName(e) {
    const toolWidth = this.scrollWidth;
    const elementTransition = this.style.transition;
    this.style.transition = '';
    requestAnimationFrame(() => {
      this.style.width = toolWidth + 'px';
      this.style.transition = elementTransition;

      requestAnimationFrame(() => {
        this.style.width = '1.4rem';
      });
    });
  }

  function toolToggled() {
    dispatch('toggle');
  }
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';

  $color: var(--color);

  #tool {
    height: 1.4rem;
    border-radius: 0.7rem;
    background-color: white;
    color: $color;
    min-width: 1.4rem;
    width: 1.4rem;
    display: flex;
    transition: width 0.3s ease;
    align-items: center;
    overflow: hidden;
    margin: 0 3px;
    cursor: pointer;
    #icon-container {
      height: 1.4rem;
      min-width: 1.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        height: 0.8rem;
        color: $color;
      }
    }
    #name {
      vertical-align: middle;
      font-size: 0.9rem;
      padding-right: 0.5rem;
    }
  }
</style>

<div
  id="tool"
  on:mouseenter={toggleName}
  on:mouseleave={untoggleName}
  on:click={toolToggled}
  style="--color: {color};">
  <div id="icon-container">
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      {viewBox}>
      <path fill="currentColor" d={path} />
    </svg>
  </div>
  <span id="name">{name}</span>
</div>
