<template>
  <div>
    <h1>Example Panel</h1>
    <div class="wrapper-panel">
      <h2>Ui-Button-Component + Mirrorful-Variables in tailwind.config.js</h2>
      <ui-button :type="'button'" styling-tailwind>Hover me</ui-button>
    </div>

    <div class="wrapper-panel">
      <h2>Ui-Button-Component + Mirrorful - From CSS-File</h2>
      <ui-button :type="'button'" styling-plain-css>Hover me</ui-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  @apply mb-4 text-2xl font-bold;
}

h2 {
  @apply mb-4;
}
.wrapper-panel {
  @apply border px-6 py-6 rounded-sm mb-12;
}
</style>
