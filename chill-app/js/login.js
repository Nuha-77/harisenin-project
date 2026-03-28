// toggle password
const toggle = document.getElementById("togglePass");
const password = document.getElementById("password");

toggle.addEventListener("click", () => {
  password.type = password.type === "password" ? "text" : "password";
});

// login
document.getElementById("loginForm").addEventListener("submit", function(e){
  e.preventDefault();

  const user = document.getElementById("username").value;
  const pass = password.value;

  if(!user || !pass){
    alert("Isi semua field");
    return;
  }

  localStorage.setItem("user", user);
  window.location.href = "index.html";
});

// google login
document.getElementById("googleLogin").addEventListener("click", ()=>{
  localStorage.setItem("user", "google_user");
  window.location.href = "index.html";
});