<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          QShop Admin Panel
        </q-toolbar-title>
        <div v-if="$store.getters['admin/isAuthorized']" class="row">
          <q-item>
            <q-item-section>
              <q-item-label>
                {{ $store.getters['admin/email'] }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-btn @click="logout" title="Выход" flat dense round icon="logout"/>
        </div>
        <q-btn @click="openAdminTab" title="Перейти на сайт" flat dense round icon="tab"/>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  methods: {
    async logout () {
      await this.$store.dispatch('admin/logout')
    },
    openAdminTab () {
      chrome.tabs.create({
        url: 'http://localhost:8080/admin/login'
      })
    }
  }
}
</script>
