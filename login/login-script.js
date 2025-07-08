document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const successMessage = document.getElementById("loginSuccess");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    loginForm.style.opacity = "0.5";
    setTimeout(() => {
      loginForm.reset();
      loginForm.style.opacity = "1";
      successMessage.style.display = "block";

      successMessage.style.opacity = "0";
      successMessage.style.transition = "opacity 0.5s ease";
      setTimeout(() => {
        successMessage.style.opacity = "1";
      }, 10);

      setTimeout(() => {
        successMessage.style.opacity = "0";
        setTimeout(() => {
          successMessage.style.display = "none";
        }, 500);
      }, 4000);
    }, 800);
  });
});
