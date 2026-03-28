document.getElementById("registerForm").addEventListener("submit", function(e){
  e.preventDefault();

  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;

  if(!user || !pass || !confirm){
    alert("Lengkapi data");
    return;
  }

  if(pass !== confirm){
    alert("Password tidak sama");
    return;
  }

  localStorage.setItem("user", user);
  window.location.href = "login.html";
});