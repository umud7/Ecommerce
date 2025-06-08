// Latest Products Data
const latestProducts = [
  {
    id: 1,
    title: "iPhone 15 Pro",
    description: "Ən yeni iPhone modeli, 128GB yaddaş",
    price: 2499,
    image: "/placeholder.svg?height=250&width=280",
    category: "phone",
  },
  {
    id: 2,
    title: "Samsung Galaxy S24",
    description: "Güclü Android smartfon, 256GB",
    price: 1899,
    image: "/placeholder.svg?height=250&width=280",
    category: "phone",
  },
  {
    id: 3,
    title: "MacBook Air M3",
    description: "Yeni M3 çipi ilə güclü laptop",
    price: 3299,
    image: "/placeholder.svg?height=250&width=280",
    category: "laptop",
  },
  {
    id: 4,
    title: "AirPods Pro 3",
    description: "Aktiv səs-küy ləğvi ilə",
    price: 599,
    image: "/placeholder.svg?height=250&width=280",
    category: "accessories",
  },
  {
    id: 5,
    title: "iPad Pro 12.9",
    description: "M3 çipi ilə professional tablet",
    price: 2799,
    image: "/placeholder.svg?height=250&width=280",
    category: "tablet",
  },
  {
    id: 6,
    title: "Apple Watch Series 9",
    description: "Sağlamlıq izləmə və fitness",
    price: 899,
    image: "/placeholder.svg?height=250&width=280",
    category: "accessories",
  },
]

// Filter variables
let filteredProducts = [...latestProducts]

// Filter Functions
function applyFilters() {
  const categoryFilter = document.getElementById("categoryFilter").value
  const sortFilter = document.getElementById("sortFilter").value
  const minPrice = Number.parseFloat(document.getElementById("minPrice").value) || 0
  const maxPrice = Number.parseFloat(document.getElementById("maxPrice").value) || Number.POSITIVE_INFINITY
  const searchFilter = document.getElementById("searchFilter").value.toLowerCase()

  // Start with all products
  filteredProducts = [...latestProducts]

  // Apply category filter
  if (categoryFilter) {
    filteredProducts = filteredProducts.filter((product) => product.category === categoryFilter)
  }

  // Apply price range filter
  filteredProducts = filteredProducts.filter((product) => product.price >= minPrice && product.price <= maxPrice)

  // Apply search filter
  if (searchFilter) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(searchFilter) || product.description.toLowerCase().includes(searchFilter),
    )
  }

  // Apply sorting
  if (sortFilter) {
    switch (sortFilter) {
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case "name-az":
        filteredProducts.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "name-za":
        filteredProducts.sort((a, b) => b.title.localeCompare(a.title))
        break
    }
  }

  // Update results count
  updateResultsCount()

  // Re-render products with animation
  renderFilteredProducts()
}

function updateResultsCount() {
  const resultsCount = document.getElementById("resultsCount")
  if (resultsCount) {
    resultsCount.textContent = `${filteredProducts.length} məhsul tapıldı`
  }
}

function clearAllFilters() {
  document.getElementById("categoryFilter").value = ""
  document.getElementById("sortFilter").value = ""
  document.getElementById("minPrice").value = ""
  document.getElementById("maxPrice").value = ""
  document.getElementById("searchFilter").value = ""

  filteredProducts = [...latestProducts]
  updateResultsCount()
  renderFilteredProducts()
}

function renderFilteredProducts() {
  const productsGrid = document.getElementById("productsGrid")

  // Add fade out animation to existing products
  const existingCards = productsGrid.querySelectorAll(".product-card")
  existingCards.forEach((card) => {
    card.classList.add("filtered-out")
  })

  // Wait for animation then update content
  setTimeout(() => {
    productsGrid.innerHTML = filteredProducts
      .map(
        (product) => `
          <div class="product-card filtered-in">
              <img src="${product.image}" alt="${product.title}" class="product-image">
              <div class="product-info">
                  <h3 class="product-title">${product.title}</h3>
                  <p class="product-description">${product.description}</p>
                  <div class="product-price">${product.price} ₼</div>
                  <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                      <i class="fas fa-shopping-cart"></i> Səbətə əlavə et
                  </button>
              </div>
          </div>
      `,
      )
      .join("")
  }, 150)
}

// Cart Management
class CartManager {
  constructor() {
    this.cart = this.getCartFromStorage()
    this.updateCartCount()
  }

  getCartFromStorage() {
    const cart = localStorage.getItem("cart")
    return cart ? JSON.parse(cart) : []
  }

  saveCartToStorage() {
    localStorage.setItem("cart", JSON.stringify(this.cart))
  }

  addToCart(product) {
    const existingItem = this.cart.find((item) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      this.cart.push({
        ...product,
        quantity: 1,
      })
    }

    this.saveCartToStorage()
    this.updateCartCount()
    this.showAddToCartAnimation()
    this.showToast()
  }

  updateCartCount() {
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0)
    const cartCountElement = document.querySelector(".cart-count")
    if (cartCountElement) {
      cartCountElement.textContent = totalItems
    }
  }

  showAddToCartAnimation() {
    const animation = document.getElementById("cartAnimation")
    animation.classList.add("animate")

    setTimeout(() => {
      animation.classList.remove("animate")
    }, 600)
  }

  showToast() {
    const toast = document.getElementById("toast")
    toast.classList.add("show")

    setTimeout(() => {
      toast.classList.remove("show")
    }, 3000)
  }
}

// Initialize Cart Manager
const cartManager = new CartManager()

// Render Products
function renderProducts() {
  filteredProducts = [...latestProducts]
  updateResultsCount()
  renderFilteredProducts()
}

// Add to Cart Function
function addToCart(productId) {
  const product = latestProducts.find((p) => p.id === productId)
  if (product) {
    cartManager.addToCart(product)
  }
}

// Initialize Page
document.addEventListener("DOMContentLoaded", () => {
  renderProducts()
})
