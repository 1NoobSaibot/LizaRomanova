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
        <q-card-section class="row">
          <q-space/>
          <q-btn icon="edit" class="btn-delete" color="primary"
            @click="$router.push(`/admin/product/${product.id}`)"
          />
          <q-btn icon="delete" class="btn-delete" color="secondary"
            @click="removeProduct(product)"
          />
        </q-card-section>
        <q-card-section class="flex flex-center"
          style="width: 287px; height: 275.75px"
        >
          <img style="max-width: 254.75px; max-height: 237.75px"
            alt="Quasar logo"
            :src="`file/product/${product.id}/avatar`"
          >
        </q-card-section>
        <q-card-section style="height: 64px">
          <div class="text-h6" style="width: 100%; height: 100%; overflow: hidden">{{ product.name }}</div>
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
    async removeProduct (product) {
      this.$q.dialog({
        title: 'Удаление товара',
        message: `Вы действительно хотите удалить товар "${product.name}"`,
        cancel: true
      }).onOk(async () => {
        await this.$axios.delete(`api/admin/product/${product.id}`)
        this.fetch()
      })
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
  height: 408px;
}
.btn-delete {
  width: 36px;
  height: 36px;
  margin-left: 4px;
}
</style>
