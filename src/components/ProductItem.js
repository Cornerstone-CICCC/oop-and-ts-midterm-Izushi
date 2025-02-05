import { Component } from "../common/Component.js";

export class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = { isFavorite: false };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleAddToFavorites = this.handleAddToFavorites.bind(this);
    this.handleToggleFavorite = this.handleToggleFavorite.bind(this);
    this.notyf = new Notyf({
      position: {
        x: 'center',
        y: 'top',
      },
    });
  }

  handleAddToCart() {
    this.props.cartContext.addProduct(this.props.product);
    this.notyf.success('Product added to cart!');
  }

  handleToggleFavorite() {
    const isFavorite = this.state.isFavorite;
    if (isFavorite) {
      this.props.favoriteContext.removeFavorite(this.props.product);
    } else {
      this.props.favoriteContext.addFavorite(this.props.product);
    }
    this.state.isFavorite = !isFavorite;
    this.updateFavoriteIcon();
  }

  updateFavoriteIcon() {
    const favoriteIcon = this.productElement.querySelector('.favorite-icon');
    favoriteIcon.className = this.state.isFavorite ? 'fa-solid fa-heart favorite-icon' : 'fa-regular fa-heart favorite-icon';
  }

  handleAddToFavorites() {
    this.props.favoriteContext.addFavorite(this.props.product);
  }

  truncateTitle(title, maxLength) {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + '...';
    }
    return title;
  }

  render() {
    const product = document.createElement('div');
    product.className = "product-item";
    const truncatedTitle = this.truncateTitle(this.props.product.title, 30);
    product.innerHTML = `
      <img src="${this.props.product.image}" alt="${this.props.product.title}">
      <h3 class="product-title">${truncatedTitle}</h3>
      <div class="price-container">
        <p class="product-price">CA$${parseFloat(this.props.product.price).toFixed(2)}</p>
        <i class="fa-regular fa-heart favorite-icon"></i>
      </div>
      <button class="add-cart-btn"><i class="fa-solid fa-cart-plus"></i>Add to Cart</button>
    `;

    product.querySelector('.add-cart-btn').addEventListener('click', this.handleAddToCart);
    product.querySelector('.favorite-icon').addEventListener('click', this.handleToggleFavorite);

    this.productElement = product;

    return product
  }
}