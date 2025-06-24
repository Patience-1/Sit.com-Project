const BASE_URL = "http://localhost:3000/api";

function toggleMenu() {
    const navLinks = document.getElementById("nav-links");
    navLinks.classList.toggle("open");
}


const handleHomeTextAnimation = () => {
    // Parent text animation
    const words = ['Parents', 'Moms', 'Dads', 'Guardians'];
    const parentText = document.getElementById('parents-text');
    if (!parentText) return;

    let currentIndex = 0;
    setInterval(() => {
        parentText.style.opacity = 0;
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % words.length;
            parentText.textContent = words[currentIndex];
            parentText.style.opacity = 1;
        }, 500);
    }, 3000);
}

const passwordValidation = () => {
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
}

const profilePictureReview = () => {
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
}

const registerUser = () => {
const registerForm = document.getElementById("registerForm");
if (!registerForm) return;
  registerForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const fullName = document.getElementById("firstname").value + " " + document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const location = document.getElementById("location")?.value;
    const numberOfKids = document.getElementById("numKids")?.value;

    const userData = {
      name: fullName,
      email,
      password,
      role:"parent",
      location,
      numberOfKids
    };

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });

      const data = await res.json();
      if (res.ok) {
        alert("Registration successful!");
        window.location.href = "login.html";
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (err) {
      console.error("Registration error:", err);
    }
  });
};

const loginUser = () => {
  const loginForm = document.getElementById("loginForm");
if (!loginForm) return;
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email")?.value;
    const password = document.getElementById("password")?.value;
    const role = window.location.search.includes("sitter") ? "sitter" : "parent";
    const endpoint = role === "sitter" ? "/sitters/login" : "/auth/login";

    try {
      const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        window.location.href = "index.html"; 
      } else {
        alert(data.message || "Login failed.");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  });
};

const registerSitter = () => {
const signupForm = document.getElementById("signupForm");
if (!signupForm) return;

  signupForm.addEventListener("submit", async function (e) {
     e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password, role: "sitter" }) 
  });

  if (res.ok) {
    window.location.href = "home.html";
  } else {
    const data = await res.json();
    alert(data.message || "Signup failed.");
  }
});
}

document.addEventListener("DOMContentLoaded", function () {
    //highlight active navbar link
    const navlinks = document.querySelectorAll('.navbar a');
    const currentPage = window.location.pathname.split("/").pop(); // e.g., "about.html"

    navlinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    handleHomeTextAnimation();
    passwordValidation();
    profilePictureReview()
  
     // Role-based Register/Log In link
  const urlParams = new URLSearchParams(window.location.search);
  const role = urlParams.get("role");
  const registerLink = document.getElementById("loginLink");
  if (registerLink) {
    registerLink.href = role === "sitter" ? "signup.html?role=sitter" : "register.html?role=parent";
  }
  
  // Form handlers
  const isRegisterPage = window.location.pathname.includes("register") || 
                         window.location.pathname.includes("signup");
  const isLoginPage = window.location.pathname.includes("login");

  if (isRegisterPage) {
  if (role === "sitter") {
    registerSitter();
  } else {
    registerUser(); // default to parent
  }
}
  if (isLoginPage) loginUser();
});