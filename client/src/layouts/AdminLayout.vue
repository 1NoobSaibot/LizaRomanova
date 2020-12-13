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
          Admin App
        </q-toolbar-title>

        <div v-if="$store.getters['admin/isAuthorized']" class="row">
          <q-item>
            <q-item-section>
              <q-item-label>
                {{ $store.getters['admin/email'] }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-btn @click="logout" flat dense round icon="logout"/>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-h6"
        >
          Меню
        </q-item-label>
        <q-item v-for="link in links" :key="link.label"
          clickable v-ripple style="border: 1px #0005 solid"
          @click="$router.push(link.pushTo)"
        >
          <q-item-section>
            {{ '> ' + link.label }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
const links = [
  { label: 'Категории', pushTo: '/admin/category' },
  { label: 'Товары', pushTo: '/admin/product' },
  { label: 'Продажи', pushTo: '/admin/purchase' }
]

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      links: links
    }
  },
  methods: {
    async logout () {
      await this.$store.dispatch('admin/logout')
    }
  }
}
</script>
