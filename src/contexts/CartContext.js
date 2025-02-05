export class CartContext {
  constructor() {
    this.cart = [];
    this.listeners = [];
  }

  getCart() {
    return this.cart;
  }

  addProduct(item) {
    const found = this.cart.find(product => product.id === item.id)
    if (found) {
      this.cart = this.cart.map(product => {
        if (product.id === item.id) {
          return {
            ...product,
            quantity: product.quantity + 1
          }
        } else {
          return product
        }
      })
    } else {
      this.cart.push({
        ...item,
        quantity: 1
      }) // add product to cart array
    }
    this.notifyListeners()
  }

  removeProduct(item) {
    const found = this.cart.find(product => product.id === item.id)
    if (found) {
      if (found.quantity > 1) {
        this.cart = this.cart.map(product => {
          if (product.id === item.id) {
            return {
              ...product,
              quantity: product.quantity - 1
            }
          } else {
            return product
          }
        })
      } else {
        this.cart = this.cart.filter(product => product.id !== item.id)
      }
    }
    this.notifyListeners()
  }

  updateQuantity(item) {
    const found = this.cart.find(product => product.id === item.id)
    if (found) {
      this.cart = this.cart.map(product => {
        if (product.id === item.id) {
          return {
            ...product,
            quantity: item.quantity
          }
        } else {
          return product
        }
      })
    }
    this.notifyListeners()
  }

  subscribe(listener) {
    this.listeners.push(listener);
    console.log(this.listeners);
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.cart));
  }
}