import { Component } from "../common/Component.js";
import { ProductList } from "./ProductList.js";
import { ProductDetail } from "./ProductDetail.js";
import { CartList } from "./CartList.js";
import { Header } from "./Header.js";
import { FavoriteList } from "./FavoriteList.js";
import { Footer } from "./Footer.js";

export class App extends Component {
  render() {
    const appContainer = document.createElement('div');
    appContainer.className = "container";

    appContainer.innerHTML = `
        <header></header>
        <div class="wrapper">
          <main>
          </main>
        </div>
        <footer></footer>
      `;

    const header = new Header({
      cartContext: this.props.cartContext,
      favoriteContext: this.props.favoriteContext
    });
    appContainer.querySelector('header').appendChild(header.render());

    const productList = new ProductList({
      cartContext: this.props.cartContext,
      favoriteContext: this.props.favoriteContext
    });

    const cartList = new CartList({
      cartContext: this.props.cartContext
    }).render();

    const favoriteList = new FavoriteList({
      cartContext: this.props.cartContext,
      favoriteContext: this.props.favoriteContext
    }).render();

    const footer = new Footer().render();

    appContainer.appendChild(cartList);
    appContainer.appendChild(favoriteList);
    appContainer.querySelector('footer').appendChild(footer);

    productList.mount(appContainer.querySelector('main'))

    return appContainer;
  }
}