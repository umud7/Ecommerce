document.addEventListener("DOMContentLoaded", () => {
  // Search functionality
  const searchInput = document.getElementById("blog-search")
  const searchBtn = document.getElementById("search-btn")
  const blogPosts = document.querySelectorAll(".blog-post, .featured-post")

  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim()

    if (searchTerm === "") {
      // Show all posts
      blogPosts.forEach((post) => {
        post.style.display = "block"
      })
      removeSearchResults()
      return
    }

    let foundPosts = 0

    blogPosts.forEach((post) => {
      const title = post.querySelector("h2, h3").textContent.toLowerCase()
      const content = post.querySelector("p").textContent.toLowerCase()

      if (title.includes(searchTerm) || content.includes(searchTerm)) {
        post.style.display = "block"
        foundPosts++
      } else {
        post.style.display = "none"
      }
    })

    showSearchResults(searchTerm, foundPosts)
  }

  function showSearchResults(term, count) {
    removeSearchResults()

    const resultsDiv = document.createElement("div")
    resultsDiv.className = "search-results"
    resultsDiv.innerHTML = `
      <i class="fas fa-search"></i>
      "${term}" üçün axtarış nəticələri: ${count} məqalə tapıldı
    `

    const blogMain = document.querySelector(".blog-main")
    blogMain.insertBefore(resultsDiv, blogMain.firstChild)
  }

  function removeSearchResults() {
    const existingResults = document.querySelector(".search-results")
    if (existingResults) {
      existingResults.remove()
    }
  }

  searchBtn.addEventListener("click", performSearch)
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch()
    }
  })

  // Category filtering
  const categoryLinks = document.querySelectorAll(".categories a")

  categoryLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()

      // Remove active class from all categories
      categoryLinks.forEach((cat) => cat.classList.remove("active"))
      link.classList.add("active")

      const category = link.dataset.category

      if (category === "all") {
        blogPosts.forEach((post) => {
          post.style.display = "block"
        })
      } else {
        blogPosts.forEach((post) => {
          const postCategory = post.querySelector(".post-category").textContent.toLowerCase()
          if (postCategory.includes(category)) {
            post.style.display = "block"
          } else {
            post.style.display = "none"
          }
        })
      }

      // Scroll to blog posts
      document.querySelector(".blog-posts").scrollIntoView({
        behavior: "smooth",
      })
    })
  })

  // Newsletter form
  const newsletterForm = document.querySelector(".newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const email = newsletterForm.querySelector("input").value

      if (email) {
        // Simulate API call
        const submitBtn = newsletterForm.querySelector("button")
        const originalText = submitBtn.textContent
        submitBtn.textContent = "Göndərilir..."
        submitBtn.disabled = true

        setTimeout(() => {
          alert("Təşəkkür edirik! Newsletter abunəliyiniz qeydə alındı.")
          newsletterForm.reset()
          submitBtn.textContent = originalText
          submitBtn.disabled = false
        }, 1500)
      }
    })
  }

  // Tag filtering
  const tags = document.querySelectorAll(".tag")

  tags.forEach((tag) => {
    tag.addEventListener("click", (e) => {
      e.preventDefault()
      const tagText = tag.textContent.toLowerCase()

      // Remove active class from all tags
      tags.forEach((t) => t.classList.remove("active"))
      tag.classList.add("active")

      // Filter posts by tag
      blogPosts.forEach((post) => {
        const title = post.querySelector("h2, h3").textContent.toLowerCase()
        const content = post.querySelector("p").textContent.toLowerCase()

        if (title.includes(tagText) || content.includes(tagText)) {
          post.style.display = "block"
        } else {
          post.style.display = "none"
        }
      })

      // Show search results
      const visiblePosts = Array.from(blogPosts).filter((post) => post.style.display !== "none").length
      showSearchResults(tagText, visiblePosts)

      // Scroll to blog posts
      document.querySelector(".blog-posts").scrollIntoView({
        behavior: "smooth",
      })
    })
  })

  // Pagination
  const paginationBtns = document.querySelectorAll(".pagination-btn")

  paginationBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      paginationBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      // Show loading animation
      const blogMain = document.querySelector(".blog-main")
      const loadingDiv = document.createElement("div")
      loadingDiv.className = "loading"
      loadingDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'

      blogMain.appendChild(loadingDiv)

      // Simulate loading new posts
      setTimeout(() => {
        loadingDiv.remove()
        // Scroll to top of blog posts
        document.querySelector(".featured-post").scrollIntoView({
          behavior: "smooth",
        })
      }, 1000)
    })
  })

  // Smooth scroll for read more links
  const readMoreLinks = document.querySelectorAll(".read-more")

  readMoreLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Add a subtle animation before navigation
      e.target.style.transform = "scale(0.95)"
      setTimeout(() => {
        e.target.style.transform = "scale(1)"
      }, 150)
    })
  })

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe blog posts for scroll animations
  blogPosts.forEach((post) => {
    post.style.opacity = "0"
    post.style.transform = "translateY(30px)"
    post.style.transition = "all 0.6s ease"
    observer.observe(post)
  })

  // Sidebar widgets animation
  const sidebarWidgets = document.querySelectorAll(".sidebar-widget")
  sidebarWidgets.forEach((widget, index) => {
    widget.style.opacity = "0"
    widget.style.transform = "translateX(30px)"
    widget.style.transition = "all 0.6s ease"
    widget.style.transitionDelay = `${index * 0.1}s`

    setTimeout(
      () => {
        widget.style.opacity = "1"
        widget.style.transform = "translateX(0)"
      },
      500 + index * 100,
    )
  })
})
