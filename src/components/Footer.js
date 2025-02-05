import { Component } from "../common/Component.js";

export class Footer extends Component {
  render() {
    const footerElement = document.createElement('footer');
    footerElement.className = 'footer';
    footerElement.innerHTML = `
      <div class="footer-content">
        <p>&copy; 2025 SHOPEASE. All rights reserved.</p>
      </div>
    `;
    return footerElement;
  }
}