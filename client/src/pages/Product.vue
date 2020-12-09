<template>
  <q-page class="q-pa-md">
    <div class="text-h3 q-mb-md">{{ product.name }}</div>
    <div class="row" style="flex-wrap: nowrap">
      <div>
        <img class="photo"
          alt="Quasar logo"
          :src="`file/product/${product.id}/avatar`"
        >
      </div>
      <div class="column text-h6 q-ml-md">
        <div class="q-my-md">
          {{ product.description }}
        </div>
        <q-space/>
        <div class="row q-ma-md">
          <q-space/>
          {{ product.price + ' грн.' }}
          <q-btn label="Купить" color="primary" @click="addToCart" class="q-ml-md"/>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data: () => ({
    product: {},
    amount: 1
  }),
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  methods: {
    addToCart () {
      this.$store.commit('cart/addProduct', {
        id: this.id,
        amount: this.amount,
        price: this.product.price
      })
    }
  },
  async mounted () {
    const { data } = await this.$axios.get(`api/product/${this.id}`)
    this.product = data
  }
}
</script>

<style scoped>
.photo {
  border: 1px rgba(0, 0, 0, 0.2) solid;
}
</style>
