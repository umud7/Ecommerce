// Custom Cursor
document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".cursor")
  const cursorFollower = document.querySelector(".cursor-follower")

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"

    setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px"
      cursorFollower.style.top = e.clientY + "px"
    }, 100)
  })

  document.addEventListener("mousedown", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(0.8)"
    cursorFollower.style.transform = "translate(-50%, -50%) scale(0.8)"
  })

  document.addEventListener("mouseup", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)"
    cursorFollower.style.transform = "translate(-50%, -50%) scale(1)"
  })

  // Hover effect on links and buttons
  const links = document.querySelectorAll("a, button, .btn")
  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)"
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1.5)"
      cursorFollower.style.backgroundColor = "rgba(108, 92, 231, 0.2)"
    })

    link.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)"
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1)"
      cursorFollower.style.backgroundColor = "transparent"
    })
  })

  // Mobile Navigation
  const burger = document.querySelector(".burger")
  const nav = document.querySelector(".nav-links")

  burger.addEventListener("click", () => {
    nav.classList.toggle("active")

    // Burger Animation
    burger.classList.toggle("toggle")
    if (burger.classList.contains("toggle")) {
      burger.children[0].style.transform = "rotate(-45deg) translate(-5px, 6px)"
      burger.children[1].style.opacity = "0"
      burger.children[2].style.transform = "rotate(45deg) translate(-5px, -6px)"
    } else {
      burger.children[0].style.transform = "rotate(0) translate(0)"
      burger.children[1].style.opacity = "1"
      burger.children[2].style.transform = "rotate(0) translate(0)"
    }
  })

  // Testimonial Slider
  const testimonials = document.querySelectorAll(".testimonial")
  const dots = document.querySelectorAll(".dot")
  let currentTestimonial = 0

  function showTestimonial(index) {
    testimonials.forEach((testimonial) => testimonial.classList.remove("active"))
    dots.forEach((dot) => dot.classList.remove("active"))

    testimonials[index].classList.add("active")
    dots[index].classList.add("active")
    currentTestimonial = index
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showTestimonial(index)
    })
  })

  // Auto slide testimonials
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length
    showTestimonial(currentTestimonial)
  }, 5000)

  // Scroll Animation
  const scrollElements = document.querySelectorAll(".project-card, .feature-card")

  const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top
    return elementTop <= (window.innerHeight || document.documentElement.clientHeight) * (percentageScroll / 100)
  }

  const displayScrollElement = (element) => {
    element.classList.add("scrolled")
  }

  const hideScrollElement = (element) => {
    element.classList.remove("scrolled")
  }

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 90)) {
        displayScrollElement(el)
      } else {
        hideScrollElement(el)
      }
    })
  }

  window.addEventListener("scroll", () => {
    handleScrollAnimation()
  })

  // Newsletter Form
  const newsletterForm = document.querySelector(".newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const email = newsletterForm.querySelector("input").value

      if (email) {
        // Here you would typically send this to your backend
        alert("Təşəkkür edirik! Abunəliyiniz qeydə alındı.")
        newsletterForm.reset()
      }
    })
  }

  // Header Scroll Effect
  const header = document.querySelector("header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.style.padding = "1rem 5%"
      header.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)"
    } else {
      header.style.padding = "1.5rem 5%"
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
    }
  })
})
