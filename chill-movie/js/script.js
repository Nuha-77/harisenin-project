/* =========================================
   1. LOCAL STORAGE SYSTEM (DATABASE MOCK)
   ========================================= */
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}


/* =========================================
   2. TOGGLE PASSWORD VISIBILITY
   ========================================= */
document.querySelectorAll(".toggle-password").forEach(icon => {
  icon.addEventListener("click", () => {
    const input = icon.previousElementSibling;
    if (!input) return;

    const isPassword = input.type === "password";
    
    // Ubah tipe input
    input.type = isPassword ? "text" : "password";
    
    // Ubah icon FontAwesome
    if (isPassword) {
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    } else {
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    }
  });
});


/* =========================================
   3. REGISTER LOGIC
   ========================================= */
const registerBtn = document.getElementById("registerBtn");

if (registerBtn) {
  registerBtn.addEventListener("click", () => {
    const user = document.getElementById("regUser").value.trim();
    const pass = document.getElementById("regPass").value.trim();
    const confirm = document.getElementById("regConfirm").value.trim();

    if (!user || !pass || !confirm) {
      alert("⚠️ Semua field wajib diisi!");
      return;
    }

    if (pass !== confirm) {
      alert("❌ Konfirmasi kata sandi tidak cocok!");
      return;
    }

    let users = getUsers();

    const exist = users.find(u => u.username.toLowerCase() === user.toLowerCase());
    if (exist) {
      alert("❌ Username sudah terdaftar! Silakan gunakan username lain.");
      return;
    }

    // Simpan user baru
    users.push({ username: user, password: pass });
    saveUsers(users);

    alert("✅ Registrasi berhasil! Silakan login.");
    window.location.href = "login.html";
  });
}


/* =========================================
   4. LOGIN LOGIC
   ========================================= */
const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const user = document.getElementById("loginUser").value.trim();
    const pass = document.getElementById("loginPass").value.trim();

    if (!user || !pass) {
      alert("⚠️ Isi username dan kata sandi!");
      return;
    }

    const users = getUsers();
    const validUser = users.find(u => u.username === user && u.password === pass);

    if (!validUser) {
      alert("❌ Username atau kata sandi salah!");
      return;
    }

    // Buat Sesi Login
    localStorage.setItem("isLogin", "true");
    localStorage.setItem("currentUser", user);

    alert("✅ Login Berhasil!");
    window.location.href = "index.html";
  });
}


/* =========================================
   5. GOOGLE FAKE LOGIN
   ========================================= */
document.querySelectorAll('.btn-google').forEach(btn => {
  btn.addEventListener('click', () => {
    alert('✅ Terhubung dengan Akun Google Anda!');
    localStorage.setItem("isLogin", "true");
    localStorage.setItem("currentUser", "GoogleUser");
    window.location.href = "index.html";
  });
});


/* =========================================
   6. PROTECTED ROUTE (KEAMANAN HALAMAN UTAMA)
   ========================================= */
// Jika pengguna membuka halaman selain login/register, cek status loginnya
const currentPage = window.location.pathname;
const isAuthPage = currentPage.includes("login.html") || currentPage.includes("register.html");

if (!isAuthPage && currentPage.includes(".html")) {
  const isLogin = localStorage.getItem("isLogin");
  if (!isLogin) {
    alert("⚠️ Anda harus login terlebih dahulu!");
    window.location.href = "login.html";
  }
}