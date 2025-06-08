// Best Sellers Products Data
const bestSellerProducts = [
  {
    id: 101,
    title: "Sony PlayStation 5",
    description: "Ən populyar oyun konsolu",
    price: 1299,
    image: "/placeholder.svg?height=250&width=280",
    salesCount: 15420,
    category: "gaming",
  },
  {
    id: 102,
    title: "Nike Air Max 270",
    description: "Ən çox satılan idman ayaqqabısı",
    price: 299,
    image: "/placeholder.svg?height=250&width=280",
    salesCount: 8750,
    category: "fashion",
  },
  {
    id: 103,
    title: 'Samsung 55" QLED TV',
    description: "4K Ultra HD Smart TV",
    price: 1899,
    image: "/placeholder.svg?height=250&width=280",
    salesCount: 6230,
    category: "electronics",
  },
  {
    id: 104,
    title: "Dyson V15 Detect",
    description: "Güclü simsiz tozsorucu",
    price: 1499,
    image: "/placeholder.svg?height=250&width=280",
    salesCount: 4890,
    category: "home",
  },
  {
    id: 105,
    title: "Canon EOS R6",
    description: "Professional fotoqraf maşını",
    price: 4299,
    image: "/placeholder.svg?height=250&width=280",
    salesCount: 3450,
    category: "camera",
  },
  {
    id: 106,
    title: "Bose QuietComfort 45",
    description: "Səs-küy ləğvi ilə qulaqlıq",
    price: 799,
    image: "/placeholder.svg?height=250&width=280",
    salesCount: 7650,
    category: "audio",
  },
]

// Filter variables
let filteredProducts = [...bestSellerProducts]

// Filter Functions
function applyFilters() {
  const categoryFilter = document.getElementById("categoryFilter").value
  const sortFilter = document.getElementById("sortFilter").value
  const minPrice = Number.parseFloat(document.getElementById("minPrice").value) || 0
  const maxPrice = Number.parseFloat(document.getElementById("maxPrice").value) || Number.POSITIVE_INFINITY
  const salesFilter = document.getElementById("salesFilter").value

  // Start with all products
  filteredProducts = [...bestSellerProducts]

  // Apply category filter
  if (categoryFilter) {
    filteredProducts = filteredProducts.filter((product) => product.category === categoryFilter)
  }

  // Apply price range filter
  filteredProducts = filteredProducts.filter((product) => product.price >= minPrice && product.price <= maxPrice)

  // Apply sales filter
  if (salesFilter) {
    switch (salesFilter) {
      case "high":
        filteredProducts = filteredProducts.filter((product) => product.salesCount >= 10000)
        break
      case "medium":
        filteredProducts = filteredProducts.filter(
          (product) => product.salesCount >= 5000 && product.salesCount < 10000,
        )
        break
      case "low":
        filteredProducts = filteredProducts.filter((product) => product.salesCount < 5000)
        break
    }
  }

  // Apply sorting
  if (sortFilter) {
    switch (sortFilter) {
      case "sales-high":
        filteredProducts.sort((a, b) => b.salesCount - a.salesCount)
        break
      case "sales-low":
        filteredProducts.sort((a, b) => a.salesCount - b.salesCount)
        break
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case "name-az":
        filteredProducts.sort((a, b) => a.title.localeCompare(b.title))
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
  document.getElementById("salesFilter").value = ""

  filteredProducts = [...bestSellerProducts]
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
              <div class="bestseller-badge">
                  <i class="fas fa-fire"></i> Bestseller
              </div>
              <img src="${product.image}" alt="${product.title}" class="product-image">
              <div class="product-info">
                  <h3 class="product-title">${product.title}</h3>
                  <p class="product-description">${product.description}</p>
                  <div class="sales-info">
                      <i class="fas fa-chart-line"></i> ${product.salesCount.toLocaleString()} satış
                  </div>
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

// Update the original renderProducts function
function renderProducts() {
  filteredProducts = [...bestSellerProducts]
  updateResultsCount()
  renderFilteredProducts()
}

// Add to Cart Function
function addToCart(productId) {
  const product = bestSellerProducts.find((p) => p.id === productId)
  if (product) {
    cartManager.addToCart(product)
  }
}

// Initialize Page
document.addEventListener("DOMContentLoaded", () => {
  renderProducts()
})
