"use strict";

// ===== init =====
const init = () => {
  document.body.classList.remove("fadeout");
  // # app height
  appHeight();
  // # lazy load
  const ll = new LazyLoad({
    threshold: 0,
    elements_selector: ".lazy",
  });
};

// ===== app height =====
const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty(
    "--app-height",
    `${document.documentElement.clientHeight}px`
  );
};
window.addEventListener("resize", appHeight);

// ===== init header =====
const initHeader = () => {
  const scrollY = window.scrollY;
  const header = document.querySelector("[data-header]");
  const hSize =
    document.querySelector("[data-offset-top]").getBoundingClientRect().top +
    scrollY;

  if (scrollY > hSize) {
    header.classList.add("--black");
  } else {
    header.classList.remove("--black");
  }
};

"pageshow scroll".split(" ").forEach((evt) => {
  window.addEventListener(evt, initHeader);
});

// ===== menu =====
const [overlay, menu] = [
  document.querySelector("[data-header-overlay]"),
  document.querySelector("[data-header-menu]"),
];

// Detect Overlay
const detectOverlay = function (detect) {
  if (detect) {
    overlay.classList.add("--visible");
    document.body.style.overflow = "hidden";
  } else {
    overlay.classList.remove("--visible");
    document.body.style.removeProperty("overflow");
  }
};

// Hander Overlay click
overlay.addEventListener("click", () => {
  detectOverlay(false);
  menu.classList.remove("--show");
});

// Handler menu button click
document.querySelectorAll("[data-header-toggler]").forEach((button) => {
  button.addEventListener("click", () => {
    if (menu.classList.contains("--show")) {
      menu.classList.remove("--show");
      detectOverlay(false);
    } else {
      menu.classList.add("--show");
      detectOverlay(true);
    }
  });
});

// Handle menu link and background clicks
document.querySelectorAll("[data-header-link]").forEach((element) => {
  element.addEventListener("click", () => {
    menu.classList.remove("--show");
    detectOverlay(false);
  });
});

// ===== href fadeout =====
document.addEventListener("click", function (e) {
  const link = e.target.closest(
    'a:not([href^="#"]):not([target]):not([href^="mailto"]):not([href^="tel"])'
  );
  if (!link) return;

  e.preventDefault();
  const url = link.getAttribute("href");

  if (url && url !== "") {
    const idx = url.indexOf("#");
    const hash = idx !== -1 ? url.substring(idx) : "";

    if (hash && hash !== "#") {
      try {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          return false;
        }
      } catch (err) {
        console.error("Invalid hash selector:", hash, err);
      }
    }

    document.body.classList.add("fadeout");
    setTimeout(function () {
      window.location = url;
    }, 500);
  }

  return false;
});

// ===== hide reservation =====
const [reservation, footer] = [
  document.querySelector("[data-reservation]"),
  document.querySelector("[data-footer]"),
];
"pageshow scroll".split(" ").forEach((evt) => {
  window.addEventListener(evt, () => {
    const footerInView = footer.offsetTop;
    if (window.scrollY + window.innerHeight >= footerInView) {
      reservation.classList.add("--hidden");
    } else {
      reservation.classList.remove("--hidden");
    }
  });
});

// ### ===== DOMCONTENTLOADED ===== ###
window.addEventListener("DOMContentLoaded", init);
