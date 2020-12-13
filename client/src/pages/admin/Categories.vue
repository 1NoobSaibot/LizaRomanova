<template>
  <q-page class="q-pa-md">
    <div class="row q-mb-md">
      <div class="text-h6">Категории</div>
      <q-space/>
      <q-btn title="Добавить категорию" dense icon="add" color="primary" @click="add"/>
    </div>
    <q-table
      :data="categories"
      :columns="columns"
      row-key="name"
    >
      <template #body-cell-actions="{ row }">
        <q-td class="text-center" style="width: 60px">
          <q-btn outline dense
            title="Изменить" icon="edit"
            @click="edit(row)"
          />
          <q-btn outline dense
            title="Изменить" icon="remove"
            @click="remove(row)"
          />
        </q-td>
      </template>
    </q-table>
    <category-form v-model="category" :show="showForm"
      @hide="showForm = false"
      @accept="fetch"
    />
  </q-page>
</template>

<script>
import CategoryForm from 'components/CategoryForm.vue'

export default {
  components: { CategoryForm },
  data: () => ({
    categories: [],
    category: {},
    showForm: false,
    columns: [
      {
        name: 'id',
        label: 'ID',
        field: 'id',
        align: 'left',
        sortable: true
      }, {
        name: 'name',
        label: 'Название',
        field: 'name',
        align: 'left',
        sortable: true
      }, {
        name: 'createdAt',
        label: 'Создано',
        field: 'created_at',
        sortable: true
      }, {
        name: 'updatedAt',
        label: 'Обновлено',
        field: 'updated_at',
        sortable: true
      },
      {
        name: 'actions'
      }
    ]
  }),
  methods: {
    async add () {
      this.category = {}
      this.showForm = true
    },
    async edit (category) {
      this.category = { ...category }
      this.showForm = true
    },
    async fetch () {
      const { data } = await this.$axios.get('api/category')
      this.categories = data
    },
    async remove (category) {
      this.$q.dialog({
        message: `Вы уверены, что хотите удалить категорию "${category.name}"`,
        cancel: true
      }).onOk(async () => {
        await this.$axios.delete(`api/admin/category/${category.id}`)
        await this.fetch()
      })
    }
  },
  async mounted () {
    await this.fetch()
  }
}
</script>
