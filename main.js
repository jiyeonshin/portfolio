"use strict";

const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

const home = document.querySelector("#home");
const homeHeight = home.getBoundingClientRect().height;

const navbarChangeHeight = homeHeight - navbarHeight;

// navbar backgrond color change when scrolling
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarChangeHeight) {
    navbar.classList.add("navbar__dark");
  } else {
    navbar.classList.remove("navbar__dark");
  }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");

navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link || target.parentNode.dataset.link;
  if (link == null) {
    return;
  }

  scrollIntoView(link);
});

// when click home contact button, move to contact section
const homeContactBtn = document.querySelector(".home__contact-container");
homeContactBtn.addEventListener("click", (e) => {
  scrollIntoView("#contact");
});

// function : scrolling
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}
