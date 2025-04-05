let cart = JSON.parse(localStorage.getItem("cart")) || []

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart))
}

function updateCartCount() {
  const cartCountElements = document.querySelectorAll("#cart-count")
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0)

  cartCountElements.forEach((element) => {
    element.textContent = itemCount
  })
}

function calculateTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0)
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId)
  saveCart()
  displayCart()
  updateCartCount()
}

function clearCart() {
  cart = []
  saveCart()
  updateCartCount()
}

function displayCart() {
  const cartItemsContainer = document.getElementById("cart-items")
  const cartSummary = document.getElementById("cart-summary")

  if (!cartItemsContainer || !cartSummary) return

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <p>Your selection is empty.</p>
        <a href="products.html" class="btn">Browse Collection</a>
      </div>
    `
    cartSummary.classList.add("hidden")
    return
  }

  cartSummary.classList.remove("hidden")
  cartItemsContainer.innerHTML = ""

  cart.forEach((item) => {
    const cartItem = document.createElement("div")
    cartItem.className = "cart-item"
    cartItem.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p class="cart-item-price">${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
      </div>
      <button class="cart-item-remove" data-id="${item.id}">✕</button>
    `
    cartItemsContainer.appendChild(cartItem)
  })

  document.querySelectorAll(".cart-item-remove").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = parseInt(this.getAttribute("data-id"))
      removeFromCart(productId)
    })
  })

  const total = calculateTotal()
  cartSummary.innerHTML = `
    <div class="cart-total">
      <span>Total</span>
      <span>$${total}</span>
    </div>
    <p>Shipping and taxes will be calculated at checkout.</p>
    <div class="cart-actions">
      <a href="products.html" class="btn btn-secondary">Continue Shopping</a>
      <a href="success.html" class="btn" id="checkout-btn">Complete Purchase</a>
    </div>
  `

  document.getElementById("checkout-btn").addEventListener("click", (e) => {
    if (!isLoggedIn()) {
      e.preventDefault()
      alert("Please log in to complete your purchase.")
      window.location.href = "login.html"
    }
  })
}

