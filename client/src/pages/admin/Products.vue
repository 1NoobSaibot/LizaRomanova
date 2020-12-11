<template>
  <q-page>
    <div class="row q-pa-md" style="width: 100%">
      <div class="text-h3">Товары</div>
      <q-space/>
      <q-btn icon="add_box" class="text-h6" style="width: 50px; height: 50px"
        @click="$router.push('/admin/new/product')" color="primary"
      />
    </div>
    <div class="flex" style="justify-content: flex-start">
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
        <q-card-section class="q-pt-none row">
          <div style="max-width: 60%; max-height: 48px; overflow: hidden">
            {{ product.description }}
          </div>
          <q-space/>
          <q-btn icon="delete" color="primary" class="btn-delete" @click="removeProduct(product.id)"/>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data: () => ({
    products: []
  }),
  methods: {
    async fetch () {
      const { data } = await this.$axios.get('api/product')
      this.products = data
    },
    async removeProduct (id) {
      await this.$axios.delete(`api/admin/product/${id}`)
      this.fetch()
    }
  },
  mounted () {
    this.fetch()
  }
}
</script>

<style scoped>
.product {
  margin-left: 8px;
  margin-top: 8px;
  width: 287px;
  height: 392px;
}
.btn-delete {
  width: 36px;
  height: 36px;
}
</style>
