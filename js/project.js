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
