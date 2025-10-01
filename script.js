// Smooth scroll for navigation links
document.querySelectorAll("nav a").forEach((anchor) => {
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

// Active navigation state on scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll("nav a")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active")
    }
  })
})

// Scroll to top functionality
const scrollTopBtn = document.getElementById("scrollTop")

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Show/hide scroll to top button based on scroll position
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    scrollTopBtn.style.opacity = "1"
  } else {
    scrollTopBtn.style.opacity = "0.5"
  }
})

// Add fade-in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all work cards and skill categories
document.querySelectorAll(".work-card, .skill-category, .experience-item").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(20px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// Modal functionality for work cards
const modal = document.getElementById("workModal")
const modalTitle = document.getElementById("modalTitle")
const modalContent = document.getElementById("modalContent")
const modalClose = document.querySelector(".modal-close")

// Work details data
const workDetails = {
  "inventory-management": {
    title: "Equipment & Asset Inventory",
    content: `
      <p>Unified management of IT equipment and company assets across M.B.A. Consulting Philippines, ensuring all resources are properly documented, tracked, and maintained.</p>
      
      <h3>Key Activities</h3>
      <ul>
        <li>Cataloging IT equipment (desktops)</li>
        <li>Recording serial numbers, model numbers</li>
      </ul>

      <h3>Tools & Technologies</h3>
      <ul>
        <li>Microsoft Excel for inventory and reporting</li>
        <li>Barcode scanning systems for identification</li>
        <li>Documentation templates for record-keeping</li>
      </ul>

<div class="modal-images">
  <div class="modal-image">
    <img src="imgs/eqiup asset inventory/eai1.jfif" alt="Equipment Tracking Sheet">
  </div>
  <div class="modal-image">
    <img src="imgs/eqiup asset inventory/eai2.jfif" alt="Inventory Database">
  </div>
  <div class="modal-image">
    <img src="imgs/eqiup asset inventory/eai3.jfif" alt="Physical Audit Process">
  </div>
</div>

    `,
  },

  "sim-gateway": {
    title: "SIM Gateway Server Management",
    content: `
      <p>Managing SIM gateway servers to ensure smooth telecommunications and messaging operations across the organization.</p>

      <h3>Key Activities</h3>
      <ul>
        <li>Listing and documenting all SIM card numbers within the server</li>
        <li>Updating and maintaining SIM records regularly</li>
      </ul>

      <h3>Skills Applied</h3>
      <ul>
        <li>Server administration and monitoring</li>
        <li>Database management for SIM records</li>
      </ul>

<div class="modal-images">
  <div class="modal-image">
    <img src="imgs/sim gateway/sim1.jfif" alt="SIM Gateway Dashboard">
  </div>
  <div class="modal-image">
    <img src="imgs/sim gateway/sim3.jfif" alt="Server Logs">
  </div>
</div>
    `,
  },

  "user-monitoring": {
    title: "Employee User Monitoring",
    content: `
      <p>Collecting and monitoring employee IP addresses to ensure compliance, productivity, and accountability in workplace activities.</p>

      <h3>Key Activities</h3>
      <ul>
        <li>Collecting employee IP addresses and mapping them to users</li>
        <li>Tracking work-related online activity and system usage</li>
        <li>Monitoring productivity to ensure employees stay on tasks</li>
        <li>Generating reports on suspicious or non-compliant activities</li>
      </ul>

      <h3>Technologies Used</h3>
      <ul>
        <li>Network monitoring tools</li>
        <li>Firewall and logging systems</li>
      </ul>

<div class="modal-images">
  <div class="modal-image">
    <img src="imgs/user monitoring/user1.jfif" alt="User Activity Logs">
  </div>
  <div class="modal-image">
    <img src="imgs/user monitoring/user2.jfif" alt="IP Tracking Report">
  </div>
</div>
    `,
  },

  "banking-reports": {
    title: "Hourly Banking Reports",
    content: `
      <p>Automated and manual updates of the company's financial details, ensuring timely submission of reports to various offices and partner banks.</p>

      <h3>Key Activities</h3>
      <ul>
        <li>Collecting and updating company banking details every hour</li>
        <li>Generating update reports</li>
        <li>Sending reports to different branches and external banking teams</li>
        <li>Ensuring accuracy and compliance with financial policies</li>
      </ul>

      <h3>Technologies Used</h3>
      <ul>
        <li>Spreadsheet-based reporting</li>
      </ul>

<div class="modal-images">
  <div class="modal-image">
    <img src="imgs/hourly reports/hour1.jfif" alt="Banking Dashboard">
  </div>
  <div class="modal-image">
    <img src="imgs/hourly reports/hour2.jfif" alt="Hourly Report">
  </div>
</div>
    `,
  },

  troubleshooting: {
    title: "Troubleshooting",
    content: `
      <p>Diagnosing and resolving technical issues to ensure smooth operations and minimize downtime for M.B.A. Consulting Philippines employees.</p>
      
      <h3>Common Issues Resolved</h3>
      <ul>
        <li>Hardware problems: computer won't start, display issues, peripheral malfunctions</li>
        <li>Software errors: application crashes, installation problems</li>
        <li>Network connectivity: internet access problems, VPN issues, printer connectivity</li>
        <li>User access: password resets, account lockouts, permission issues</li>
        <li>Email problems: Outlook configuration, email delivery issues</li>
        <li>Performance issues: slow computers, system optimization</li>
      </ul>

      <h3>Troubleshooting Process</h3>
      <ul>
        <li>Receiving and documenting user-reported issues via IT helpdesk</li>
        <li>Gathering information about the problem and affected systems</li>
        <li>Performing systematic diagnosis to identify root causes</li>
        <li>Implementing solutions and testing to verify resolution</li>
        <li>Documenting solutions for knowledge base and future reference</li>
        <li>Following up with users to ensure satisfaction</li>
      </ul>

<div class="modal-images">
  <div class="modal-image">
    <img src="imgs/troubleshoot/tr1.jfif" alt="Helpdesk Tickets">
  </div>
  <div class="modal-image">
    <img src="imgs/troubleshoot/tr2.jfif" alt="Diagnostic Tools">
  </div>
    <div class="modal-image">
    <img src="imgs/troubleshoot/tr3.jfif" alt="Resolution Documentation">
  </div>
</div>
    `,
  },

  "daily-operations": {
    title: "Assist Daily Operational Needs",
    content: `
      <p>Supporting the IT department's daily operations and ensuring the smooth functioning of technology infrastructure at M.B.A. Consulting Philippines.</p>
      
      <h3>Daily Responsibilities</h3>
      <ul>
        <li>Monitoring and responding to IT helpdesk tickets</li>
        <li>Assisting with new employee workstation setup</li>
        <li>Supporting system maintenance and updates</li>
      </ul>

<div class="modal-images">
  <div class="modal-image">
    <img src="imgs/assist daily op/ass1.jfif" alt="Helpdesk Dashboard">
  </div>
  <div class="modal-image">
    <img src="imgs/assist daily op/ass2.jfif" alt="Workstation Setup">
  </div>
    <div class="modal-image">
    <img src="imgs/assist daily op/ass3.jfif" alt="Daily Operations Log">
  </div>
</div>
    `,
  },
}

// Open modal when work card is clicked
document.querySelectorAll(".work-card").forEach((card) => {
  const button = card.querySelector(".work-link")
  button.addEventListener("click", () => {
    const workId = card.getAttribute("data-work")
    const work = workDetails[workId]

    if (work) {
      modalTitle.textContent = work.title
      modalContent.innerHTML = work.content
      modal.classList.add("active")
      document.body.style.overflow = "hidden"
    }
  })
})

// Close modal
modalClose.addEventListener("click", () => {
  modal.classList.remove("active")
  document.body.style.overflow = "auto"
})

// Close modal when clicking outside
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active")
    document.body.style.overflow = "auto"
  }
})

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    modal.classList.remove("active")
    document.body.style.overflow = "auto"
  }
})

