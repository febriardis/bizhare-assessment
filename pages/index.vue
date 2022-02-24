<template>
  <div class="index">
    <!-- filter -->
    <div class="flex items-center gap-2 bg-gray-100 py-2 px-4">
      <div class="w-full">
        <SearchField v-model="filters.businessName" />
      </div>
      <div class="filter-wrapper">
        <v-button
          icon-left="far fa-folder"
          variant="outlined"
          @click="isCategoryFilter = true"
        >Kategori</v-button>
      </div>

      <!-- filter dialog -->
      <FilterDialog v-model="isCategoryFilter" @loadData="$event => fetchBusiness($event)" />
      <!-- end filter dialog -->
    </div>
    <!-- end filter -->

    <!-- empty state -->
    <div v-if="business.length === 0 && !isLoading" class="mt-5">
      <p class="text-center text-gray-500">Data tidak ditemukan</p>
    </div>
    <!-- end empty state -->

    <!-- load data -->
    <div class="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3 md:gap-6 m-5">
      <template v-if="isLoading">
        <BusinessCard v-for="(item, key) in 6" :key="key" is-skeleton />
      </template>
      <div v-for="(item, key) in business" v-else :key="key" class="col-span-1">
        <BusinessCard :payload="item" />
      </div>
    </div>
    <!-- end load data -->

    <!-- pagination -->
    <div class="pagination" v-if="pagination && pagination.total_page">
      <div class="page-info">
        <p
          class="text-gray-500 text-sm"
        >Halaman {{ pagination.page }} dari {{ pagination.total_page }}</p>
      </div>
      <div class="page-action flex justify-end">
        <Pagination
          :total-items="pagination.total_record"
          :current-page="filters.page"
          :per-page="filters.size"
          @page-changed="($event) => filters.page = $event"
        />
      </div>
    </div>
    <!-- end pagination -->
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, watch } from '@nuxtjs/composition-api'

export default {
  name: 'IndexPage',
  components: {
    SearchField: () => import('@/components/atoms/SearchField'),
    BusinessCard: () => import('@/components/molecules/BusinessCard'),
    FilterDialog: () => import('@/components/organisms/FilterDialog'),
    Pagination: () => import('@/components/molecules/Pagination'),
  },
  setup(_, {root}) {
    const state = reactive({
      business: [],
      pagination: null,
      isLoading: false,
      isCategoryFilter: false
    })

    const filters = reactive({
      page: 1,
      size: 12,
      listCategory: [],
      businessName: null
    })

    watch(
      () => filters,
      () => {
        fetchBusiness()
      },
      {deep: true}
    )

    const fetchBusiness = async (businessIds) => {
      state.isLoading = true
      const response = await root.$http({
        method: "POST",
        url: "/business/parent/all",
        data: {
          ...filters,
          listCategory: businessIds
        }
      });
      if (response.data.success) {
        const data = response.data.data;
        state.business = data.list;
        state.pagination = {
          total_record: data.total,
          total_page: data.pages,
          page: data.pageNum
        };
        state.isLoading = false
      } else {
        state.business = [];
        state.pagination = null
        state.isLoading = false
      }
    }
    
    onMounted(() => {
      fetchBusiness()
    })

    return {
      filters,
      fetchBusiness,
      ...toRefs(state)
    }
  },
}
</script>

<style lang="scss">
.pagination {
  @apply flex justify-between m-5 mt-14 items-center;
}
</style>