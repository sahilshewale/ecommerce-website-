document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Optionally simulate sending message with animation delay
    form.style.opacity = "0.5";
    setTimeout(() => {
      form.reset();
      form.style.opacity = "1";
      successMessage.style.display = "block";

      // Animate message appearance
      successMessage.style.opacity = "0";
      successMessage.style.transition = "opacity 0.5s ease";
      setTimeout(() => {
        successMessage.style.opacity = "1";
      }, 10);

      // Hide after 4 seconds
      setTimeout(() => {
        successMessage.style.opacity = "0";
        setTimeout(() => {
          successMessage.style.display = "none";
        }, 500);
      }, 4000);
    }, 800);
  });
});