// Contact Form Handling
const contactForm = document.getElementById("contactForm")
const successModal = document.getElementById("successModal")
const successModalClose = document.getElementById("successModalClose")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form values
  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const message = document.getElementById("message").value

  // Basic validation
  if (!name || !email || !message) {
    alert("Please fill in all fields")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address")
    return
  }

  // Disable submit button
  const submitButton = contactForm.querySelector(".submit-button")
  submitButton.disabled = true
  submitButton.querySelector("span").textContent = "Sending..."

  // Simulate form submission (replace with actual backend integration)
  setTimeout(() => {
    // Show success modal
    successModal.classList.add("active")
    document.body.style.overflow = "hidden"

    // Reset form
    contactForm.reset()

    // Re-enable submit button
    submitButton.disabled = false
    submitButton.querySelector("span").textContent = "Send Message"
  }, 1000)
})

// Close success modal
successModalClose.addEventListener("click", () => {
  successModal.classList.remove("active")
  document.body.style.overflow = "auto"
})

// Close success modal when clicking outside
successModal.addEventListener("click", (e) => {
  if (e.target === successModal) {
    successModal.classList.remove("active")
    document.body.style.overflow = "auto"
  }
})

// Close success modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && successModal.classList.contains("active")) {
    successModal.classList.remove("active")
    document.body.style.overflow = "auto"
  }
})