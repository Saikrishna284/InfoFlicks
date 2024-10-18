const myApiKey = `9eb5cad426ec0a993b098ec9be833032`;
const posterUrl = `https://image.tmdb.org/t/p/w500`;
const header = document.querySelector(".header");
const container = document.querySelector(".container");
const searchList = document.querySelector(".search-list");
const submitBtn = document.getElementById("submit-btn");
const searchInput = document.getElementById("search-input");
const headerIcon = document.getElementById("header-icon");
searchList.classList.add("hide-search-list");
let toggle = "off";

header.addEventListener("click", () => {
  searchList.classList.add("hide-search-list");
});

container.addEventListener("click", () => {
  searchList.classList.add("hide-search-list");
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (toggle == "off") {
    searchInput.style.display = "initial";
    headerIcon.src = "clearicon.png";
    toggle = "on";
  } else if (toggle == "on") {
    searchInput.style.display = "none";
    headerIcon.src = "searchicon.png";
    toggle = "off";
  }
});
