<script>
  let showPassword = false;
  let email;
  let password;

  function submit() {}
</script>

<style lang="scss">
  @import '../../styles/_theme.scss';

  #login {
    text-align: center;
    font-family: 'Unica One', cursive;
  }

  form {
    max-width: 500px;
  }

  .field {
    width: 100%;
    margin: 0 auto;
    position: relative;
    border-bottom: 2px dashed $theme-gray;
    margin: 4rem auto 1rem;
    transition: 0.5s;
    &::after {
      content: '';
      position: relative;
      display: block;
      height: 4px;
      width: 100%;
      background: $theme-green;
      transform: scaleX(0);
      transform-origin: 0%;
      opacity: 0;
      transition: all 500ms ease;
      top: 2px;
    }
    &:focus-within {
      border-color: transparent;
    }
    &:focus-within::after {
      transform: scaleX(1);
      opacity: 1;
    }
    .eye {
      height: 1rem;
    }
  }

  .field:focus-within .label,
  .input:not(:placeholder-shown) + .label {
    transform: scale(0.8) translateY(-5rem);
    opacity: 1;
  }

  .label {
    color: $theme-gray;
    font-size: 1.2rem;
    position: absolute;
    transform: translateY(-2rem);
    transform-origin: 0%;
    transition: transform 0.4s;
    display: block;
  }

  .input {
    box-shadow: none;
    margin-bottom: 0.5rem;
    outline: none;
    border: none;
    overflow: hidden;
    margin: 0;
    width: 100%;
    padding: 0.25rem 0;
    background: none;
    color: $theme-gray;
    font-size: 1.2em;
    font-weight: bold;
    transition: border 0.5s;
  }

  .toggle-password {
    position: absolute;
    cursor: pointer;
    font-size: 1rem;
    right: 0.25rem;
    bottom: 0.5rem;
  }

  button {
    width: 100%;
    height: 50px;
    font-size: 1.2rem;
    border-radius: 25px;
    border: none;
    color: white;
    background-color: $theme-green;
    cursor: pointer;
    &:disabled {
      cursor: default;
      background-color: lighten($theme-green, 20%);
    }
  }

  .switchBtn-container {
    text-align: center;
    .switchBtn {
      display: inline-block;
      text-align: center;
      font-size: 0.75rem;
      text-decoration: none;
      color: $theme-gray;
      &::after {
        content: '';
        position: relative;
        display: block;
        height: 1px;
        width: 100%;
        background: $theme-green;
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
</style>

<h1 id="login">Login</h1>
<form>
  <div class="field">
    <input
      type="email"
      name="email"
      class="input"
      placeholder=""
      bind:value={email} />
    <label for="email" class="label">Email</label>
  </div>

  <div class="field">
    <input
      type={showPassword ? 'text' : 'password'}
      name="password"
      class="input"
      placeholder="" />
    <label for="password" class="label">Password</label>
    <span
      class="toggle-password"
      on:click={() => (showPassword = !showPassword)}>
      {#if showPassword}
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="eye-slash"
          class="eye svg-inline--fa fa-eye-slash fa-w-20"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512">
          <path
            fill="currentColor"
            d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79
            17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41
            197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13
            144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0
            81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320
            64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23
            6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0
            22.46-2.81l19.64-25.27a16 16 0 0
            0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416
            256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64
            46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92
            143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z" />
        </svg>
      {:else}
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="eye"
          class="eye svg-inline--fa fa-eye fa-w-18"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512">
          <path
            fill="currentColor"
            d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48
            241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288
            448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288
            400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31
            95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0
            288 160z" />
        </svg>
      {/if}
    </span>
  </div>

  <button disabled={!email} on:click={submit}>Log In</button>

  <div class="switchBtn-container">
    <a class="switchBtn" href="/signup">No account yet? Sign Up</a>
  </div>
</form>
