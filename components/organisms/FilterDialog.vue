<template>
  <v-modal v-model="isVisible" width="w-96">
    <div class="pt-3 p-5">
      <h4 class="mb-4 md:mb-6 text-lg md:text-2xl font-bold">Filter</h4>

      <ul class="category-list">
        <li v-for="(item, key) in categories" :key="key" v-show="key < limit">
          <a href="javascript:void(0)" class="list-items" @click="selectCategory(item)">
            {{ item.paramName }}
            <span :class="['radio', {'active' : isChecked(item)}]">
              <i class="fas fa-check" v-if="isChecked(item)"></i>
            </span>
          </a>
        </li>
      </ul>

      <div class="text-center -mt-5" v-if="limit !== categories.length">
        <a href="javascript:void(0)" class="text-sm text-sky-900" @click="viewMore">
          <i class="fas fa-angle-down mr-1"></i>
          Lihat semua
        </a>
      </div>

      <v-button :loading="is_loading" class="w-full mt-5" @click="submitFilter">Terapkan</v-button>
    </div>
  </v-modal>
</template>

<script>
import { computed, reactive, toRefs, onMounted } from '@nuxtjs/composition-api'

export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    }
  },

  setup(props, { emit, root }) {
    const state = reactive({
      limit: 5,
      is_loading: null,
      categories: [],
      category_temporary: []
    })

    const viewMore = () => {
      state.limit = state.categories.length
    }
    
    const isVisible = computed({
      get: () => props.value,
      set: (newValue) => emit('input', newValue),
    })

    const fetchCategories = async () => {
      state.is_loading = true
      const response = await root.$http({
        method: "GET",
        url: "/media/param/business/category"
      });
      if (response.data.success) {
        state.categories = response.data.data;
        state.is_loading = false
      } else {
        state.categories = [];
        state.is_loading = false
      }
    }

    const submitFilter = () => {
      emit('loadData', state.category_temporary)
      isVisible.value = false
    }

    const selectCategory = (item) => {
      const find = state.category_temporary.some(el => [el].includes(item.paramCode))
      if (!find) {
        state.category_temporary.push(item.paramCode)
      } else {
        state.category_temporary = state.category_temporary.filter(
          el => el !== item.paramCode
        );
      }
    }
    
    const isChecked = (item) => {
      return state.category_temporary.some(el => [el].includes(item.paramCode))
    }
    
    onMounted(() => {
      fetchCategories()
    })
    
    return {
      ...toRefs(state),
      viewMore,
      isVisible,
      isChecked,
      submitFilter,
      selectCategory,
    }
  },
}
</script>

<style lang="scss">
.category-list {
  .list-items {
    @apply flex justify-between mb-2 text-sm text-gray-500;
    .radio {
      @apply block w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-xs;
      &.active {
        @apply bg-blue-500 text-white;
      }
    }
  }
}
</style>