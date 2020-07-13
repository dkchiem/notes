<style lang="scss">
  @import 'src/styles/_theme.scss';

  #dropdown-item {
    padding: 5px 15px;
    &:hover {
      background-color: $color-green;
      color: white;
    }
  }
</style>

<li id="dropdown-item">
  <slot />
</li>
