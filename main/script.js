// Animate product cards when they enter the viewport
const cards = document.querySelectorAll('.product-card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = `${entry.target.dataset.index * 0.2}s`;
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

cards.forEach((card, index) => {
  card.dataset.index = index;
  observer.observe(card);
});
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('successMessage');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Add success animation
    successMsg.style.display = 'block';
    successMsg.style.opacity = '0';
    successMsg.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      successMsg.style.opacity = '1';
    }, 10);

    // Clear inputs with a slight delay
    setTimeout(() => {
      form.reset();
    }, 500);

    // Hide message after 3 seconds
    setTimeout(() => {
      successMsg.style.opacity = '0';
      setTimeout(() => {
        successMsg.style.display = 'none';
      }, 500);
    }, 3000);
  });
});
