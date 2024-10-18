const popularTvUrl = `https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&api_key=${myApiKey}`;
const scrollLeftPTv = document.getElementById("scroll-left-btn-popular-tv");
const scrollRightPTv = document.getElementById("scroll-right-btn-popular-tv");
const popularTvContainer = document.querySelector(".popular-tv-container");

scrollLeftPTv.addEventListener("click", () => {
  popularTvContainer.scrollBy(-350, 0);
});

scrollRightPTv.addEventListener("click", () => {
  popularTvContainer.scrollBy(350, 0);
});

async function getPTvData(url) {
  const response = await fetch(url);
  const data = await response.json();
  displayPopularTv(data.results);
}
function displayPopularTv(popularTv) {
  popularTv.forEach((tv) => {
    const popularEachTvContainer = document.createElement("div");
    popularEachTvContainer.id = "popular-each-tv-container";
    popularTvContainer.appendChild(popularEachTvContainer);
    const anchortag = document.createElement("a");
    anchortag.id = "anchor-tag";
    anchortag.href = `infopageTv.html?id=${tv.id}`;
    popularEachTvContainer.appendChild(anchortag);
    const poster = document.createElement("img");
    poster.id = "poster";
    anchortag.appendChild(poster);
    if (tv.poster_path != null) {
      poster.src = posterUrl + `${tv.poster_path}`;
    } else {
      poster.src = "posternotfound.jpeg";
    }
    poster.src = posterUrl + `${tv.poster_path}`;
    poster.alt = "poster";
    const pTvName = document.createElement("h5");
    anchortag.appendChild(pTvName);
    pTvName.innerText = `${tv.name}`;
  });
}
getPTvData(popularTvUrl);
