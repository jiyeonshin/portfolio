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

// About arrow up button
// show arrow button when scrolling down
const arrowUpBtn = document.querySelector("#arrow__up");
document.addEventListener("scroll", () => {
  if (scrollY > homeHeight / 2) {
    arrowUpBtn.classList.add("visible");
  } else {
    arrowUpBtn.classList.remove("visible");
  }
});

// when click arrow btn move to home
arrowUpBtn.addEventListener("click", (e) => {
  scrollIntoView("#home");
});

// function : scrolling
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}
