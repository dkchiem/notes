<script>
  import CategoriesList from '@components/CategoryBar/CategoriesList.svelte';

  export let userID;

  let isClosed;

  function menuToggled() {
    isClosed = !isClosed;
  }
</script>

<style lang="scss">
  @import '../../styles/_theme.scss';

  $bar-header-height: 50px;
  $bar-color: $theme-green;

  @keyframes barAnimateOut {
    25% {
      width: calc(20% + 10px);
    }
    100% {
      width: 15px;
    }
  }

  @keyframes barAnimateIn {
    0% {
      width: 15px;
    }
    75% {
      width: calc(20% + 10px);
    }
    100% {
      width: 20%;
    }
  }

  #categoryBar {
    background-color: $bar-color;
    width: 20%;
    height: 100vh;
    padding-top: 70px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    z-index: 500;
    position: relative;
    animation-delay: 0.1s;
    animation-fill-mode: forwards;
    animation: barAnimateIn 0.7s ease;
    #content {
      overflow: hidden;
      margin: 10px;
      display: flex;
      flex-direction: column;
    }
    &.closed {
      animation-delay: 0.1s;
      animation: barAnimateOut 0.7s ease;
      animation-fill-mode: forwards;
    }
  }

  #close-btn {
    height: $bar-header-height;
    width: 40px;
    background-color: $bar-color;
    border-radius: 0 10px 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: -40px;
    color: white;
    transition: 0.2s;
    cursor: pointer;
    #arrow {
      transform: rotate(0deg);
      transition: 0.2s;
      height: 1.3rem;
    }
    &:hover {
      right: -36px;
    }
    &.closed #arrow {
      transform: rotate(180deg);
    }
  }

  #bar-header {
    height: $bar-header-height;
    margin-bottom: 10px;
    color: white;
    display: flex;
    align-items: center;
  }
</style>

<div id="categoryBar" class:closed={isClosed}>
  <div id="close-btn" on:click={menuToggled} class:closed={isClosed}>
    <img id="arrow" src="../../assets/chevron-left-solid.svg" alt="" />
  </div>
  <div id="content">
    <div id="bar-header">
      <h3>Categories</h3>
    </div>
    <CategoriesList {userID} />
  </div>
</div>
