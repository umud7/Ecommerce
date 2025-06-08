// Cart Management Class
class CartManager {
  constructor() {
    this.cart = this.getCartFromStorage()
    this.updateCartCount()
    this.renderCart()
  }

  getCartFromStorage() {
    const cart = localStorage.getItem("cart")
    return cart ? JSON.parse(cart) : []
  }

  saveCartToStorage() {
    localStorage.setItem("cart", JSON.stringify(this.cart))
  }

  updateCartCount() {
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0)
    const cartCountElement = document.querySelector(".cart-count")
    if (cartCountElement) {
      cartCountElement.textContent = totalItems
    }
  }

  updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
      this.removeFromCart(productId)
      return
    }

    const item = this.cart.find((item) => item.id === productId)
    if (item) {
      item.quantity = newQuantity
      this.saveCartToStorage()
      this.updateCartCount()
      this.renderCart()
      this.showToast("Məhsul miqdarı yeniləndi!")
    }
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter((item) => item.id !== productId)
    this.saveCartToStorage()
    this.updateCartCount()
    this.renderCart()
    this.showToast("Məhsul səbətdən silindi!", "warning")
  }

  calculateTotals() {
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = subtotal > 500 ? 0 : subtotal > 0 ? 25 : 0
    const total = subtotal + shipping

    return { totalItems, subtotal, shipping, total }
  }

  renderCart() {
    const cartItemsContainer = document.getElementById("cartItems")
    const emptyCartContainer = document.getElementById("emptyCart")

    if (this.cart.length === 0) {
      cartItemsContainer.style.display = "none"
      document.querySelector(".cart-summary").style.display = "none"
      emptyCartContainer.style.display = "block"
      return
    }

    cartItemsContainer.style.display = "flex"
    document.querySelector(".cart-summary").style.display = "block"
    emptyCartContainer.style.display = "none"

    cartItemsContainer.innerHTML = this.cart
      .map(
        (item) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}" class="item-image">
                <div class="item-details">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <div class="item-price">${item.price} ₼</div>
                </div>
                <div class="item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity - 1})" ${item.quantity <= 1 ? "disabled" : ""}>
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity + 1})">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button class="remove-btn" onclick="cartManager.removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i> Sil
                    </button>
                </div>
            </div>
        `,
      )
      .join("")

    this.updateSummary()
  }

  updateSummary() {
    const { totalItems, subtotal, shipping, total } = this.calculateTotals()

    document.getElementById("totalItems").textContent = totalItems
    document.getElementById("subtotal").textContent = `${subtotal} ₼`
    document.getElementById("shipping").textContent = shipping === 0 ? "Pulsuz" : `${shipping} ₼`
    document.getElementById("total").textContent = `${total} ₼`

    const checkoutBtn = document.getElementById("checkoutBtn")
    checkoutBtn.disabled = this.cart.length === 0
  }

  showToast(message, type = "success") {
    const toast = document.getElementById("toast")
    const toastMessage = document.getElementById("toastMessage")

    toastMessage.textContent = message

    // Change toast color based on type
    if (type === "warning") {
      toast.style.background = "#ff6b6b"
    } else {
      toast.style.background = "#2ed573"
    }

    toast.classList.add("show")

    setTimeout(() => {
      toast.classList.remove("show")
    }, 3000)
  }

  /*
checkout() {
  if (this.cart.length === 0) return

  const { total } = this.calculateTotals()
  alert(`Sifariş tamamlandı!\nÜmumi məbləğ: ${total} ₼\n\nTəşəkkür edirik!`)

  // Clear cart after checkout
  this.cart = []
  this.saveCartToStorage()
  this.updateCartCount()
  this.renderCart()
}
*/
}

// Initialize Cart Manager
const cartManager = new CartManager()

// Checkout button event listener
document.addEventListener("DOMContentLoaded", () => {
  const checkoutBtn = document.getElementById("checkoutBtn")
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cartManager.cart.length === 0) {
        alert("Səbətiniz boşdur!")
        return
      }

      // Checkout səhifəsinə yönləndir
      window.location.href = "checkout.html"
    })
  }
})
