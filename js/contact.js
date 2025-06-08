document.addEventListener("DOMContentLoaded", () => {
  // Contact Form Handling
  const contactForm = document.getElementById("contactForm")
  const submitBtn = contactForm.querySelector(".submit-btn")

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    // Show loading state
    submitBtn.classList.add("loading")

    // Get form data
    const formData = new FormData(contactForm)
    const data = Object.fromEntries(formData)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Show success message
      showSuccessMessage()

      // Reset form
      contactForm.reset()
    } catch (error) {
      console.error("Form submission error:", error)
      alert("Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.")
    } finally {
      // Hide loading state
      submitBtn.classList.remove("loading")
    }
  })

  function showSuccessMessage() {
    // Create success message element
    const successMessage = document.createElement("div")
    successMessage.className = "success-message show"
    successMessage.innerHTML = `
      <i class="fas fa-check-circle"></i>
      Mesajınız uğurla göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq.
    `

    // Insert before form
    contactForm.parentNode.insertBefore(successMessage, contactForm)

    // Remove after 5 seconds
    setTimeout(() => {
      successMessage.remove()
    }, 5000)
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active")

      // Close all FAQ items
      faqItems.forEach((faqItem) => {
        faqItem.classList.remove("active")
      })

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add("active")
      }
    })
  })

  // Form Validation
  const requiredFields = contactForm.querySelectorAll("[required]")

  requiredFields.forEach((field) => {
    field.addEventListener("blur", validateField)
    field.addEventListener("input", clearFieldError)
  })

  function validateField(e) {
    const field = e.target
    const value = field.value.trim()

    // Remove existing error
    clearFieldError(e)

    if (!value) {
      showFieldError(field, "Bu sahə mütləqdir")
      return false
    }

    // Email validation
    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        showFieldError(field, "Düzgün e-poçt ünvanı daxil edin")
        return false
      }
    }

    return true
  }

  function showFieldError(field, message) {
    field.style.borderColor = "#d63031"

    // Create error message
    const errorDiv = document.createElement("div")
    errorDiv.className = "field-error"
    errorDiv.style.color = "#d63031"
    errorDiv.style.fontSize = "0.875rem"
    errorDiv.style.marginTop = "0.25rem"
    errorDiv.textContent = message

    field.parentNode.appendChild(errorDiv)
  }

  function clearFieldError(e) {
    const field = e.target
    field.style.borderColor = "#e1e5e9"

    const errorDiv = field.parentNode.querySelector(".field-error")
    if (errorDiv) {
      errorDiv.remove()
    }
  }

  // Phone number formatting
  const phoneField = document.getElementById("phone")
  if (phoneField) {
    phoneField.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "")
      if (value.length > 0) {
        if (value.startsWith("994")) {
          value = "+" + value
        } else if (!value.startsWith("+")) {
          value = "+994" + value
        }
      }
      e.target.value = value
    })
  }
})
