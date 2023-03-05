<template>
  <div>
    <h1>MirrorfulExampleComponent - Inline Token Styling</h1>

    <button
      class="primary-button"
      :style="{ 'background-color': Tokens.pink[500] }"
    >
      Hover me
    </button>
  </div>

  <div class="css-file-wrapper">
    <h1>Nuxt 3 + Mirrorfull - From CSS-File</h1>

    <button class="primary-button">Hover me</button>
  </div>
</template>

<script setup lang="ts">
import { Tokens } from '~/.mirrorful/theme';
</script>

<style lang="scss" scoped>
.css-file-wrapper {
  background-color: azure;
}
</style>
