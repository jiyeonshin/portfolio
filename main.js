"use strict";
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

const home = document.querySelector("#home");
const homeHeight = home.getBoundingClientRect().height;

const navbarChangeHeight = homeHeight - navbarHeight;
// navbar backgrond color change when scrolling
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// when click navbar menu item, active
// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
const navbarMenuItem = document.querySelectorAll(".navbar__menu__item");

let previousTarget = null;
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;

  if (link == null) {
    return;
  }
  scrollIntoView(link);

  // when click navbar menu item, dot move to that menu item
  if (previousTarget == null) {
    previousTarget = target;
  }
  if (target == previousTarget) {
    return;
  }
  const active = target.classList.contains("active");
  if (!active) {
    target.classList.add("active");
    previousTarget.classList.remove("active");
  }
  previousTarget = target;
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



// 1. 모든 섹션 요소들과 메뉴아이템들을 가지고 온다
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다
const sectionIds = [
  '#home',
  '#skills',
  '#work',
  '#contact',
];
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id =>
  document.querySelector(`[data-link="${id}"]`)
);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}

// function : scrolling
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      // 스크롤링이 아래로 되어서 페이지가 올라옴
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('wheel',()=>{
  if(window.scrollY === 0){
    selectedNavIndex = 0 ;

  }else if(Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight){
    selectedNavIndex = navItems.length-1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});