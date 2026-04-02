/* =======================================================
   1. DATA FILM (MOCK DATA)
   ======================================================= */
const continueWatching = [
  { title: "Don't Look Up", img: "assets/continue/dontlook.png", rating: "4.5/5", progress: 60 },
  { title: "All Of Us Are Dead", img: "assets/continue/allofus.png", rating: "4.2/5", progress: 40 },
  { title: "Blue Lock", img: "assets/continue/bluelock.png", rating: "4.6/5", progress: 80, badge: "Episode Baru" },
  { title: "Batman", img: "assets/continue/batman.png", rating: "4.4/5", progress: 30 },
  { title: "The Little Mermaid", img: "assets/continue/tlm.png", rating: "4.1/5", progress: 70 },
  { title: "A Man Called Otto", img: "assets/continue/otto.png", rating: "4.4/5", progress: 30 },
  { title: "Guardian of the Galaxy Vol. 3", img: "assets/continue/gog.png", rating: "4.8/5", progress: 90 },
  { title: "Black Adam", img: "assets/continue/blackadam.png", rating: "4.0/5", progress: 20 },
  { title: "Dilan 1991", img: "assets/continue/dilan.png", rating: "4.3/5", progress: 20 }
];

const topRating = [
  { img: "assets/top/Number=1.png", badge: "Episode Baru" },
  { img: "assets/top/Number=2.png", badge: "Top 10" },
  { img: "assets/top/Number=3.png", badge: "Top 10" },
  { img: "assets/top/Number=4.png", badge: "Episode Baru" },
  { img: "assets/top/Number=5.png", badge: "Episode Baru" },
  { img: "assets/top/Number=6.png" },
  { img: "assets/top/Number=7.png", badge: "Top 10" },
  { img: "assets/top/Number=8.png" },
  { img: "assets/top/Number=9.png" },
  { img: "assets/top/Number=10.png" },
  { img: "assets/top/Number=11.png" },
  { img: "assets/top/Number=12.png" },
  { img: "assets/top/Number=13.png" },
  { img: "assets/top/Number=14.png", badge: "Top 10" },
  { img: "assets/top/Number=15.png" },
  { img: "assets/top/Number=16.png" },
  { img: "assets/top/Number=17.png" },
  { img: "assets/top/Number=18.png" }
];

const trending = [
  { img: "assets/trending/Number=1.png", top: 1 },
  { img: "assets/trending/Number=2.png", top: 2 },
  { img: "assets/trending/Number=3.png", top: 3 },
  { img: "assets/trending/Number=4.png", top: 4 },
  { img: "assets/trending/Number=5.png", top: 5 },
  { img: "assets/trending/Number=6.png", top: 6 },
  { img: "assets/trending/Number=7.png", top: 7 },
  { img: "assets/trending/Number=8.png", top: 8 },
  { img: "assets/trending/Number=9.png", top: 9 },
  { img: "assets/trending/Number=10.png", top: 10 }
];

const rilisBaru = [
  { img: "assets/rilis/1.png", badge: "Top 10" },
  { img: "assets/rilis/2.png", badge: "Episode Baru" },
  { img: "assets/rilis/3.png", badge: "Top 10" },
  { img: "assets/rilis/4.png", badge: "Episode Baru" },
  { img: "assets/rilis/5.png" },
  { img: "assets/rilis/6.png" },
  { img: "assets/rilis/7.png" },
  { img: "assets/rilis/8.png" },
  { img: "assets/rilis/9.png" },
  { img: "assets/rilis/10.png" },
  { img: "assets/rilis/11.png" },
  { img: "assets/rilis/12.png" },
  { img: "assets/rilis/13.png" },
  { img: "assets/rilis/14.png" },
  { img: "assets/rilis/15.png" }
];


/* =======================================================
   2. FUNGSI RENDER (MENAMPILKAN FILM KE HTML)
   ======================================================= */

// Render Card untuk "Melanjutkan Tontonan" (Landscape)
const continueContainer = document.getElementById("continueWatching");
if (continueContainer) {
  continueWatching.forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("card", "landscape");
    card.innerHTML = `
      <img src="${movie.img}" />
      ${movie.badge ? `<span class="badge blue">${movie.badge}</span>` : ""}
      <div class="overlay">
        <div class="info">
          <span class="title">${movie.title}</span>
          <span class="rating">★ ${movie.rating}</span>
        </div>
        <div class="progress-bar">
          <div class="progress" style="width:${movie.progress}%"></div>
        </div>
      </div>
    `;
    continueContainer.appendChild(card);
  });
}

