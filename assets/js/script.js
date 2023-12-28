/** 
Author:    Build Rise Shine with Nyros (BRS) 
Created:   2023
Library / Component: Script file
Description: Landing page
(c) Copyright by BRS with Nyros. 
**/

// Default theme
let chathams_blue = "#1A4B84";
const purchaseBtn = document.getElementById("purchase")
purchaseBtn.style.display = "none"

// check loading
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// ready state
function ready() {
  const removeCartItemButton = document.getElementsByClassName("btn-danger");
  for (let i = 0; i < removeCartItemButton.length; i++) {
    const button = removeCartItemButton[i];
    button.addEventListener("click", removeCartItem);
  }

  const quantityInputs = document.getElementsByClassName("cart-quantity-input");
  // console.log(quantityInputs.length);
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  const addToCartBtn = document.getElementsByClassName("shop-item-button");
  for (let i = 0; i < addToCartBtn.length; i++) {
    let button = addToCartBtn[i];
    button.addEventListener("click", addToCart);
  }

  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", purchaseClicked);
}

// Purchase button click
function purchaseClicked() {
  alert("order placed successfully.");
  const cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
  purchaseBtn.style.display = 'none'
}

// Add to cart functionality
function addToCart(e) {
  purchaseBtn.style.display = 'block'
  let button = e.target;
  const shopItem = button.parentElement.parentElement;
  const title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  const price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  const imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
  // console.log(title, price, imageSrc);
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

// Table that builds the added cart items
function addItemToCart(title, price, image) {
  const cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  const cartItems = document.getElementsByClassName("cart-items")[0];
  const cartItemNames = document.getElementsByClassName("cart-item-title");
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText === title) {
      alert("Item already added to cart");
      return;
    }
  }
  const cartRowContent = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src=${image} width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>
    `;
  cartRow.innerHTML = cartRowContent;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}

// When quantity is changed - update the total
function quantityChanged(e) {
  console.log(e);
  let input = e.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

// Remove cart items
function removeCartItem(e) {
  const buttonClicked = e.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
  // logic to remove purchase btn
  const items = document.getElementsByClassName("cart-row")
  console.log(items);
  console.log(items.length);
  if(items.length === 1){
    purchaseBtn.style.display = 'none'
  }
}

// Function that handles the cart total updation
const updateCartTotal = () => {
  let cartTotal = 0;
  const cartItemContainer = document.getElementsByClassName("cart-items")[0];
  const cartRows = cartItemContainer.getElementsByClassName("cart-row");
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    const priceElement = cartRow.getElementsByClassName("cart-price")[0];
    const quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    const price = parseFloat(priceElement.innerText.replace("₹", ""));
    const quantity = quantityElement.value;
    cartTotal = cartTotal + price * quantity;
  }
  cartTotal = Math.round(cartTotal * 100) / 100;
  document.getElementsByClassName(
    "cart-total-price"
  )[0].innerText = `₹ ${cartTotal}`;
};

// Set theme
function setTheme(theme) {
  document.documentElement.style.setProperty("--primary-color", theme);
  localStorage.setItem("movie-theme", theme);
}
setTheme(localStorage.getItem("movie-theme") || chathams_blue);
