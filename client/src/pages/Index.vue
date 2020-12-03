<template>
  <q-page class="flex" style="justify-content: flex-start">
    <q-card v-for="product in products" :key="product.id" class="product">
      <q-card-section>
        <img
          alt="Quasar logo"
          src="~assets/quasar-logo-full.svg"
        >
      </q-card-section>
      <q-card-section>
        <div class="text-h6">{{ product.name }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        {{ product.description }}
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
  async mounted () {
    const { data } = await this.$axios.get('api/product')
    this.products = data
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
