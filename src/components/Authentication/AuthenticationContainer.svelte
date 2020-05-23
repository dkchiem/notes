<style lang="scss">
  @import 'src/styles/_colors.scss';

  @keyframes bg-animation {
    0% {
      background-position: left;
    }
    100% {
      background-position: right;
    }
  }

  $gradient: linear-gradient(45deg, #2c7873, #52de97, #c0ffb3, #ffba5a);

  #container {
    width: 100%;
    height: 100vh;
    background-image: $gradient;
    background-size: 400%;
    animation: bg-animation 20s infinite alternate;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #form-container {
    background-color: white;
    border-radius: 10px;
    width: 25%;
    padding: 80px;
  }
</style>

<div id="container">
  <div id="form-container">
    <slot />
  </div>
</div>
