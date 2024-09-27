// =============== Menu Icon Navbar ========================
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// ================ scroll section active link =================
let sections = document.querySelectorAll("section");
let navlinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.setAttribute('id');

    if (top >= offset && top < offset + height) {
      navlinks.forEach((links) => {
        links.classList.remove('active');
        document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
      });
    }
  });
};

// ================= Sticky navbar ====================
window.onscroll = () => {
  let header = document.querySelector(".header");

  header.classList.toggle("sticky", window.scrollY > 100);

  // remove menu icon navbar when click navbar link scroll
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

// ================== dark light mode =====================
let darkModeIcon = document.querySelector("#darkMode-icon");

darkModeIcon.onclick = () => {
  darkModeIcon.classList.toggle("bx-sun");
  document.body.classList.toggle("dark-mode");
};

// ================== Scroll Reveal =====================
ScrollReveal({ 
    // reset: true,
    distance: "80px",
    duration: 1500,
    delay: 100 
});

ScrollReveal().reveal('.home-content,.heading', { origin: 'top' });
ScrollReveal().reveal('.home-img img, .services-container, .portfolio-box, .contact-form' , { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-image img', { origin: 'left' });
ScrollReveal().reveal('.home-content h3, .home-content p, .about-content, .profession-box', { origin: 'right' });




 // Handle form submission
 document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault(); // Prevent default form submission
  
  const formData = new FormData(this);
  const data = {};
  formData.forEach((value, key) => data[key] = value);

  try {
      const response = await fetch('http://localhost:3000/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
      });

      if (response.ok) {
          showPopup();  // Show success popup if email is sent
      } else {
          alert('Error sending email.');
      }
  } catch (error) {
      alert('Error: ' + error.message);
  }
});

// Show the popup
function showPopup() {
  const popup = document.getElementById('popup');
  popup.classList.add('show');

  // Hide popup after 3 seconds
  setTimeout(() => {
      popup.classList.remove('show');
  }, 3000);
}