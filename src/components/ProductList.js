// import { Component } from "../common/Component.js";
// import { ProductItem } from "./ProductItem.js";

// export class ProductList extends Component {
//   constructor(props) {
//     super(props)
//     this.state = { products: [] }
//   }

//   mount(container) {
//     fetch(`https://fakestoreapi.com/products`)
//       .then(response => response.json())
//       .then(data => {
//         this.state.products = data;
//         container.appendChild(this.render());
//         this.initializeSlider();
//       })
//       .catch(err => console.error(err))
//   }

//   initializeSlider() {
//     $(document).ready(function(){
//       $('.product-list').slick({
//         infinite: true,
//         slidesToShow: 4,
//         slidesToScroll: 4,
//         dots: true,
//         arrows: true,
//       });
//     });
//   }

//   render() {
//     console.log(this.state.products);
//     const productContainer = document.createElement('section');
//     productContainer.className = "product-container";

//     const category = document.createElement('h2');
//     category.textContent = "Clothing";
//     productContainer.appendChild(category);

//     const productList = document.createElement('div');
//     productList.className = "product-list";

//     this.state.products.forEach(product => {
//       const productItem = new ProductItem({
//         product,
//         cartContext: this.props.cartContext
//       })
//       productList.appendChild(productItem.render());
//     })
//     productContainer.appendChild(productList);

//     return productContainer;
//   }
// }

import { Component } from "../common/Component.js";
import { ProductItem } from "./ProductItem.js";

export class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: [] };
  }

  async fetchCategories() {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const categories = await response.json();
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  async fetchProductsByCategory(category) {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
      const products = await response.json();
      return products;
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
      return [];
    }
  }

  async mount(container) {
    const categories = await this.fetchCategories();
    this.state.categories = categories;

    const productContainer = document.createElement('section');
    productContainer.className = "product-container";

    for (const category of categories) {
      const products = await this.fetchProductsByCategory(category);
      const categoryElement = this.renderCategory(category, products);
      productContainer.appendChild(categoryElement);
    }

    container.appendChild(productContainer);
    this.initializeSliders();
  }

  initializeSliders() {
    $(document).ready(function(){
      $('.product-list').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: true,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev custom-prev-arrow">Previous</button>',
        nextArrow: '<button type="button" class="slick-next custom-next-arrow">Next</button>',
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
    });
  }

  renderCategory(category, products) {
    const categoryContainer = document.createElement('div');
    categoryContainer.className = "category-container";

    const categoryTitle = document.createElement('h2');
    categoryTitle.textContent = category;
    categoryContainer.appendChild(categoryTitle);

    const productList = document.createElement('div');
    productList.className = "product-list";

    products.forEach(product => {
      const productItem = new ProductItem({
        product,
        cartContext: this.props.cartContext,
        favoriteContext: this.props.favoriteContext
      });
      productList.appendChild(productItem.render());
    });

    categoryContainer.appendChild(productList);
    return categoryContainer;
  }

  render() {
    return document.createElement('div');
  }
}