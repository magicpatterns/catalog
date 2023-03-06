<template>
  <button
    :type="type"
    class="ui-button"
    :class="[
      { 'styling-tailwind': stylingTailwind },
      { 'styling-plain-css': stylingPlainCss }
    ]"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

defineProps({
  type: {
    type: String as PropType<'button' | 'submit' | 'reset' | undefined>,
    default: 'button',
    required: true
  },
  stylingTailwind: {
    type: Boolean,
    default: false
  },
  stylingPlainCss: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang="scss" scoped>
.ui-button {
  @apply text-primary border-2 py-3 px-14 rounded-sm hover:font-bold;

  &.styling-tailwind {
    @apply border-brand hover:bg-brand;
  }

  &.styling-plain-css {
    border-color: var(--color-brand);

    &:hover {
      background-color: var(--color-brand);
    }
  }
}
</style>
