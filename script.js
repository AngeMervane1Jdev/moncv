document.addEventListener("DOMContentLoaded", () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector(".hamburger")
    const navLinks = document.querySelector(".nav-links")
  
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active")
      hamburger.classList.toggle("active")
    })
  
    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll(".nav-links a")
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active")
          hamburger.classList.remove("active")
        }
      })
    })
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)
  
        if (targetElement) {
          const headerHeight = document.querySelector("header").offsetHeight
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight
  
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }
      })
    })
  
    // Scroll to top button
    const scrollTopBtn = document.createElement("button")
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
    scrollTopBtn.classList.add("scroll-top-btn")
    document.body.appendChild(scrollTopBtn)
  
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  
    // Show/hide scroll to top button based on scroll position
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add("show")
      } else {
        scrollTopBtn.classList.remove("show")
      }
    })
  
    // Add active class to nav links based on scroll position
    const sections = document.querySelectorAll("section")
  
    window.addEventListener("scroll", () => {
      let current = ""
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
  
        if (pageYOffset >= sectionTop - 200) {
          current = section.getAttribute("id")
        }
      })
  
      navItems.forEach((item) => {
        item.classList.remove("active")
        if (item.getAttribute("href") === `#${current}`) {
          item.classList.add("active")
        }
      })
    })
  
    // Form submission
    const contactForm = document.getElementById("contactForm")
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Get form values
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const message = document.getElementById("message").value
  
        // Simple validation
        if (!name || !email || !message) {
          showFormMessage("Please fill in all fields", "error")
          return
        }
  
        // Simulate form submission
        showFormMessage("Sending message...", "info")
  
        // Simulate API call
        setTimeout(() => {
          showFormMessage("Message sent successfully!", "success")
          contactForm.reset()
        }, 1500)
      })
    }
  
    // Function to show form messages
    function showFormMessage(message, type) {
      // Remove any existing message
      const existingMessage = document.querySelector(".form-message")
      if (existingMessage) {
        existingMessage.remove()
      }
  
      // Create new message
      const messageElement = document.createElement("div")
      messageElement.classList.add("form-message", type)
      messageElement.textContent = message
  
      // Add to DOM
      contactForm.appendChild(messageElement)
  
      // Remove success/error messages after 3 seconds
      if (type === "success" || type === "error") {
        setTimeout(() => {
          messageElement.remove()
        }, 3000)
      }
    }
  
    // Add some additional styles for the form message and scroll to top button
    const style = document.createElement("style")
    style.textContent = `
          .form-message {
              padding: 0.75rem;
              margin-top: 1rem;
              border-radius: var(--border-radius);
          }
          
          .form-message.success {
              background-color: rgba(16, 185, 129, 0.1);
              color: var(--success-color);
          }
          
          .form-message.error {
              background-color: rgba(239, 68, 68, 0.1);
              color: var(--error-color);
          }
          
          .form-message.info {
              background-color: rgba(59, 130, 246, 0.1);
              color: var(--primary-color);
          }
          
          .scroll-top-btn {
              position: fixed;
              bottom: 30px;
              right: 30px;
              width: 50px;
              height: 50px;
              border-radius: 50%;
              background-color: var(--primary-color);
              color: white;
              border: none;
              cursor: pointer;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 1.2rem;
              box-shadow: var(--shadow);
              opacity: 0;
              visibility: hidden;
              transition: var(--transition);
              z-index: 999;
          }
          
          .scroll-top-btn.show {
              opacity: 1;
              visibility: visible;
          }
          
          .scroll-top-btn:hover {
              background-color: var(--secondary-color);
              transform: translateY(-3px);
          }
          
          .nav-links a.active {
              color: var(--primary-color);
              font-weight: 600;
          }
          
          .hamburger.active span:nth-child(1) {
              transform: translateY(8px) rotate(45deg);
          }
          
          .hamburger.active span:nth-child(2) {
              opacity: 0;
          }
          
          .hamburger.active span:nth-child(3) {
              transform: translateY(-8px) rotate(-45deg);
          }
      `
    document.head.appendChild(style)
  
    // Add animation on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(".timeline-item, .project-card, .hobby, .event")
  
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight
  
        if (elementPosition < windowHeight - 100) {
          element.classList.add("animate")
        }
      })
    }
  
    // Add animation classes
    const animationStyle = document.createElement("style")
    animationStyle.textContent = `
          .timeline-item, .project-card, .hobby, .event {
              opacity: 0;
              transform: translateY(20px);
              transition: opacity 0.6s ease, transform 0.6s ease;
          }
          
          .timeline-item.animate, .project-card.animate, .hobby.animate, .event.animate {
              opacity: 1;
              transform: translateY(0);
          }
      `
    document.head.appendChild(animationStyle)
  
    // Run animation on load and scroll
    window.addEventListener("load", animateOnScroll)
    window.addEventListener("scroll", animateOnScroll)
  })
  