<script>
  export let title, barColor, position;
  const zIndex = 500 - position;
  const closeBtnPos = position == 0 ? '5px' : `${55 * position + 5}px`;
  const closedWidth = position == 0 ? '15px' : '0';
  const contentLeftMargin = position == 0 ? '10px' : '40px';

  let isClosed = false;

  function menuToggled() {
    isClosed = !isClosed;
  }
</script>

<style lang="scss">
  @import 'src/styles/_colors.scss';

  $bar-color: var(--bar-color);
  $z-index: var(--z-index);
  $close-btn-pos: var(--close-btn-pos);
  $closed-width: var(--closed-width);
  $content-left-margin: var(--content-left-margin);

  @keyframes barAnimateOut {
    25% {
      width: calc(20% + 10px);
    }
    100% {
      width: $closed-width;
    }
  }

  @keyframes barAnimateIn {
    0% {
      width: $closed-width;
    }
    75% {
      width: calc(20% + 10px);
    }
    100% {
      width: 20%;
    }
  }

  #bar {
    background-color: $bar-color;
    width: 20%;
    height: 100%;
    padding-top: 20px;
    z-index: $z-index;
    position: relative;
    animation-delay: 0.1s;
    animation: barAnimateIn 0.7s ease;
    animation-fill-mode: forwards;
    color: white;

    &.closed {
      animation-delay: 0.1s;
      animation: barAnimateOut 0.7s ease;
      animation-fill-mode: forwards;
    }

    #content {
      overflow: hidden;
      margin: 10px;
      display: flex;
      flex-direction: column;
      padding-left: $content-left-margin;
      #bar-header {
        height: 50px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
      }
    }

    #close-btn {
      height: 50px;
      width: 40px;
      background-color: $bar-color;
      border-radius: 0 10px 10px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      right: -40px;
      top: $close-btn-pos;
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
  }
</style>

<div
  id="bar"
  class:closed={isClosed}
  style="--bar-color: {barColor}; --z-index: {zIndex}; --close-btn-pos: {closeBtnPos};
  --content-left-margin: {contentLeftMargin}; --closed-width: {closedWidth}">

  <div id="close-btn" on:click={menuToggled} class:closed={isClosed}>
    <img id="arrow" src="../../assets/chevron-left-solid.svg" alt="" />
  </div>

  <div id="content">
    <div id="bar-header">
      <h3>{title}</h3>
    </div>

    <slot />

  </div>

</div>
