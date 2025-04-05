// Display order details on success page
function displayOrderDetails() {
  const orderDetailsContainer = document.getElementById("order-details")
  if (!orderDetailsContainer) return

  // Get cart from localStorage before it's cleared
  const orderItems = JSON.parse(localStorage.getItem("cart")) || []

  if (orderItems.length === 0) {
    // If someone navigates directly to success page without items
    orderDetailsContainer.innerHTML = `
            <p>No order details available.</p>
        `
    return
  }

  let orderHtml = "<h3>Order Summary</h3>"

  orderItems.forEach((item) => {
    orderHtml += `
            <div class="order-item">
                <span>${item.name} x ${item.quantity}</span>
                <span>${item.price * item.quantity}</span>
            </div>
        `
  })

  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  orderHtml += `
        <div class="order-total">
            <span>Total</span>
            <span>${total}</span>
        </div>
    `

  // Generate a random order number
  const orderNumber = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0")

  orderHtml += `
        <p class="order-number">Order #${orderNumber}</p>
    `

  orderDetailsContainer.innerHTML = orderHtml
}

