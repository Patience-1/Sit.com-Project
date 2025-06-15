document.addEventListener('DOMContentLoaded', function () {
    const bookButtons = document.querySelectorAll('.btn');
  
    bookButtons.forEach(button => {
      button.addEventListener('click', function () {
        const name = this.closest('.Lewis').querySelector('h1')?.textContent;
        alert(`You have booked ${name}!`);
      });
    });
  });

  document.querySelector("form").addEventListener("submit", function (e) {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      e.preventDefault(); // Stop form submission
    }
  });

  const fileInput = document.getElementById("profilePic");
  const preview = document.getElementById("preview");

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
  const bookButton = document.getElementById("bookButton");

bookButton.addEventListener("click", function () {
  if (!this.classList.contains("unavailable")) {
    this.textContent = "Unavailable";
    this.classList.add("unavailable");
    this.disabled = true; // Prevent further clicks
  }
});

  



  