import { Cookies } from 'quasar'
const cookieName = 'cart'

export function addProduct (state, product) {
  const cart = state.items

  let found = false
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === product.id) {
      found = true
      cart[i].amount += product.amount
    }
  }
  if (!found) {
    cart.push(product)
  }

  state.items = [...cart]
  Cookies.set(cookieName, cart, {
    path: '/'
  })
}

export function clear (state) {
  state.items = []
  Cookies.remove(cookieName)
}

export function init (state) {
  const cart = Cookies.get(cookieName) || []
  state.items = cart
}

export function setAmount (state, { id, amount }) {
  const cart = state.items

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart[i].amount = amount
      state.items = [...cart]
      Cookies.set(cookieName, cart, {
        path: '/'
      })
      return
    }
  }
}

export function removeProduct (state, productId) {
  const cart = state.items
  const newCart = []

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id !== productId) newCart.push(cart[i])
  }

  state.items = newCart
  Cookies.set(cookieName, newCart, {
    path: '/'
  })
}
