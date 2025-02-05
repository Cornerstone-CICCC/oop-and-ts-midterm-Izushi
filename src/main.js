import { App } from "./components/App.js";
import { CartContext } from "./contexts/CartContext.js";
import { FavoriteContext } from "./contexts/FavoriteContext.js";

const root = document.querySelector('#app')

const cartContext = new CartContext()
const favoriteContext = new FavoriteContext()
const app = new App({ cartContext, favoriteContext })

app.mount(root)