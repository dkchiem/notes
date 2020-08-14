<script>
  export let title;
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';

  // Small screens
  @media only screen and (max-width: 420px) {
    #form-container {
      width: 100%;
    }
  }

  // Large screens
  @media only screen and (min-width: 420px) {
    #form-container {
      width: 25%;
      min-width: 400px;
      border-radius: 10px;
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
    #form-container {
      background-color: white;
      padding: 80px;
      #title {
        text-align: center;
        user-select: none;
        font-family: 'Unica One', serif;
      }
      form {
        position: relative;
      }
    }
  }
</style>

<div id="container">
  <div id="form-container">
    <h1 id="title">{title}</h1>
    <form>
      <slot />
    </form>
  </div>
</div>
