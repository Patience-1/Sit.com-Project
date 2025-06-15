document.addEventListener("DOMContentLoaded", function () {
  // Book buttons (for multiple sitters)
  const bookButtons = document.querySelectorAll(".btn");

  bookButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const name = this.closest(".Lewis")?.querySelector("h1")?.textContent;
      if (name) {
        alert(`You have booked ${name}!`);
      }
    });
  });

  // Password validation
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      const password = document.getElementById("password")?.value;
      const confirmPassword = document.getElementById("confirmPassword")?.value;

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        e.preventDefault(); // Stop form submission
      }
    });
  }

  // Profile picture preview
  const fileInput = document.getElementById("profilePic");
  const preview = document.getElementById("preview");

  if (fileInput && preview) {
    fileInput.addEventListener("change", function () {
      const file = this.files[0];

      if (file) {
        const reader = new FileReader();
        reader.addEventListener("load", function () {
          preview.setAttribute("src", this.result);
          preview.style.display = "block";
        });
        reader.readAsDataURL(file);
      } else {
        preview.style.display = "none";
      }
    });
  }

  // Single book button (with confirmation)
  const bookButton = document.getElementById("bookButton");

  if (bookButton) {
    bookButton.addEventListener("click", function () {
      if (!this.classList.contains("unavailable")) {
        if (confirm("Are you sure you want to book this sitter?")) {
          this.textContent = "Unavailable";
          this.classList.add("unavailable");
          this.disabled = true;
        }
      }
    });
  }
});

  // Role-based redirect for register link
window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const role = urlParams.get("role");
  const registerLink = document.querySelector(".register-link a");

  if (registerLink && role) {
    if (role === "parent") {
      registerLink.href = "signup-parent.html";
    } else if (role === "sitter") {
      registerLink.href = "signup-sitter.html";
    }
  }
});
