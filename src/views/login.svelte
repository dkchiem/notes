<script>
  import { link } from 'svelte-spa-router';
  import AuthenticationContainer from '@components/Authentication/AuthenticationContainer.svelte';
  import Spinner from '@components/Spinner.svelte';
  import Fields from '@components/Authentication/Fields.svelte';
  import { login } from '@helpers/user.js';

  let password,
    email,
    showSpinner,
    errorMsg,
    staySignedIn = false,
    emailInvalid;

  function getPassword(e) {
    password = e.detail;
  }

  function submit(e) {
    showSpinner = true;
    login(email, password, staySignedIn, (errorMessage) => {
      if (errorMessage) errorMsg = errorMessage;
      showSpinner = false;
    });
  }
</script>

<style lang="scss">
  @import 'src/styles/_theme.scss';

  .spinner-container {
    position: absolute;
    width: 100%;
    height: 100%;
    display: none;
    &.show {
      display: block;
    }
  }

  button {
    width: 100%;
    height: 50px;
    font-size: 1.2rem;
    border-radius: 25px;
    border: none;
    color: white;
    background-color: $color-green;
    cursor: pointer;
    &:disabled {
      cursor: default;
      background-color: lighten($color-green, 20%);
    }
  }

  .switchBtn-container {
    text-align: center;
    .switchBtn {
      display: inline-block;
      text-align: center;
      font-size: 0.75rem;
      text-decoration: none;
      color: $color-gray;
      &::after {
        content: '';
        position: relative;
        display: block;
        height: 1px;
        width: 100%;
        background: $color-green;
        transform: scaleX(0);
        transform-origin: 0%;
        transition: all 0.3s ease;
        top: 2px;
      }
      &:hover::after {
        transform: scaleX(1);
      }
    }
  }

  #errorMsg {
    color: red;
    font-size: 0.75rem;
    text-align: center;
    margin: 0.75rem 0;
  }

  #staySignedIn {
    margin: 2rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    input {
      height: 20px;
      width: 20px;
      margin-right: 8px;
      border: none;
      box-shadow: none;
      cursor: pointer;
    }
  }
</style>

<AuthenticationContainer title="Login">
  <div class="spinner-container" class:show={showSpinner}>
    <Spinner />
  </div>

  <Fields
    bind:email
    bind:emailInvalid
    {showSpinner}
    on:passwordChanged={getPassword} />

  <div id="staySignedIn">
    <input
      type="checkbox"
      name="staySignedIn"
      class="checkbox"
      placeholder=""
      bind:checked={staySignedIn}
      disabled={showSpinner} />
    <span>Keep me logged in</span>
  </div>

  {#if errorMsg}
    <p id="errorMsg">{errorMsg}</p>
  {/if}

  <button
    disabled={!email || !password || emailInvalid}
    on:click={submit}
    type="button">
    Log In
  </button>

  <div class="switchBtn-container">
    <a class="switchBtn" href="/signup" use:link>No account yet? Sign Up</a>
  </div>

</AuthenticationContainer>
