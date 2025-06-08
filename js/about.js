document.addEventListener("DOMContentLoaded", () => {
  // Skill bars animation
  const skillBars = document.querySelectorAll(".skill-progress")

  const animateSkillBars = () => {
    skillBars.forEach((bar) => {
      const width = bar.dataset.width
      bar.style.width = width
    })
  }

  // Intersection Observer for skill bars
  const skillsSection = document.querySelector(".skills")
  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkillBars()
          skillsObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  if (skillsSection) {
    skillsObserver.observe(skillsSection)
  }

  // Floating elements animation
  const floatingElements = document.querySelectorAll(".floating-element")

  floatingElements.forEach((element, index) => {
    element.addEventListener("mouseenter", () => {
      element.style.transform = "scale(1.2) translateY(-10px)"
    })

    element.addEventListener("mouseleave", () => {
      element.style.transform = "scale(1) translateY(0)"
    })
  })

  // Timeline animation
  const timelineItems = document.querySelectorAll(".timeline-item")

  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    { threshold: 0.3 },
  )

  timelineItems.forEach((item) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(50px)"
    item.style.transition = "all 0.6s ease"
    timelineObserver.observe(item)
  })
})
