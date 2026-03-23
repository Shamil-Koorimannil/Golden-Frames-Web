/**
 * Global JavaScript for Event Management Website
 */

class CustomNavbar extends HTMLElement {
  connectedCallback() {
    const isSolid = this.hasAttribute('solid');
    const headerClass = isSolid ? 'header header-solid' : 'header';
    this.innerHTML = `
    <header class="${headerClass}">
        <div class="container nav-container">
            <a href="index.html" class="logo">
                <img src="./image/Golden logo.png" alt="Golden Frames Logo" class="logo-image">
                <span class="logo-text">Golden Frames</span>
            </a>
            <button class="hamburger" aria-label="Toggle Navigation">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <nav class="nav-menu">
                <a href="index.html" class="nav-link">Home</a>
                <a href="about.html" class="nav-link">About</a>
                <a href="services.html" class="nav-link">Services</a>
                <a href="events.html" class="nav-link">Events</a>
                <a href="portfolio.html" class="nav-link">Portfolio</a>
                <a href="why-us.html" class="nav-link">Why Us</a>
                <a href="blog.html" class="nav-link">Blog</a>
                <a href="contact.html" class="nav-link">Contact</a>
            </nav>
        </div>
    </header>
    `;
  }
}
customElements.define('custom-navbar', CustomNavbar);

class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <h3>Golden Frames</h3>
                    <p>Golden Frames Events: Premium wedding and event planners dedicated to creating unforgettable luxury experiences, bespoke weddings, and premium corporate events tailored to your vision.</p>
<div class="social-links">
    <a href="#" aria-label="WhatsApp">
        <i class="fab fa-whatsapp"></i>
    </a>
    
    <a href="https://www.instagram.com/goldenframesevents?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" aria-label="Instagram">
        <i class="fab fa-instagram"></i>
    </a>
