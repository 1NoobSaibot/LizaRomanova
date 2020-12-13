<template>
  <q-page class="flex flex-center">
    <q-card style="width: 450px">
      <q-card-section class="text-h6">{{ isCreateMode ? 'Новый товар' : 'Редактирование товара' }}</q-card-section>
      <q-card-section>
        <q-input v-model="name" label="Название товара"
          :error="!!error.name" :error-message="error.name"
          @click="error.name = ''"
        />
        <q-select label="Категория" v-model="category" :options="categories"
          :error="!!error.categoryId" :error-message="error.categoryId"
          option-label="name"
          @input="error.categoryId = ''"
        />
        <q-input label="Описание" v-model="description" type="textarea"
          :error="!!error.description" :error-message="error.description"
          @input="error.description = ''"
        />
        <q-input label="Цена (грн.)" v-model="price"
          :error="!!error.price" :error-message="error.price"
          @input="error.price = ''"
        />
        <q-uploader ref="uploader"
          label="Изображение"
          style="max-width: 640px"
          @added="onImageAdded"
        />
      </q-card-section>
      <q-card-actions>
        <q-space/>
        <q-btn label="Отправить" @click="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import ErrorHandler from 'components/mixins/ErrorHandler.js'

export default {
  mixins: [ErrorHandler],
  data: () => ({
    categories: [],
    category: null,
    description: '',
    image: null,
    name: '',
    price: '',
    propsJson: {}
  }),
  computed: {
    id () {
      return this.$route.params.id
    },
    isCreateMode () {
      return !this.id
    }
  },
  methods: {
    async fetch () {
      if (!this.isCreateMode) {
        const { data } = await this.$axios.get(`api/product/${this.id}`)
        this.name = data.name
        this.description = data.description
        this.price = data.price
        this.category = this.categories.find((v) => v === data.category_id)
        // const response = await this.$axios.get(`file/product/${this.id}/avatar`)
        // this.image = new File(image, )
        // this.$refs.uploader.addFiles(image)
      }
    },
    onImageAdded (image) {
      this.image = image[0]
    },
    async submit () {
      const formData = new FormData()
      appendIfDefined(formData, 'name', this.name)
      appendIfDefined(formData, 'description', this.description)
      appendIfDefined(formData, 'price', this.price)
      appendIfDefined(formData, 'categoryId', this.category?.id)
      appendIfDefined(formData, 'avatar', this.image)
      appendIfDefined(
        formData,
        'propsJson',
        typeof this.propsJson === 'string' ? this.propsJson : JSON.stringify(this.propsJson)
      )

      try {
        this.setError({})
        if (this.isCreateMode) {
          await this.$axios.post('api/admin/product', formData)
        } else {
          await this.$axios.put(`api/admin/product/${this.id}`, formData)
        }
        this.$q.dialog({ message: this.isCreateMode ? 'Товар успешно создан' : 'Товар успешно изменён' })
          .onDismiss(() => {
            this.$router.back()
          })
      } catch ({ response: { status, data } }) {
        if (status === 400) this.setError(data)
      }
    }
  },
  watch: {
    id () {
      this.fetch()
    }
  },
  async mounted () {
    const { data } = await this.$axios.get('api/category')
    this.categories = data
    await this.fetch()
  }
}

function appendIfDefined (formData, name, value, fileName) {
  if (value) {
    if (arguments.length === 3) formData.append(name, value)
    else formData.append(name, value, fileName)
  }
}
</script>
