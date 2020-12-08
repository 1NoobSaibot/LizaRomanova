export function count (state) {
  return state.items?.length || 0
}

export function total (state) {
  const cart = state.items || []
  let res = 0
  for (let i = 0; i < cart.length; i++) {
    res += cart[i].price * cart[i].amount
  }
  return res
}
