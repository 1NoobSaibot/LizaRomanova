<template>
  <q-page class="q-pa-md">
    <div class="text-h3 q-mb-md">Корзина</div>
    <q-item v-for="item in items" :key="item.id" class="column item">
      <div class="row">
        <q-item-section class="text-h6">{{ item.name }}</q-item-section>
        <q-space/>
        <q-btn style="width: 36px" icon="delete" @click="removeProduct(item.id)"/>
      </div>
      <div class="row">
        <q-item-section thumbnail
          class="image-container"
          style="margin-left: 8px"
        >
          <img :src="`file/product/${item.id}/avatar`" class="image" alt="Quasar Logo">
        </q-item-section>
        <q-space/>
        <i-numeric :value="item.amount"
          class="numeric"
          @input="changeAmount(item.id, $event)"
        />
        <div class="text-h6 q-mr-md price">{{ item.price + ' грн.' }}</div>
      </div>
    </q-item>
    <div class="row q-mt-md text-h6 flex-center">
      <q-input class="text-h6" v-model="email" label="E-mail"
        :error="!!error.email" v-bind:error-message="error.email"
        @input="error.email = ''"
      />
      <q-space/>
      {{ 'Всего: ' + total + ' грн.'}}
    </div>
    <div class="row q-mt-md">
      <q-space/>
      <q-btn label="Оформить заказ" color="primary" @click="purchase"/>
    </div>
  </q-page>
</template>

<script>
import ErrorHandler from 'components/mixins/ErrorHandler.js'
import iNumeric from 'components/Numeric.vue'

export default {
  mixins: [ErrorHandler],
  components: { iNumeric },
  data: () => ({
    email: ''
  }),
  computed: {
    items () {
      return this.$store.state.cart.items
    },
    total () {
      return this.$store.getters['cart/total']
    }
  },
  methods: {
    async purchase () {
      try {
        this.setError({})
        await this.$store.dispatch('cart/purchase', this.email)
        this.$q.dialog({
          message: 'Заказ успешно сформирован. Наш представитель скоро свяжется с Вами'
        }).onDismiss(() => {
          this.$router.push('/')
        })
      } catch ({ response: { status, data } }) {
        if (status === 400) this.setError(data)
      }
    },
    changeAmount (id, amount) {
      console.log(`ChangeAmount ID:${id} NewAmount:${amount}`)
      if (amount < 1) amount = 1
      this.$store.commit('cart/setAmount', { id, amount })
    },
    removeProduct (id) {
      this.$store.commit('cart/removeProduct', id)
    }
  }
}
</script>

<style scoped>
.numeric {
  align-self: center;
  margin-right: 32px;
}
.price {
  align-self: center;
  width: 150px;
  text-align: right;
}
.image {
  height: 100px;
  width: auto;
}
.image-container {
  width: 50%;
}
.item {
  border: 1px rgba(0, 0, 0, 0.2) solid
}
</style>
