// Product data
const products = [
  {
    id: 1,
    name: "1961 Jaguar E-Type Series 1",
    price: 295000,
    description: "The epitome of automotive beauty...",
    image: "https://hymanltd.com/wp-content/uploads/2019/04/6451.jpg",
  },
  {
    id: 2,
    name: "1957 Mercedes-Benz 300SL",
    price: 1450000,
    description: "An icon of automotive design...",
    image: "https://cdn.dealeraccelerate.com/ecpch/2/985/56321/790x1024/w/1958-mercedes-benz-300sl-roadster",
  },
  {
    id: 3,
    name: "1965 Aston Martin DB5",
    price: 875000,
    description: "The quintessential British grand tourer...",
    image: "https://www.motortrend.com/uploads/sites/5/2012/11/1965-Aston-Martin-DB5-front-three-quarters.jpg?w=768&width=768&q=75&format=webp",
  },
  {
    id: 4,
    name: "1963 Ferrari 250 GT Lusso",
    price: 1950000,
    description: "One of Ferrari's most elegant grand touring cars...",
    image: "https://hagerty-vid-images.imgix.net/vehicles/Phoenix%202018_240_Ferrari_1964_250%20GT%20Lusso_Coupe_5537GT_Overall.jpeg",
  },
  {
    id: 5,
    name: "1956 Porsche 356A Speedster",
    price: 425000,
    description: "A stunning example of Porsche's iconic open-top sports car...",
    image: "https://cdn.dealeraccelerate.com/rkm/1/8320/565857/1920x1440/1957-porsche-356-speedster-replica",
  },
]

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount)
}

function addToCart(productId) {
  const product = findProduct(productId)
  if (!product) return

  let cart = JSON.parse(localStorage.getItem("cart")) || []
  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  alert(`${product.name} has been added to your selection.`)
}

function loadProducts() {
  const productGrid = document.getElementById("product-grid")
  if (!productGrid) return

  productGrid.innerHTML = ""

  products.forEach((product) => {
    const productCard = document.createElement("div")
    productCard.className = "product-card"
    productCard.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">${formatCurrency(product.price)}</p>
        <p class="product-description">${product.description}</p>
        <button class="btn add-to-cart" data-id="${product.id}">Add to Selection</button>
      </div>
    `
    productGrid.appendChild(productCard)
  })

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = parseInt(this.getAttribute("data-id"))
      addToCart(productId)
    })
  })
}

function findProduct(id) {
  return products.find((product) => product.id === id)
}

