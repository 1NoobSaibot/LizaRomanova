<template>
  <q-page class="q-pa-md">
    <div class="text-h3 q-mb-md">Корзина</div>
    <q-card class="row" v-for="item in items" :key="item.id">
      <div class="text-h6 q-ml-md">{{ 'ID: ' + item.id }}</div>
      <q-space/>
      <q-input :value="item.amount" type="number"
        @input="changeAmount(item.id, $event)"
      />
      <q-space/>
      <div class="text-h6  q-mr-md">{{ 'Price: ' + item.price + ' грн.' }}</div>
    </q-card>
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

export default {
  mixins: [ErrorHandler],
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
      } catch ({ response: { status, data } }) {
        if (status === 400) this.setError(data)
      }
    },
    changeAmount (id, amount) {
      console.log(`ChangeAmount ID:${id} NewAmount:${amount}`)
      if (amount < 1) amount = 1
      this.$store.commit('cart/setAmount', { id, amount })
    }
  }
}
</script>
