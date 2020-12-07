import { Cookies } from 'quasar'

const cookieName = 'cart'

export function addProduct (state, product) {
  const cart = Cookies.get(cookieName) || []

  let found = false
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === product.id) {
      found = true
      cart[i].amount += product.amount
    }
  }
  if (!found) {
    cart.push({
      id: product.id,
      amount: product.amount,
      price: product.price
    })
  }

  state.count = cart.length
  state.totalPrice = calculateTotal(cart)
  Cookies.set(cookieName, cart, {
    path: '/'
  })
}

export function clear (state) {
  state.count = 0
  state.totalPrice = 0
  Cookies.remove(cookieName)
}

export function init (state) {
  const cart = Cookies.get(cookieName) || []
  state.count = cart.length
  state.totalPrice = calculateTotal(cart)
}

function calculateTotal (cart) {
  let total = 0
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].amount
  }
  return total
}