// Render Card Biasa (Portrait)
function renderMovies(containerId, data, isTrending = false) {
  const container = document.getElementById(containerId);
  if (!container) return;

  data.forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("card", "portrait");

    let badgeHTML = "";
    if (isTrending && movie.top) {
      badgeHTML = `<span class="badge red"><span>Top</span><span>${movie.top}</span></span>`;
    } else if (movie.badge === "Episode Baru") {
      badgeHTML = `<span class="badge blue">Episode Baru</span>`;
    } else if (movie.badge === "Top 10") {
      badgeHTML = `<span class="badge red">Top<br>10</span>`;
    }

    card.innerHTML = `
      <img src="${movie.img}" loading="lazy" />
      ${badgeHTML}
    `;
    container.appendChild(card);
  });
}

// Eksekusi Render
renderMovies("topRating", topRating);
renderMovies("trending", trending, true);
renderMovies("rilisBaru", rilisBaru);


/* =======================================================
   3. INISIALISASI EFEK & INTERAKSI (JALAN SETELAH RENDER)
   ======================================================= */

// A. Hover Focus Effect (Gelapkan card lain)
const cards = document.querySelectorAll(".card");
cards.forEach(card => {
  card.addEventListener("mouseenter", () => {
    cards.forEach(c => c.style.opacity = "0.5");
    card.style.opacity = "1";
  });
  card.addEventListener("mouseleave", () => {
    cards.forEach(c => c.style.opacity = "1");
  });
});

// B. Logika Slider (Drag, Panah, Auto-Hide)
document.querySelectorAll(".row-wrapper").forEach(wrapper => {
  const row = wrapper.querySelector(".row");
  const leftBtn = wrapper.querySelector(".arrow.left");
  const rightBtn = wrapper.querySelector(".arrow.right");

  // Klik Panah
  if (rightBtn) rightBtn.onclick = () => row.scrollBy({ left: 300, behavior: "smooth" });
  if (leftBtn) leftBtn.onclick = () => row.scrollBy({ left: -300, behavior: "smooth" });

  // Drag Scroll
  let isDown = false;
  let startX;
  let scrollLeft;

  row.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - row.offsetLeft;
    scrollLeft = row.scrollLeft;
  });
  row.addEventListener("mouseleave", () => (isDown = false));
  row.addEventListener("mouseup", () => (isDown = false));
  row.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const walk = (e.pageX - row.offsetLeft - startX) * 1.5;
    row.scrollLeft = scrollLeft - walk;
  });

  // Auto Hide Arrow
  function updateArrow() {
    const maxScroll = row.scrollWidth - row.clientWidth;
    if (leftBtn && rightBtn) {
      leftBtn.style.opacity = row.scrollLeft <= 0 ? "0" : "1";
      leftBtn.style.pointerEvents = row.scrollLeft <= 0 ? "none" : "auto";
      rightBtn.style.opacity = row.scrollLeft >= maxScroll - 5 ? "0" : "1";
      rightBtn.style.pointerEvents = row.scrollLeft >= maxScroll - 5 ? "none" : "auto";
    }
  }
  row.addEventListener("scroll", updateArrow);
  updateArrow();
});


/* =======================================================
   4. INTERAKSI UI LAINNYA (NAVBAR, DROPDOWN, FOOTER, DLL)
   ======================================================= */

// Navbar Background on Scroll
const navbar = document.querySelector(".navbar");
if (navbar) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(0,0,0,0.9)";
    } else {
      navbar.style.background = "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)";
    }
  });
}

// User Profile Dropdown
const profile = document.querySelector(".profile");
if (profile) {
  profile.addEventListener("click", (e) => {
    e.stopPropagation();
    profile.classList.toggle("active");
  });
  document.addEventListener("click", (e) => {
    if (!profile.contains(e.target)) profile.classList.remove("active");
  });
}

// Footer Accordion (Mobile)
document.querySelectorAll(".footer-title").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".footer-accordion").forEach(item => {
      if (item !== btn.parentElement) item.classList.remove("active");
    });
    btn.parentElement.classList.toggle("active");
  });
});

// Tombol Play / Detail Fake
document.querySelectorAll(".btn-primary").forEach(btn => btn.addEventListener("click", () => alert("Memulai film...")));
document.querySelectorAll(".btn-secondary").forEach(btn => btn.addEventListener("click", () => alert("Detail film...")));

// Tombol Logout
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("isLogin");
    window.location.href = "login.html";
  });
}

// Tombol Mute di Hero Section
const muteBtn = document.getElementById("muteBtn");
if (muteBtn) {
  let isMuted = true;
  muteBtn.addEventListener("click", () => {
    isMuted = !isMuted;
    if (isMuted) {
      muteBtn.classList.remove("fa-volume-high");
      muteBtn.classList.add("fa-volume-xmark");
    } else {
      muteBtn.classList.remove("fa-volume-xmark");
      muteBtn.classList.add("fa-volume-high");
    }
  });
}