import { Component } from "../common/Component.js";

export class CartItem extends Component {
  constructor(props) {
    super(props)
    this.state = { product: props.product }
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
    this.handleUpdateQuantity = this.handleUpdateQuantity.bind(this);
    this.handleDecreaseQuantity = this.handleDecreaseQuantity.bind(this);
    this.handleIncreaseQuantity = this.handleIncreaseQuantity.bind(this);
  }

  handleRemoveFromCart() {
    this.props.cartContext.removeProduct(this.state.product);
  }

  handleUpdateQuantity(newQuantity) {
    if (newQuantity > 0) {
      this.props.cartContext.updateQuantity({ ...this.state.product, quantity: newQuantity });
    }
  }

  handleDecreaseQuantity() {
    const newQuantity = this.state.product.quantity - 1;
    this.handleUpdateQuantity(newQuantity);
  }

  handleIncreaseQuantity() {
    const newQuantity = this.state.product.quantity + 1;
    this.handleUpdateQuantity(newQuantity);
  }

  render() {
    const cartItem = document.createElement('div');
    cartItem.className = "cart-item"
    cartItem.innerHTML = `
      <img src="${this.state.product.image}" alt="${this.state.product.title}">
      <div class="cart-item-info">
        <h3 class="cart-title">${this.state.product.title}</h3>
      </div>
      <p class="cart-price">CA$${parseFloat(this.state.product.price).toFixed(2)}</p>
      <div class="quantity-control">
        <button class="decrease-quantity">-</button>
        <input type="number" value="${this.state.product.quantity}" min="1" readonly>
        <button class="increase-quantity">+</button>
      </div>
      <button class="remove-cart-btn"><i class="fa-solid fa-trash"></i></button>
    `;

    cartItem.querySelector('.remove-cart-btn').addEventListener('click', this.handleRemoveFromCart);
    cartItem.querySelector('.decrease-quantity').addEventListener('click', this.handleDecreaseQuantity);
    cartItem.querySelector('.increase-quantity').addEventListener('click', this.handleIncreaseQuantity);

    return cartItem;
  }
}