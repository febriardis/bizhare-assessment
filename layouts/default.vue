<template>
  <div class="d-layout">
    <!-- header -->
    <Header />
    <!-- /header -->
    <nuxt></nuxt>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout', 
  components: {
    Header: () => import('@/components/layouts/Header')
  },
}
</script>