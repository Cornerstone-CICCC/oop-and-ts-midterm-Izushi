export class FavoriteContext {
  constructor() {
    this.favorites = [];
    this.listeners = [];
  }

  getFavorites() {
    return this.favorites;
  }

  addFavorite(item) {
    const found = this.favorites.find(fav => fav.id === item.id);
    if (!found) {
      this.favorites.push(item);
      console.log(this.favorites);
    }
    this.notifyListeners();
  }

  toggleFavorite(item) {
    const found = this.favorites.find(fav => fav.id === item.id);
    if (found) {
      this.removeFavorite(item);
    } else {
      this.addFavorite(item);
    }
    this.notifyListeners();
  }

  removeFavorite(item) {
    this.favorites = this.favorites.filter(fav => fav.id !== item.id);
    this.notifyListeners();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    console.log(this.listeners);
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.favorites));
  }
}