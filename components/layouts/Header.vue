<template>
  <header>
    <!-- header-top -->
    <div class="grid grid-cols-4 m-4">
      <div class="col-span-1">
        <a href="#">
          <i class="fas fa-arrow-left"></i>
        </a>
      </div>
      <div class="col-span-2 text-center">
        <p class="text-sm md:text-base">Daftar Bisnis</p>
      </div>
      <div class="col-span-1 text-right">
        <a href="#">
          <i class="far fa-comment-alt-dots"></i>
        </a>
      </div>
    </div>
    <!-- end header-top -->
  
    <!-- header-bottom -->
    <div class="flex items-center gap-2 mt-2 bg-gray-100 py-2 px-4">
      <div class="w-full">
        <SearchField />
      </div>
      <div class="filter-wrapper">
        <v-button icon-left="far fa-folder" variant="outlined">Kategori</v-button>
      </div>
    </div>
    <!-- end header-bottom -->
  </header>
</template>
<script>
export default {
  name: 'HeaderComponent',
  components: {
    SearchField: () => import('../atoms/SearchField')
  }
}
</script>