"use strict";

// ===== init =====
const homepage = () => {
  // # init loading
  initLoading();
};

// ===== init loading =====
const preventScroll = (e) => e.preventDefault();
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const initLoading = async () => {
  if (sessionStorage.getItem("opening-displayed") === "true") {
    document.querySelector("[data-loading]").remove();
  } else {
    // # Block scroll events
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("scroll", preventScroll, { passive: false });
    window.addEventListener(
      "keydown",
      (e) => {
        if ([32, 37, 38, 39, 40].includes(e.keyCode)) {
          e.preventDefault();
        }
      },
      { passive: false }
    );

    // # step 1 -- fadein logo
    await delay(300);
    document.querySelector("[data-loading-logo]").classList.add("--show");

    // # step 2 -- fadeout background
    await delay(1500);
    document.querySelector("[data-loading]").classList.add("--done");

    // # Unblock scroll events
    window.removeEventListener("wheel", preventScroll);
    window.removeEventListener("touchmove", preventScroll);
    window.removeEventListener("scroll", preventScroll);
    window.removeEventListener("keydown", preventScroll);

    // # set sessionStorage
    sessionStorage.setItem("opening-displayed", !0);
  }
};

// ### ===== DOMCONTENTLOADED ===== ###
window.addEventListener("DOMContentLoaded", homepage);
