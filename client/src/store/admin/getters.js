export function isAuthorized (state) {
  return !!state.admin
}

export function name (state) {
  return state.admin?.name || ''
}

export function email (state) {
  return state.admin?.email || ''
}
