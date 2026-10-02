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
