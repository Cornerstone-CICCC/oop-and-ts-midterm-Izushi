import { Component } from "../common/Component.js";

export class FavoriteItem extends Component {
  constructor(props) {
    super(props);
    this.state = { product: props.product };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.notyf = new Notyf({
      position: {
        x: 'center',
        y: 'top',
      },
    });
  }

  handleAddToCart() {
    this.props.cartContext.addProduct(this.state.product);
    this.notyf.success('Product added to cart!');
  }

  render() {
    const favoriteItem = document.createElement('div');
    favoriteItem.className = "favorite-item"
    favoriteItem.innerHTML = `
      <img src="${this.state.product.image}" alt="${this.state.product.title}">
      <div class="favorite-item-info">
        <h3 class="favorite-title">${this.state.product.title}</h3>
      </div>
      <p class="favorite-price">CA$${parseFloat(this.state.product.price).toFixed(2)}</p>
      <button class="add-cart-btn"><i class="fa-solid fa-cart-plus"></i>Add to Cart</button>
    `;

    favoriteItem.querySelector('.add-cart-btn').addEventListener('click', this.handleAddToCart);

    return favoriteItem;
  }
}