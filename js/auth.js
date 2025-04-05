// Simple authentication functionality
function login(email) {
  localStorage.setItem(
    "user",
    JSON.stringify({
      email: email,
      name: email.split("@")[0],
    })
  )
}

function logout() {
  localStorage.removeItem("user")
  updateLoginStatus()
}

function isLoggedIn() {
  return localStorage.getItem("user") !== null
}

function getCurrentUser() {
  const userJson = localStorage.getItem("user")
  return userJson ? JSON.parse(userJson) : null
}

function updateLoginStatus() {
  const loginStatusElements = document.querySelectorAll("#login-status")

  if (isLoggedIn()) {
    const user = getCurrentUser()
    loginStatusElements.forEach((element) => {
      element.textContent = "Account"
    })

    const loginFormContainer = document.getElementById("login-form-container")
    const profileContainer = document.getElementById("profile-container")

    if (loginFormContainer && profileContainer) {
      loginFormContainer.classList.add("hidden")
      profileContainer.classList.remove("hidden")

      const userNameElement = document.getElementById("user-name")
      if (userNameElement) {
        userNameElement.textContent = user.name
      }
    }
  } else {
    loginStatusElements.forEach((element) => {
      element.textContent = "Login"
    })

    const loginFormContainer = document.getElementById("login-form-container")
    const profileContainer = document.getElementById("profile-container")

    if (loginFormContainer && profileContainer) {
      loginFormContainer.classList.remove("hidden")
      profileContainer.classList.add("hidden")
    }
  }
}

function setupLoginForm() {
  const loginForm = document.getElementById("login-form")
  const logoutBtn = document.getElementById("logout-btn")

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const email = document.getElementById("email").value
      login(email)
      updateLoginStatus()
    })
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      logout()
    })
  }
}

