import { Component } from "../common/Component.js";
import { CartItem } from "./CartItem.js";

export class CartList extends Component {
  constructor(props) {
    super(props);
    this.state = { cart: [] };
    this.updateCart = this.updateCart.bind(this);
    this.props.cartContext.subscribe(this.updateCart);
    this.productListElement = null;
    this.cartTotalElement = null;
    this.cartModal = null;
  }

  updateCart(cart) {
    this.state.cart = cart;
    this.productListElement.innerHTML = '';

    if (this.state.cart.length === 0) {
      this.cartModal.style.display = 'none';
      return;
    }

    this.state.cart.forEach(item => {
      const cartItem = new CartItem({
        product: item,
        cartContext: this.props.cartContext
      })
      this.productListElement.appendChild(cartItem.render())
    });

    const total = this.state.cart.reduce((sum, item) => (
      sum + item.price * item.quantity
    ), 0);

    this.cartTotalElement.innerHTML = `<span class="total">Total</span> CA$${total.toFixed(2)}`;
  }

  render() {
    const cartModal = document.createElement('div');
    cartModal.className = 'cart-modal';
    cartModal.innerHTML = `
      <div class="cart-modal-content">
        <span class="close-btn">&times;</span>
        <h2>Cart</h2>
        <div class="cart-list"></div>
        <div class="cart-total"></div>
        <button class="checkout-btn">Checkout</button>
      </div>
    `;

    this.productListElement = cartModal.querySelector('.cart-list');
    this.cartTotalElement = cartModal.querySelector('.cart-total');
    this.cartModal = cartModal;

    cartModal.querySelector('.close-btn').addEventListener('click', () => {
      cartModal.style.display = 'none';
    });
    return cartModal;
  }
}