<script>
  export let expanded, categoryName, childNumber;
  let settings;

  function categoryToggled() {
    expanded = !expanded;
  }

  function settingsToggled() {
    console.log('settings');
    settings = !settings;
  }
</script>

<style lang="scss">
  @import 'src/styles/_colors.scss';

  li {
    list-style: none;
  }

  .item {
    user-select: none;
    width: calc(100% - var(--width-substact));
    background-color: white;
    border-radius: 5px;
    padding: 10px;
    margin: 5px 0 5px auto;
    white-space: nowrap;
    display: flex;
    align-items: center;
    color: $theme-gray;
    cursor: pointer;
    * {
      margin: 0 5px;
    }
    .plus {
      height: 0.75rem;
    }
    .folder {
      height: 1.3rem;
    }
    #space {
      flex: 1;
    }
    #settings {
      height: 1.3rem;
      transition: transform 0.5s ease;
      &:hover {
        transform: rotate(180deg);
      }
    }
    #grip-lines {
      cursor: grab;
      height: 1.3rem;
    }
  }
</style>

<!-- 
{#if expanded}
  <ul>
    {#each files as file}
      <li>
        {#if file.type === 'folder'}
          <svelte:self {...file} />
        {:else}
          <File {...file} />
        {/if}
      </li>
    {/each}
  </ul>
{/if} -->

<li>
  <div
    class="item"
    on:click={categoryToggled}
    style="--width-substact: {childNumber * 15}px">
    {#if expanded}
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="far"
        data-icon="minus-square"
        class="plus svg-inline--fa fa-minus-square fa-w-14"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512">
        <path
          fill="currentColor"
          d="M108 284c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h232c6.6 0 12
          5.4 12 12v32c0 6.6-5.4 12-12 12H108zM448 80v352c0 26.5-21.5 48-48
          48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5
          48 48zm-48 346V86c0-3.3-2.7-6-6-6H54c-3.3 0-6 2.7-6 6v340c0 3.3 2.7 6
          6 6h340c3.3 0 6-2.7 6-6z" />
      </svg>
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="folder-open"
        class="folder svg-inline--fa fa-folder-open fa-w-18"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512">
        <path
          fill="currentColor"
          d="M572.694 292.093L500.27 416.248A63.997 63.997 0 0 1 444.989
          448H45.025c-18.523 0-30.064-20.093-20.731-36.093l72.424-124.155A64 64
          0 0 1 152 256h399.964c18.523 0 30.064 20.093 20.73 36.093zM152
          224h328v-48c0-26.51-21.49-48-48-48H272l-64-64H48C21.49 64 0 85.49 0
          112v278.046l69.077-118.418C86.214 242.25 117.989 224 152 224z" />
      </svg>
    {:else}
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="far"
        data-icon="plus-square"
        class="plus svg-inline--fa fa-plus-square fa-w-14"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512">
        <path
          fill="currentColor"
          d="M352 240v32c0 6.6-5.4 12-12 12h-88v88c0 6.6-5.4 12-12 12h-32c-6.6
          0-12-5.4-12-12v-88h-88c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12
          12-12h88v-88c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v88h88c6.6 0 12
          5.4 12 12zm96-160v352c0 26.5-21.5 48-48 48H48c-26.5
          0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-48
          346V86c0-3.3-2.7-6-6-6H54c-3.3 0-6 2.7-6 6v340c0 3.3 2.7 6 6 6h340c3.3
          0 6-2.7 6-6z" />
      </svg>
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="folder"
        class="folder svg-inline--fa fa-folder fa-w-16"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512">
        <path
          fill="currentColor"
          d="M464 128H272l-64-64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48
          48 48h416c26.51 0 48-21.49 48-48V176c0-26.51-21.49-48-48-48z" />
      </svg>
    {/if}
    <span>{categoryName}</span>
    <div id="space" />
    <svg
      on:click={settingsToggled}
      id="settings"
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="cog"
      class="svg-inline--fa fa-cog fa-w-16"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512">
      <path
        fill="currentColor"
        d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8
        7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8
        110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2
        0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7
        85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6
        11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1
        8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8
        2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7
        36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9
        42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7
        43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1
        0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z" />
    </svg>
    <svg
      id="grip-lines"
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="grip-lines"
      class="svg-inline--fa fa-grip-lines fa-w-16"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512">
      <path
        fill="#b0b0b0"
        d="M496 288H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h480c8.8 0
        16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-128H16c-8.8 0-16 7.2-16 16v32c0
        8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16z" />
    </svg>
  </div>

  <ul hidden={!expanded}>
    <slot />
  </ul>

</li>
