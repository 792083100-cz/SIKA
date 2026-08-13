// ===== 加载动画 =====
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => loader.classList.add("hidden"), 500);
});

// ===== 打字机效果 =====
const titles = ["前端开发者", "UI/UX 设计师", "创意工程师", "你的职位"];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById("typed");

function typeLoop() {
  const current = titles[titleIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex--);
  } else {
    typedEl.textContent = current.substring(0, charIndex++);
  }

  let delay = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === current.length + 1) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
    delay = 500;
  }

  setTimeout(typeLoop, delay);
}

typeLoop();

// ===== 滚动处理（rAF 节流）=====
const progressBar = document.getElementById("scrollProgress");
const navbar = document.getElementById("navbar");
const sections = document.querySelectorAll("section[id], header[id]");
const navItems = document.querySelectorAll(".nav-link");

let ticking = false;

function updateScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = progress + "%";

  if (scrollTop > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (scrollTop >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("href") === "#" + current) {
      item.classList.add("active");
    }
  });

  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateScroll);
    ticking = true;
  }
}, { passive: true });

// ===== 移动端菜单 =====
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.classList.toggle("open");
  navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute("aria-label", isOpen ? "关闭菜单" : "打开菜单");
});

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("open");
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "打开菜单");
  });
});

// ===== 按 Esc 关闭菜单 =====
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navLinks.classList.contains("open")) {
    menuToggle.classList.remove("open");
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.focus();
  }
});

// ===== 滚动渐显 =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".section").forEach((el) => {
  el.classList.add("reveal");
  observer.observe(el);
});
