<template>
  <q-dialog :value="show" @hide="close">
    <q-card style="width: 450px">
      <q-card-section class="text-h6">
        {{ isCreateMode ? 'Создание категории' : 'Редактирование категории' }}
      </q-card-section>
      <q-card-section>
        <q-input :value="value.name" @input="onInput($event)"
          :error="!!error.name" :error-message="error.name"
          label="Название категории"
        />
        <div class="row">
          <q-space/>
          <q-btn label="Отмена" @click="close" color="secondary"/>
          <q-btn color="primary" style="margin-left: 4px"
            :label="isCreateMode ? 'Создать' : 'Редактировать'"
            @click="submit"
          />
        </div>
      </q-card-section>
    </q-card>]
  </q-dialog>
</template>

<script>
import ErrorHandler from 'components/mixins/ErrorHandler'

export default {
  mixins: [ErrorHandler],
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    show: Boolean,
    value: { type: Object, default: () => ({}) }
  },
  computed: {
    id () {
      return this.value.id
    },
    isCreateMode () {
      return !this.value.id
    }
  },
  methods: {
    close () {
      this.setError({})
      this.$emit('hide')
    },
    onInput (name) {
      this.error.name = ''
      this.$emit('input', {
        ...this.value,
        name
      })
    },
    async submit () {
      try {
        if (this.isCreateMode) {
          await this.$axios.post('api/admin/category', { name: this.value.name })
        } else {
          await this.$axios.put(`api/admin/category/${this.id}`, { name: this.value.name })
        }
        this.$emit('accept')
        this.close()
      } catch ({ response: { data, status } }) {
        if (status === 400) this.setError(data)
      }
    }
  }
}
</script>
