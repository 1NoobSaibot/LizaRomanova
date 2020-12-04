<template>
  <q-page class="row justify-center items-center content-center">
    <q-card style="width: 450px">
      <q-card-section>
        <div class="text-h6">Вход в панель администратора</div>
      </q-card-section>
      <q-card-section>
        <q-input label="E-mail" v-model="login"
          :error="!!error.login"
          :error-message="error.login"
        />
        <q-input label="Пароль" type="password" v-model="password"
          :error="!!error.password"
          :error-message="error.password"
        />
        <div class="q-mt-sm row items-end justify-between">
          <q-space/>
          <q-btn label="Войти" @click="submit" color="primary"/>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import ErrorHandler from '../../components/mixins/ErrorHandler.js'

export default {
  mixins: [ErrorHandler],
  data: () => ({
    login: '',
    password: ''
  }),
  methods: {
    async submit () {
      try {
        await this.$store.dispatch('admin/login', {
          login: this.login,
          password: this.password
        })
        this.setError({})
      } catch (e) {
        const { status, data } = e.response
        if (status === 400) this.setError(data)
        if (status === 401) this.$q.dialog({ message: data.message })
      }
    }
  }
}
</script>
