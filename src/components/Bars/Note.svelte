<script>
  import { fly } from 'svelte/transition';

  export let name, callback;

  const noteToggled = () => {
    callback(name);
  };
</script>

<style lang="scss">
  @import 'src/styles/_colors.scss';
  @import 'src/styles/_variables.scss';

  .item {
    align-items: center;
    background-color: white;
    border-radius: 10px;
    color: $theme-gray;
    cursor: pointer;
    display: flex;
    margin-bottom: 5px;
    padding: 10px 20px;
    transition: 0.3s ease;
    width: 100%;
    svg {
      height: 1.2rem;
      margin-right: 10px;
    }
    &:hover {
      transform: translateX(-5px);
      font-weight: bold;
      background-color: $theme-light-gray;
    }
  }
</style>

<div
  class="item"
  on:click
  transition:fly={{ y: 20, duration: 500 }}
  on:click={noteToggled}>
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="sticky-note"
    class="svg-inline--fa fa-sticky-note fa-w-14"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512">
    <path
      fill="currentColor"
      d="M312 320h136V56c0-13.3-10.7-24-24-24H24C10.7 32 0 42.7 0 56v400c0 13.3
      10.7 24 24 24h264V344c0-13.2 10.8-24 24-24zm129 55l-98 98c-4.5 4.5-10.6
      7-17 7h-6V352h128v6.1c0 6.3-2.5 12.4-7 16.9z" />
  </svg>
  <span>{name}</span>
</div>
