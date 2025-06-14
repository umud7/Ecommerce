document.addEventListener("DOMContentLoaded", () => {

  // Pagination (basic implementation)
  const paginationBtns = document.querySelectorAll(".pagination-btn")

  paginationBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      paginationBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      // Scroll to top of projects section
      document.querySelector(".projects-section").scrollIntoView({
        behavior: "smooth",
      })
    })
  })


  
})



document.addEventListener("DOMContentLoaded", () => {
  // Animate cards on page load
  const cards = document.querySelectorAll(".category-card")

  // Add staggered animation
  cards.forEach((card, index) => {
    const delay = Number.parseInt(card.dataset.delay) || 0

    setTimeout(() => {
      card.classList.add("animate-in")
    }, delay)
  })

  // Add intersection observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const card = entry.target
        const delay = Number.parseInt(card.dataset.delay) || 0

        setTimeout(() => {
          card.classList.add("animate-in")
        }, delay)

        observer.unobserve(card)
      }
    })
  }, observerOptions)

  // Observe all cards
  cards.forEach((card) => {
    observer.observe(card)
  })

  // Add hover sound effect (optional)
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      // You can add sound effects here if needed
      // const audio = new Audio('hover-sound.mp3');
      // audio.volume = 0.1;
      // audio.play();
    })
  })

  

  // Add keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      // Add focus styles for accessibility
      const focusedElement = document.activeElement
      if (focusedElement.classList.contains("category-link")) {
        focusedElement.style.outline = "2px solid #8b5cf6"
        focusedElement.style.outlineOffset = "2px"
      }
    }
  })

  // Remove focus styles on blur
  document.addEventListener("focusout", (e) => {
    if (e.target.classList.contains("category-link")) {
      e.target.style.outline = ""
      e.target.style.outlineOffset = ""
    }
  })

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Performance optimization: Reduce animations on low-end devices
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.body.classList.add("reduced-motion")
  }

  // Add reduced motion CSS
  const style = document.createElement("style")
  style.textContent = `
        .reduced-motion * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `
  document.head.appendChild(style)
})

// Add resize handler for responsive adjustments
window.addEventListener("resize", () => {
  // Adjust animations based on screen size
  const isMobile = window.innerWidth < 768
  const cards = document.querySelectorAll(".category-card")

  cards.forEach((card) => {
    if (isMobile) {
      card.style.animationDuration = "0.4s"
    } else {
      card.style.animationDuration = "0.6s"
    }
  })
})

// Add preload for better performance
window.addEventListener("load", () => {
  // Preload hover states
  const cards = document.querySelectorAll(".category-card")
  cards.forEach((card) => {
    const computedStyle = window.getComputedStyle(card)
    // This triggers the browser to calculate hover styles
  })
})
