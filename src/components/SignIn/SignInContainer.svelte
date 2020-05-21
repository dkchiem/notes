<style lang="scss">
  @import '../../styles/_theme.scss';

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
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
</style>

<div id="container">
  <div id="form-container">
    <slot />
  </div>
</div>
