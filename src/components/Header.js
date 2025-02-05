import { Component } from "../common/Component.js";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { cartItemCount: 0, favoriteItemCount: 0 };
    this.updateCartItemCount = this.updateCartItemCount.bind(this);
    this.updateFavoriteItemCount = this.updateFavoriteItemCount.bind(this);
    this.props.cartContext.subscribe(this.updateCartItemCount);
    this.props.favoriteContext.subscribe(this.updateFavoriteItemCount);
  }

  updateCartItemCount(cart) {
    this.state.cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartItemCountElement = document.querySelector('.cart-item-count');
    if (this.state.cartItemCount > 0) {
      cartItemCountElement.textContent = this.state.cartItemCount;
      cartItemCountElement.style.display = 'flex';
    } else {
      cartItemCountElement.style.display = 'none';
    }
  }

  updateFavoriteItemCount(favorites) {
    this.state.favoriteItemCount = favorites.length;
    const favoriteItemCountElement = document.querySelector('.favorite-item-count');
    if (this.state.favoriteItemCount > 0) {
      favoriteItemCountElement.textContent = this.state.favoriteItemCount;
      favoriteItemCountElement.style.display = 'flex';
    } else {
      favoriteItemCountElement.style.display = 'none';
    }
  }

  render() {
    const headerElement = document.createElement('div');
    headerElement.className = 'header-container';
    headerElement.innerHTML = `
      <div class="header-left">
        <div class="header-title">SHOPEASE</div>
      </div>
      <div class="header-right">
        <ul class="header-icons">
          <li class="icon-container">
            <i class="fa-solid fa-user icon"></i>
          </li>
          <li class="icon-container favorite-icon-container">
            <i class="fa-solid fa-heart icon"></i>
            <span class="favorite-item-count" style="display: none;"></span>
          </li>
          <li class="icon-container cart-icon-container">
            <i class="fas fa-shopping-cart icon"></i>
            <span class="cart-item-count" style="display: none;"></span>
          </li>
          <li class="icon-container">
            <i class="fa-solid fa-circle-info icon"></i>
          </li>
        </ul>
      </div>
    `;

    headerElement.querySelector('.cart-icon-container').addEventListener('click', () => {
      const modal = document.querySelector('.cart-modal');
      if (modal && this.state.cartItemCount > 0) {
        modal.style.display = 'block';
      }
    });

    headerElement.querySelector('.fa-heart').addEventListener('click', () => {
      const modal = document.querySelector('.favorites-modal');
      if (modal) {
        modal.style.display = 'block';
      }
    });

    return headerElement;
  }
}