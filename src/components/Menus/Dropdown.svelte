<style lang="scss">
  @import 'src/styles/_theme.scss';

  .dropdown {
    background-color: white;
    border-radius: $border-radius;
    border: $border;
    box-shadow: 0 8px 24px rgba(149, 157, 165, 0.2);
    display: flex;
    flex-direction: column;
    list-style: none;
    min-width: 150px;
    overflow: hidden;
  }
</style>

<ul class="dropdown">
  <slot />
</ul>
