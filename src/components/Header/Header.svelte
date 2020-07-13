<style lang="scss">
  @import 'src/styles/_theme.scss';
  @import 'src/styles/_variables.scss';

  header {
    align-items: center;
    background-color: white;
    border-bottom: $border;
    box-shadow: $box-shadow;
    display: flex;
    display: flex;
    height: $header-height;
    padding: 0 30px;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1000;

    #logo {
      display: flex;
      height: 65%;
      margin-left: 5%;
      #pencilFront {
        height: 100%;
        margin-right: 10px;
        user-select: none;
      }
      h1 {
        user-select: none;
        font-family: 'Unica One', serif;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      #pencilBack {
        height: 100%;
        margin-left: 10px;
        user-select: none;
      }
    }

    #space {
      flex: 1;
    }
  }
</style>

<header>
  <div id="logo">
    <img id="pencilFront" src="../../assets/pencilFront.png" alt="logo" />
    <h1>Notes</h1>
    <img id="pencilBack" src="../../assets/pencilBack.png" alt="logo" />
  </div>
  <div id="space" />
  <slot />
</header>
