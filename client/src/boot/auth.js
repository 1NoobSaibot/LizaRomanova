export default async ({ app, router, Vue, store, urlPath, redirect }) => {
  store.dispatch('admin/check')
}
