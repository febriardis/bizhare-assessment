<template>
  <a
    :class="['w-full wrapperBox flex items-center justify-center px-4', isInput ? 'border border-blue-300 shadow' : 'border border-gray-300']"
    @click="handleChange()"
  >
    <i class="fas fa-search mr-2"></i>
    <input ref="query" type="text" placeholder="Type your location" @blur="handleChange()" />
  </a>
</template>

<script>
export default {
  name: 'SearchField',
  props: {
    border: {
      type: Boolean,
      default: true
    },
    isFullwidth: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    isInput: false
  }),
  methods: {
    handleChange() {
      this.isInput = !this.isInput
      setTimeout(() => {
        if (this.isInput) this.$refs.query.focus()        
      }, 500);
    }
  }
}
</script>

<style lang="scss">
.wrapperBox {
  @apply bg-white text-gray-400 rounded-md bg-white h-8 md:h-9 text-sm md:text-base;
  input {
    @apply w-full px-2 bg-white;
    &:focus {
      outline: 0;
    }
  }
}
</style>