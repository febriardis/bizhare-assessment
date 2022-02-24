<template>
  <div class="card-article">
    <div v-if="isSkeleton" class="animate-pulse">
      <div class="mb-2 w-full bg-gray-300 h-40 md:h-60"></div>
      <div class="w-32 bg-gray-300 h-6 rounded-md mb-2"></div>
      <div class="w-full sm:w-60 bg-gray-300 h-6 rounded-md mb-2"></div>
    </div>
    <a v-else class="block" href="javascript:void(0)">
      <img :src="payload.logoUrl" class="object-cover w-full h-40 md:h-60 border rounded" alt />
      <h5
        class="text-lg md:font-bold md:text-xl mt-2 font-semibold text-gray-900"
      >{{ payload.businessName }}</h5>
      <p class="font-normal text-gray-400 mt-2">{{ payload.businessCategory }}</p>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    payload: {
      type: [Object, Number],
      default: null,
    },
    isSkeleton: {
      type: Boolean,
      default: false,
    },
  },
}
</script>


<style lang="scss">
.card-article {
  @apply border shadow-md p-4 rounded;
}
</style>