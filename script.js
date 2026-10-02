let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(links => {
        links.classList.remove('active');
        const activeLink = document.querySelector('header nav a[href*=' + id + ']');
        if (activeLink) {
          activeLink.classList.add('active');
        }
      });
    }
  });
};

if (menuIcon) {
  menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
  };
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      if (navbar) {
        navbar.classList.remove('active');
      }
      if (menuIcon) {
        menuIcon.classList.remove('bx-x');
      }
  });
});

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', function() {
      document.querySelectorAll('.project-card').forEach(c => c.style.borderColor = 'transparent');
      this.style.borderColor = '#00ffee';
  });
});

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const formSuccess = document.getElementById('form-success');
const sendAnother = document.getElementById('send-another');

if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('input[type="submit"]');
    const originalValue = submitBtn.value;
    submitBtn.value = 'Sending...';
    submitBtn.disabled = true;
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });
      const result = await response.json();

      if (response.ok && result.success !== 'false') {
        contactForm.reset();
        contactForm.hidden = true;
        formSuccess.hidden = false;
        formStatus.textContent = '';
      } else {
        formStatus.textContent = result.message || 'Something went wrong. Please try again or email wajeehaaslam597@gmail.com directly.';
        formStatus.classList.add('error');
      }
    } catch (error) {
      formStatus.textContent = 'Could not send right now. Please email wajeehaaslam597@gmail.com directly.';
      formStatus.classList.add('error');
    } finally {
      submitBtn.value = originalValue;
      submitBtn.disabled = false;
    }
  });
}

if (sendAnother && contactForm && formSuccess) {
  sendAnother.addEventListener('click', function () {
    formSuccess.hidden = true;
    contactForm.hidden = false;
    formStatus.textContent = '';
    formStatus.className = 'form-status';
  });
}