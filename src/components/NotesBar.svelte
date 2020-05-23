<script>
  let isClosed = false;

  function menuToggled() {
    isClosed = !isClosed;
  }
</script>

<style lang="scss">
  @import 'src/styles/_colors.scss';

  $bar-header-height: 50px;
  $bar-color: $theme-gray;

  @keyframes barAnimateOut {
    25% {
      width: calc(20% + 10px);
    }
    100% {
      width: 0;
    }
  }

  @keyframes barAnimateIn {
    0% {
      width: 0;
    }
    75% {
      width: calc(20% + 10px);
    }
    100% {
      width: 20%;
    }
  }

  #noteBar {
    background-color: $bar-color;
    width: 20%;
    height: 100%;
    padding-top: 10px;
    z-index: 499;
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

  .item {
    width: 100%;
    background-color: white;
    border-radius: 5px;
    padding: 10px 20px;
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
    top: 125px;
    color: white;
    transition: 0.2s;
    cursor: pointer;
    #arrow {
      transform: rotate(0deg);
      transition: 0.2s;
      height: 1.3rem;
      color: white;
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
    padding-left: 40px;
  }
</style>

<div id="noteBar" class:closed={isClosed}>
  <div id="close-btn" on:click={menuToggled} class:closed={isClosed}>
    <img id="arrow" src="../../assets/chevron-left-solid.svg" alt="" />
  </div>
  <div id="content">
    <div id="bar-header">
      <h3>Notes</h3>
    </div>
    <div class="item">Test</div>
  </div>
</div>
