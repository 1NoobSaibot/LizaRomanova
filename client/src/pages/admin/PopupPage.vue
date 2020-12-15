<template>
  <q-page class="q-pa-md" style="width: 640px; height: 480px">
    <div class="row q-mb-md text-h6">Продажи</div>
    <q-list padding bordered class="rounded-borders">
      <q-expansion-item
        v-for="purchase in purchases" :key="purchase.id"
        expand-separator
        style="border: 1px #0005 solid; background-color: #eee"
        background-color="primary"
      >
        <template v-slot:header>
          <div class="row" style="width: 100%">
            <q-icon name="shopping_cart" style="font-size: 2.4em; margin-right: 32px"/>
            <div style="width: 150px; text-align: left">
              {{ purchase.client_email }}
            </div>
            <q-space/>
            <div class="flex flex-center q-mr-md">
              {{ 'Всего: ' + purchase.items.reduce((a, cv) => { return a += cv.amount * cv.price }, 0) + ' грн.' }}
            </div>
          </div>
        </template>
        <q-list bordered class="rounded-borders">
          <q-item style="border: 1px #0005 solid; background-color: #fff"
            v-for="item in purchase.items" :key="`${item.purchase_id}/${item.product_id}`"
            dense dense-toggle
            expand-separator
          >
            <q-item-section style="width: 50%">
              {{ item.product.name }}
            </q-item-section>
            <q-item-section style="width: 30%; text-align: right">
              {{ `${item.amount} * ${item.price} грн.` }}
            </q-item-section>
            <q-item-section style="width: 20%; text-align: right">
              {{ 'Итого: ' + item.amount * item.price + ' грн.' }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  data: () => ({
    purchases: []
  }),
  methods: {
    async fetch () {
      const { data } = await this.$axios.get('http://localhost:3333/api/admin/purchase')
      this.purchases = data
    }
  },
  async mounted () {
    await this.fetch()
  }
}
</script>
