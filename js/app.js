// PRELOADER
const logoLetter = document.querySelectorAll(".letter");

const tlLoader = gsap.timeline();
function destroLoader() {
  gsap.set(logoLetter, { opacity: 1 });
  setTimeout(() => {
    tlLoader.to(document.querySelector(".preloader_logo"), 0.5, {
      opacity: 0,
      stagger: 0.2,
    });
    tlLoader.to(document.querySelector(".preloader"), 1, { scaleY: 0 });
  }, 2000);
}

/// Loading effect
const tlLoaderAni = gsap.timeline();
tlLoaderAni.fromTo(
  logoLetter,
  0.5,
  { opacity: 0.3 },
  { opacity: 0.8, repeat: -1, yoyo: true, stagger: 0.4 }
);
setTimeout(destroLoader(), 4000);

// CURSOR
const cursor = document.querySelector(".cursor");
const cursorSpan = document.querySelector(".cursor span");
document.addEventListener("mousemove", (e) => {
  cursor.setAttribute(
    "style",
    "top: " + e.pageY + "px; left: " + e.pageX + "px;"
  );
});

document.addEventListener("scroll", (e) => {
  if (scrollY > 400) {
    gsap.set(document.querySelector(".hero_like"), { opacity: 0 });
  } else {
    gsap.set(document.querySelector(".hero_like"), { opacity: 1 });
  }
});

// nav
const navList = document.querySelector(".nav_list");
const navItem = document.querySelectorAll(".nav_item");
const hamburger = document.querySelector(".hamburger");
const hamburgerSpan = document.querySelector(".hamburger_label-open");
const hamburgerLabel = document.querySelector(".hamburger_label");

const tl = gsap.timeline();
gsap.set(navList, { x: "100%", opacity: 0 });

hamburger.addEventListener("click", () => {
  if (hamburger.classList.contains("active")) {
    hamburger.classList.remove("active");
    tl.fromTo(
      navItem,
      0.75,
      { opacity: 1, y: "0%" },
      { opacity: 0, y: "-100%", stagger: 0.07, ease: Expo.easeOut }
    );
    tl.fromTo(
      navList,
      0.25,
      { x: "0%", opacity: 1 },
      { x: "-100%", opacity: 0 }
    );
    hamburgerLabel.classList.remove("active");
    hamburgerSpan.textContent = "Open";
  } else {
    hamburger.classList.add("active");
    tl.fromTo(navList, 0.1, { x: "100%", opacity: 0 }, { x: "0%", opacity: 1 });
    tl.fromTo(
      navItem,
      0.75,
      { opacity: 0, y: "100%" },
      { opacity: 1, y: "0%", stagger: 0.07, ease: Expo.easeOut }
    );
    hamburgerLabel.classList.add("active");
    hamburgerSpan.textContent = "Close";
  }
});

// PROJECTS
const projects = document.querySelectorAll(".project");
const projectCont = document.querySelector(".project_container");

// POSITIONING PROJECTS
for (i = 0; i < projects.length; i++) {
  projects[i].style.gridArea = `project-${i + 1}`;
}

projects.forEach((project) => {
  const projectTitle = project.querySelector(".project_title");
  const projectDesc = project.querySelector(".project_description");
  const projectBody = project.querySelector(".project_body");
  const projectPic = project.querySelector(".project_pic");

  // SETTING DESCRIPTION HIDDEN
  gsap.set(projectDesc, { y: 30, opacity: 0 });
  gsap.set(projectTitle, { y: 30 });
  // SETTING HOVER EFFECT
  projectPic.addEventListener("mouseover", (e) => {
    gsap.fromTo(projectTitle, { y: 30 }, { y: 0 });
    gsap.fromTo(projectDesc, { y: 30, opacity: 0 }, { y: 0, opacity: 1 });
    // CURSOR EFFECT
    cursorSpan.innerHTML = "View </br> Poject";
    cursor.classList.add("view_project");
  });
  // RESET DESCRIPTION ON MOUSE LEAVE
  projectPic.addEventListener("mouseout", (e) => {
    gsap.fromTo(projectTitle, { y: 0 }, { y: 30 });
    gsap.fromTo(projectDesc, { y: 0, opacity: 1 }, { y: 30, opacity: 0 });
    // CURSOR EFFECT
    cursorSpan.innerHTML = "";
    cursor.classList.remove("view_project");
  });
});

// FILTER
const filter = document.querySelector(".project_filter");
const filterList = document.querySelector(".filter_list");
const filterItem = document.querySelectorAll(".filter_item");
const filterContainer = document.querySelector(".filter_item_container");

const tlf = gsap.timeline();
gsap.set(filterList, { x: "100%", opacity: 0 });

filter.addEventListener("click", () => {
  filter.classList.add("active");
  tlf.fromTo(
    filterList,
    0.05,
    { x: "100%", opacity: 0 },
    { x: "0%", opacity: 1 }
  );
  tlf.fromTo(
    filterItem,
    0.75,
    { opacity: 0, y: "100%" },
    { opacity: 1, y: "0%", stagger: 0.07, ease: Expo.easeOut }
  );
  tlf.to(filter, 0.25, { opacity: 0, y: "100%" }, "<20%");
});

filterList.addEventListener("click", () => {
  if (filter.classList.contains("active")) {
    tl.fromTo(
      filterItem,
      0.75,
      { opacity: 1, y: "0%" },
      { opacity: 0, y: "-100%", stagger: 0.07, ease: Expo.easeOut }
    );
    tl.fromTo(
      filterList,
      0.1,
      { x: "0%", opacity: 1 },
      { x: "-100%", opacity: 0 }
    );
    tlf.to(filter, {
      opacity: 1,
      y: 0,
    });
    filter.classList.remove("active");
  }
});

filterContainer.addEventListener("mouseover", () => {
  cursorSpan.innerHTML = "";
  cursor.classList.remove("cancel");
});

filterList.addEventListener("mouseover", () => {
  cursorSpan.innerHTML = "Cancel";
  cursor.classList.add("cancel");
});
filterList.addEventListener("mouseleave", () => {
  cursorSpan.innerHTML = "";
  cursor.classList.remove("cancel");
});

document.addEventListener("scroll", (e) => {
  console.log(scrollY);
  if (scrollY < 650 || scrollY > 2650) {
    gsap.set(filter, { opacity: 0 });
  } else {
    gsap.set(filter, { opacity: 1 });
  }
});

// FILTER ITEM CLICK
const filterItems = document.querySelectorAll(".filter_item");
filterItems.forEach((item) => {
  item.addEventListener("click", () => {
    projectCont.className = "project_container";
    projectCont.classList.add(item.getAttribute("data-type"));
  });
});

// LINKS HOVER
const links = document.querySelectorAll(".link");
links.forEach((link) => {
  link.addEventListener("mouseover", () => {
    cursor.classList.add("link_hover");
  });
  link.addEventListener("mouseleave", () => {
    cursor.classList.remove("link_hover");
  });
});

// LET'S TALK HOVER EFFECT
const letsTalk = document.querySelector(".footer_text");
letsTalk.addEventListener("mouseover", () => {
  cursor.classList.add("lets_talk");
});
letsTalk.addEventListener("mouseleave", () => {
  cursor.classList.remove("lets_talk");
});
