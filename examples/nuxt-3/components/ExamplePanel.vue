<template>
  <div>
    <h1 class="headline">Example Panel</h1>
    <div class="wrapper-panel">
      <h2 class="description">
        Ui-Button-Component + Mirrorful-Variables in tailwind.config.js
      </h2>
      <ui-button :type="'button'" styling-tailwind>Hover me</ui-button>
    </div>

    <div class="wrapper-panel">
      <h2 class="description">
        Ui-Button-Component + Mirrorful - From CSS-File
      </h2>
      <ui-button :type="'button'" styling-plain-css>Hover me</ui-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.headline {
  @apply mb-4 text-2xl font-bold;
}

.wrapper-panel {
  @apply border px-6 py-6 rounded-sm mb-12;

  .description {
    @apply mb-4;
  }
}
</style>