</div>
                </div>
                <div class="footer-col">
                    <h3>Quick Links</h3>
                    <ul class="footer-links">
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="services.html">Our Services</a></li>
                        <li><a href="portfolio.html">Portfolio</a></li>
                        <li><a href="contact.html">Contact Us</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h3>Our Services</h3>
                    <ul class="footer-links">
                        <li><a href="events.html">Theme Weddings</a></li>
                        <li><a href="events.html">Destination Weddings</a></li>
                        <li><a href="events.html">Premium Weddings</a></li>
                        <li><a href="events.html">Corporate Events</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h3>Contact Info</h3>
                    <ul class="footer-links">
                        <li>📍 Tirurkad, Perinthalmanna, Malappuram, Kerala 679321</li>
                        <li>📞 08547157785</li>
                        <li>✉️ goldenframesevents@gmail.com</li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 Golden Frames Events. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
    `;
  }
}
customElements.define('custom-footer', CustomFooter);

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar
  const header = document.querySelector('.header');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  // Initial check and event listener
  if(header && !header.classList.contains('header-solid')) {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
  }

  // 2. Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Prevent body scrolling when menu is open
      if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    }));
  }

  // 3. Active Nav Link Highlighting
  // Get current page filename
  const currentPagePath = window.location.pathname;
  let currentPage = currentPagePath.split('/').pop() || 'index.html';
  
  // Base case for root path mappings to index.html
  if (currentPage === '' || currentPage === '/') {
    currentPage = 'index.html';
  }

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    // Remove active class from all
    link.classList.remove('active');
    
    // Get the href of the link, strip any directories/paths
    const hrefAttr = link.getAttribute('href');
    if (hrefAttr) {
      const linkHref = hrefAttr.split('/').pop();
      if (linkHref === currentPage) {
        link.classList.add('active');
      }
    }
  });

  // 4. Scroll Animations (Intersection Observer)
  const fadeUpElements = document.querySelectorAll('.fade-up');
  
  // Fallback safety net: Ensure elements become visible even if they never intersect
  // or if IntersectionObserver is unavailable.
  setTimeout(() => {
    fadeUpElements.forEach(el => el.classList.add('visible'));
  }, 1200);

  if ('IntersectionObserver' in window) {
    const fadeUpObserverOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const fadeUpObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, fadeUpObserverOptions);

    fadeUpElements.forEach(element => {
      fadeUpObserver.observe(element);
    });
  }

  // 5. Portfolio Lightbox Logic
  const initLightbox = () => {
    // Target portfolio images and all other standard section images for preview
    const portfolioImages = document.querySelectorAll('.portfolio-item-image, section img');
    if (portfolioImages.length === 0) return;

    // Create lightbox HTML
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-img" src="" alt="Lightbox popup document">
      </div>
    `;
    
    document.body.appendChild(lightbox);
    
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    portfolioImages.forEach(img => {
      // Make them visually clickable
      img.style.cursor = 'pointer';
      
      // Find the inner img tag or click wrapping anchor
      img.addEventListener('click', (e) => {
        e.preventDefault();
        const innerImg = img.tagName === 'IMG' ? img : (img.querySelector('img') || img);
        const src = innerImg.getAttribute('src');
        const alt = innerImg.getAttribute('alt');
        if(src) {
           lightboxImg.src = src;
           lightboxImg.alt = alt || 'Expanded view';
           lightbox.classList.add('active');
           document.body.style.overflow = 'hidden';
        }
      });
    });

    // Close logic
    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    };

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  };

  initLightbox();

  // 6. Contact Form Validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const requiredInputs = this.querySelectorAll('[required]');
      
      // Clear previous error messages
      const errorMsgs = this.querySelectorAll('.error-msg');
      errorMsgs.forEach(msg => msg.remove());
      this.querySelectorAll('.error-input').forEach(input => input.classList.remove('error-input'));

      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          showError(input, 'This field is required');
        } else if (input.type === 'email' && !validateEmail(input.value)) {
          isValid = false;
          showError(input, 'Please enter a valid email address');
        }
      });

      if (isValid) {
        // Collect form data
        const name = document.getElementById('name') ? document.getElementById('name').value : '';
        const email = document.getElementById('email') ? document.getElementById('email').value : '';
        const phone = document.getElementById('phone') ? document.getElementById('phone').value : '';
        const eventType = document.getElementById('eventType') ? document.getElementById('eventType').value : '';
        const message = document.getElementById('message') ? document.getElementById('message').value : '';

        // Construct WhatsApp message
        const waNumber = '918547157785';
        let waText = `Hello Golden Frames Events!\n\nI would like to inquire about an event.\n\n*Details:*\n- *Name:* ${name}\n- *Email:* ${email}\n- *Phone:* ${phone}\n- *Event Type:* ${eventType}\n\n*Message:*\n${message}`;

        const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = 'Opening WhatsApp...';
        submitBtn.style.backgroundColor = 'var(--color-primary)';
        
        // Open WhatsApp in a new tab
        window.open(waLink, '_blank');
        
        setTimeout(() => {
          contactForm.reset();
          submitBtn.innerText = originalText;
          submitBtn.style.backgroundColor = '';
        }, 3000);
      }
    });
  }

  function showError(input, message) {
    input.classList.add('error-input');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'error-msg';
    msgDiv.style.color = 'red';
    msgDiv.style.fontSize = '0.8rem';
    msgDiv.style.marginTop = '0.2rem';
    msgDiv.innerText = message;
    
    // Insert after input
    input.parentNode.insertBefore(msgDiv, input.nextSibling);
  }

  function validateEmail(email) {
    const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  // 7. Floating WhatsApp Button
  const waButton = document.createElement('a');
  waButton.href = 'https://wa.me/918547157785';
  waButton.className = 'floating-wa';
  waButton.target = '_blank';
  waButton.rel = 'noopener noreferrer';
  waButton.setAttribute('aria-label', 'Chat with us on WhatsApp');
  waButton.innerHTML = '<i class="fab fa-whatsapp"></i>';
  document.body.appendChild(waButton);

});
