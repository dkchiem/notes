<script>
  import { link } from 'svelte-spa-router';
  import AuthenticationContainer from '@components/Authentication/AuthenticationContainer.svelte';
  import Spinner from '@components/Spinner.svelte';
  import Fields from '@components/Authentication/Fields.svelte';
  import { signUp } from '@helpers/user.js';

  let strength = 0,
    validations = [],
    email,
    password,
    showSpinner,
    emailInvalid,
    errorMsg;

  function validatePassword(e) {
    password = e.detail;
    validations = [
      password.length > 8,
      password.search(/[A-Z]/) > -1,
      password.search(/[0-9]/) > -1,
      password.search(/[$&+,:;=?@#]/) > -1,
    ];
    strength = validations.reduce((acc, cur) => acc + cur);
  }

  function submit() {
    showSpinner = true;
    signUp(email, password, (errorMessage) => {
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

  .strength {
    display: flex;
    height: 20px;
    width: 100%;
    .bar {
      margin-right: 5px;
      height: 100%;
      width: 25%;
      transition: box-shadow 0.5s;
      box-shadow: inset 0px 20px #dedede;
      border-radius: 3px;
      &#bar-1 {
        background: linear-gradient(to right, red, orangered);
      }
      &#bar-2 {
        background: linear-gradient(to right, orangered, yellow);
      }
      &#bar-3 {
        background: linear-gradient(to right, yellow, yellowgreen);
      }
      &#bar-4 {
        background: linear-gradient(to right, yellowgreen, green);
      }
      &.bar-show {
        box-shadow: none;
      }
    }
  }

  #requirements {
    margin: 1rem;
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
</style>

<AuthenticationContainer title="Sign Up">
  <div class="spinner-container" class:show={showSpinner}>
    <Spinner />
  </div>

  <Fields
    bind:email
    bind:emailInvalid
    {showSpinner}
    on:passwordChanged={validatePassword} />

  <div class="strength">
    <span class="bar" id="bar-1" class:bar-show={strength > 0} />
    <span class="bar" id="bar-2" class:bar-show={strength > 1} />
    <span class="bar" id="bar-3" class:bar-show={strength > 2} />
    <span class="bar" id="bar-4" class:bar-show={strength > 3} />
  </div>

  <ul id="requirements">
    <li>{validations[0] ? '✔️' : '❌'} must be at least 8 characters</li>
    <li>{validations[1] ? '✔️' : '❌'} must contain a capital letter</li>
    <li>{validations[2] ? '✔️' : '❌'} must contain a number</li>
    <li>{validations[3] ? '✔️' : '❌'} must contain one of $&+,:;=?@#</li>
  </ul>

  {#if errorMsg}
    <p id="errorMsg">{errorMsg}</p>
  {/if}

  <button
    disabled={!email || !password || emailInvalid || showSpinner || strength < 4}
    on:click={submit}
    type="button">
    Sign Up
  </button>

  <div class="switchBtn-container">
    <a class="switchBtn" href="/login" use:link>Have an account? Log In</a>
  </div>
</AuthenticationContainer>
