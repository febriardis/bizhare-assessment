<template>
  <button
    v-bind="$attrs"
    :disabled="loading"
    :class="[
      variant,
      sizeClass,
      'relative',
      { 'cursor-wait': loading },
      { 'flex items-center gap-1': iconLeft },
      rounded ? 'rounded-full' : 'rounded',
    ]"
    @click="$emit('click')"
  >
    <i v-if="loading" class="fas fa-spinner animate-spin mt-1 left-0 right-0 absolute"></i>
    <i v-if="iconLeft" :class="iconLeft"></i>
    <div :class="{ 'opacity-0': loading }">
      <slot></slot>
    </div>
  </button>
</template>

<script>
import { computed } from '@vue/composition-api'
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'black',
    },
    iconLeft: {
      type: String,
      default: null,
    },
    variant: {
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'text', 'outlined'].includes(value)
      },
    },
    size: {
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'small'].includes(value)
      },
    },
  },
  setup(props) {
    const sizeClass = computed(() => {
      if (props.size === 'small') {
        return 'px-2 py-1 text-xs md:text-sm'
      }
      return 'px-2 py-1 md:px-3 md:py-1 text-sm md:text-base'
    })
    return {
      sizeClass,
    }
  },
}
</script>

<style lang="scss">
button {
  @apply font-light md:font-semibold block transition duration-100 ease-in-out focus:ring-2 focus:ring-gray-500 focus:outline-none focus:ring-opacity-50;
  &:disabled {
    @apply opacity-50 cursor-not-allowed;
  }
  &.default {
    @apply text-white border border-transparent shadow-sm bg-sky-900 hover:bg-sky-600 focus:border-sky-500;
  }
  &.outlined {
    @apply text-gray-500 border border-gray-500 shadow-sm hover:bg-gray-100 focus:border-gray-500;
  }
  &.text {
    @apply border border-transparent focus:border-transparent;
  }
}
</style>
