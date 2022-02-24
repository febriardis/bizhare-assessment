<template>
  <div v-if="isVisible" class="v-modal" style="background: rgba(0, 0, 0, 0.5)">
    <div class="dialog">
      <a
        href="javascript:void(0)"
        class="text-gray-500 absolute right-0 top-0 mt-3 mr-4"
        @click="isVisible = false"
      >
        <i class="fa fa-times"></i>
      </a>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: 'w-auto',
    },
  },
  setup(props, { emit }) {
    const isVisible = computed({
      get: () => props.value,
      set: (newValue) => emit('input', newValue),
    })
    return {
      isVisible,
    }
  },
}
</script>

<style lang="scss">
.v-modal {
  @apply fixed top-0 bottom-0 left-0 right-0 flex justify-center pt-28;
  .dialog {
    width: 450px;
    @apply absolute bg-white rounded h-full md:h-auto;
  }
  @media (max-width: 768px) {
    .dialog {
      width: 100%;
    }
  }
}
</style>