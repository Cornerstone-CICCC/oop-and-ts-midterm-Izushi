import { Component } from "../common/Component.js";
import { FavoriteItem } from "./FavoriteItem.js";

export class FavoriteList extends Component {
  constructor(props) {
    super(props);
    this.state = { favorites: [] };
    this.updateFavorites = this.updateFavorites.bind(this);
    this.props.favoriteContext.subscribe(this.updateFavorites);
    this.favoriteListElement = null;
    this.favoriteModal = null;
  }

  updateFavorites(favorites) {
    this.state.favorites = favorites;
    if (this.favoriteListElement) {
      this.favoriteListElement.innerHTML = '';

      if (this.state.favorites.length === 0) {
        this.favoriteModal.style.display = 'none';
        return;
      }

      this.state.favorites.forEach(item => {
        const favoriteItem = new FavoriteItem({
          product: item,
          cartContext: this.props.cartContext,
          favoriteContext: this.props.favoriteContext
        });
        this.favoriteListElement.appendChild(favoriteItem.render());
      });
    }
  }

  render() {
    const favoriteModal = document.createElement('div');
    favoriteModal.className = 'favorites-modal';
    favoriteModal.innerHTML = `
      <div class="favorites-modal-content">
        <span class="close-btn">&times;</span>
        <h2>Favorites</h2>
        <div class="favorite-list"></div>
      </div>
    `;

    this.favoriteListElement = favoriteModal.querySelector('.favorite-list');
    this.favoriteModal = favoriteModal;

    favoriteModal.querySelector('.close-btn').addEventListener('click', () => {
      favoriteModal.style.display = 'none';
    });

    return favoriteModal;
  }
}