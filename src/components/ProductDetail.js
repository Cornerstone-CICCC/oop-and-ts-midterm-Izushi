import { Component } from "../common/Component.js";

export class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { product: null };
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  mount(container) {
    fetch(`https://fakestoreapi.com/products/${this.props.productId}`)
      .then(response => response.json())
      .then(data => {
        this.state.product = data;
        container.appendChild(this.render());
      })
      .catch(err => console.error(err));
  }

  handleAddToCart() {
    if (!this.props.cartContext) {
      console.error('Cart context is not defined!');
    } else {
      this.props.cartContext.addProduct(this.props.product);
    }
  }

  render() {
    const productDetail = document.createElement('div');
    productDetail.className = "product-detail";

    if (this.state.product) {
      productDetail.innerHTML = `
        <img src="${this.state.product.image}" alt="${this.state.product.title}">
        <h1 class="title">${this.state.product.title}</h1>
        <p class="price">CA$${parseFloat(this.state.product.price).toFixed(2)}</p>
        <p class="description">${this.state.product.description}</p>
        <button class="add-cart-btn">Add to Cart</button>
      `;

      productDetail.querySelector('.add-cart-btn').addEventListener('click', this.handleAddToCart);
    }

    return productDetail;
  }
}