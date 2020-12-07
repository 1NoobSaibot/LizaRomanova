<template>
  <q-page class="q-pa-md">
    <div class="column" style="min-width: 50%; max-width: 100%; display: table-caption;">
      <div class="text-h3 q-mb-md">{{ product.name }}</div>
      <div class="row">
        <img class="photo"
          alt="Quasar logo"
          src="~assets/quasar-logo-full.svg"
        >
        <div class="text-h6" style="width: 100%">
          <div class="q-my-md">
            {{ product.description }}
          </div>
          <div class="row">
            <q-space/>
            {{ product.price + ' грн.' }}
            <q-btn label="Купить" color="primary" @click="addToCart" class="q-ml-md"/>
          </div>
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
  height: 480px;
  width: 640px;
  border: 1px rgba(0, 0, 0, 0.5) solid;
}
</style>
