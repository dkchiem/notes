<style lang="scss">
  @import 'src/styles/_colors.scss';
  #menu-container {
    position: absolute;
    top: 58px;
    width: 300px;
    //transform: translateX(-45%);
    border: solid 1px #979797;
    border-radius: 10px;
    padding: 1rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background-color: white;
    right: 10px;
  }
</style>

<div id="menu-container">
  <slot />
</div>
