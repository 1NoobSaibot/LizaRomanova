<template>
  <q-page class="flex" style="justify-content: flex-start">
    <q-card v-for="product in products" :key="product.id"
      class="product"
      @click="$router.push(`/product/${product.id}`)"
    >
      <q-card-section class="flex flex-center"
        style="width: 287px; height: 275.75px"
      >
        <img style="max-width: 254.75px; max-height: 237.75px"
          alt="Quasar logo"
          :src="`file/product/${product.id}/avatar`"
        >
      </q-card-section>
      <q-card-section>
        <div class="text-h6">{{ product.name }}</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data: () => ({
    products: []
  }),
  computed: {
    categoryId () {
      return this.$route.params.categoryId
    }
  },
  methods: {
    async fetch () {
      const { data } = await this.$axios.get(this.categoryId ? `api/category/${this.categoryId}/product` : 'api/product')
      this.products = data
    }
  },
  watch: {
    categoryId () {
      this.fetch()
    }
  },
  async mounted () {
    await this.fetch()
  }
}
</script>

<style scoped>
.product {
  margin-left: 8px;
  margin-top: 8px;
  width: 287px;
  height: 377px;
}
</style>
