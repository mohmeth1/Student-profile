// Toggle Forms
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

loginBtn.onclick = () => {
  loginForm.classList.add("active");
  signupForm.classList.remove("active");

  loginBtn.classList.add("active");
  signupBtn.classList.remove("active");
};

signupBtn.onclick = () => {
  signupForm.classList.add("active");
  loginForm.classList.remove("active");

  signupBtn.classList.add("active");
  loginBtn.classList.remove("active");
};

// Password Toggle
function togglePassword(id) {
  const input = document.getElementById(id);

  input.type =
    input.type === "password"
      ? "text"
      : "password";
}

// Toast Notification
function showToast(message) {
  const toast = document.getElementById("toast");

  toast.innerText = message;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

// Feature card click actions
const featureCards = document.querySelectorAll('.feature-card');
const featureMessages = {
  'Ultra Secure': 'Protects your account with strong safeguards and secure verification.',
  'Fast Access': 'Keeps the login flow quick and smooth for easy access.',
  'Encrypted': 'Keeps your information private by simulating secure encryption.',
};

featureCards.forEach((card) => {
  const label = card.querySelector('span')?.innerText.trim() || 'Feature';
  card.addEventListener('click', () => {
    showToast(featureMessages[label] || `${label} feature active.`);
  });
});

// Social button click actions
const socialButtons = document.querySelectorAll('.social-login button');

socialButtons.forEach((button) => {
  const icon = button.querySelector('i');
  let provider = 'Social';

  if (icon.classList.contains('fa-google')) provider = 'Google';
  if (icon.classList.contains('fa-github')) provider = 'GitHub';
  if (icon.classList.contains('fa-facebook')) provider = 'Facebook';

  button.addEventListener('click', () => {
    showToast(`${provider} login is not available in this demo.`);
  });
});

// Signup Multi-Step
const nextStep = document.querySelector(".next-step");

nextStep.addEventListener("click", () => {

  const name = document.getElementById("name").value;
  const email = document.getElementById("signupEmail").value;

  if(name === "" || email === "") {
    showToast("Fill all fields");
    return;
  }

  document.querySelector(".step-1")
    .classList.remove("active-step");

  document.querySelector(".step-2")
    .classList.add("active-step");
});

// Password Strength
const passwordInput =
  document.getElementById("signupPassword");

passwordInput.addEventListener("input", () => {

  const value = passwordInput.value;
  const bar = document.querySelector(".strength-bar");

  let strength = 0;

  if(value.length > 5) strength++;
  if(value.match(/[A-Z]/)) strength++;
  if(value.match(/[0-9]/)) strength++;
  if(value.match(/[^A-Za-z0-9]/)) strength++;

  switch(strength) {

    case 1:
      bar.style.width = "25%";
      bar.style.background = "red";
      break;

    case 2:
      bar.style.width = "50%";
      bar.style.background = "orange";
      break;

    case 3:
      bar.style.width = "75%";
      bar.style.background = "yellow";
      break;

    case 4:
      bar.style.width = "100%";
      bar.style.background = "lime";
      break;

    default:
      bar.style.width = "10%";
  }

});

// Signup Submit
signupForm.addEventListener("submit", (e) => {

  e.preventDefault();

  const password =
    document.getElementById("signupPassword").value;

  const confirm =
    document.getElementById("confirmPassword").value;

  const terms =
    document.getElementById("terms").checked;

  if(password !== confirm) {
    showToast("Passwords do not match");
    return;
  }

  if(!terms) {
    showToast("Accept terms first");
    return;
  }

  // Save User
  const user = {
    name: document.getElementById("name").value,
    email: document.getElementById("signupEmail").value,
    password
  };

  localStorage.setItem("neoUser", JSON.stringify(user));

  showToast("Account Created Successfully");

  setTimeout(() => {
    loginBtn.click();
  }, 1500);

});

// Login
loginForm.addEventListener("submit", (e) => {

  e.preventDefault();

  const email =
    document.getElementById("loginEmail").value;

  const password =
    document.getElementById("loginPassword").value;

  const user =
    JSON.parse(localStorage.getItem("neoUser"));

  if(!user) {
    showToast("No account found");
    return;
  }

  // Fake Auth
  if(email === user.email &&
     password === user.password) {

    showToast("Login Success");
    localStorage.setItem("loggedInUser", user.name);

    setTimeout(() => {
      window.location.href = "quiz.html";
    }, 1000);

  } else {
    showToast("Invalid credentials");
  }

});

// Open Dashboard
function openDashboard(name) {

  document.querySelector(".container")
    .style.display = "none";

  document.getElementById("dashboard")
    .classList.remove("hidden");

  document.getElementById("welcomeText")
    .innerText = `Welcome, ${name}`;

  const dashboardCards = document.querySelectorAll('.card');
  dashboardCards.forEach((card) => {
    card.addEventListener('click', () => {
      const title = card.querySelector('h3')?.innerText || 'Card';
      showToast(`${title} section is ready to explore.`);
    });
  });

  const sidebarItems = document.querySelectorAll('.sidebar li');
  sidebarItems.forEach((item) => {
    item.addEventListener('click', () => {
      showToast(`Opening ${item.innerText.trim()}...`);
    });
  });

  // Session timeout simulation
  setTimeout(() => {

    alert("Session Expired");
    logout();

  }, 600000); // 10 min
}

// Logout
function logout() {

  document.getElementById("dashboard")
    .classList.add("hidden");

  document.querySelector(".container")
    .style.display = "flex";
}

// Logout Buttons
document.getElementById("logoutBtn")
  .onclick = logout;

document.getElementById("logoutDrop")
  .onclick = logout;