<template>
  <a
    :class="['w-full wrapperBox flex items-center justify-center px-4', isInput ? 'border border-blue-300 shadow' : 'border border-gray-300']"
    @click="handleChange()"
  >
    <i class="fas fa-search mr-2"></i>
    <input
      ref="query"
      type="text"
      v-model="innerValue"
      placeholder="Cari nama bisnis"
      @blur="handleChange()"
    />
  </a>
</template>

<script>
import _ from "lodash";

export default {
  name: 'SearchField',
  props: {
    value: {
      default: "",
      type: String
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
    },
    debounceInput: _.debounce(function(value) {
      if (value.length > 2) {
        this.$emit("input", value);
      } else {
        this.$emit("input", null);
      }
    }, 500)
  },
  computed: {
    innerValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.debounceInput(value);
      }
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