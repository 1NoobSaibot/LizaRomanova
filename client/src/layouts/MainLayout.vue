<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          QShop
        </q-toolbar-title>

        <q-btn round icon="shopping_cart" class="q-ml-md" @click="cartClick">
          <q-badge v-if="!cartIsEmpty" color="secondary" floating>
            {{ cartCount }}
          </q-badge>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Категории
        </q-item-label>
        <q-item clickable v-ripple style="border: 1px #0005 solid"
          v-for="item in modifiedCategories"
          :key="item.id"
          @click="$router.push(item.id ? `/category/${item.id}` : '/')"
        >
          <q-item-section>{{ '> ' + item.name }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      categories: []
    }
  },
  computed: {
    cartCount () {
      return this.$store.getters['cart/count']
    },
    cartIsEmpty () {
      return !this.cartCount
    },
    modifiedCategories () {
      return [{ name: 'Все категории' }, ...this.categories]
    }
  },
  methods: {
    cartClick () {
      if (this.cartIsEmpty) {
        this.$q.dialog({ message: 'Корзина пустая' })
      } else {
        this.$router.push('/cart')
      }
    }
  },
  async mounted () {
    const { data } = await this.$axios.get('api/category')
    this.categories = data
  }
}
</script>
