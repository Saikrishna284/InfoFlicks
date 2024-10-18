const trendingTvUrl = `https://api.themoviedb.org/3/trending/tv/week?language=en-US&api_key=${myApiKey}`;
const scrollLeftTtv = document.getElementById("scroll-left-btn-trending-tv");
const scrollRightTtv = document.getElementById("scroll-right-btn-trending-tv");
const trendingTvContainer = document.querySelector(".trending-tv-container");

scrollLeftTtv.addEventListener("click", () => {
  trendingTvContainer.scrollBy(-350, 0);
});

scrollRightTtv.addEventListener("click", () => {
  trendingTvContainer.scrollBy(350, 0);
});

async function getTvData(url) {
  const response = await fetch(url);
  const data = await response.json();
  displayTrendingTv(data.results);
}
function displayTrendingTv(trendingTv) {
  trendingTv.forEach((tv) => {
    const tvContainer = document.createElement("div");
    tvContainer.id = "tv-container";
    trendingTvContainer.appendChild(tvContainer);
    const anchortag = document.createElement("a");
    anchortag.id = "anchor-tag";
    anchortag.href = `infopageTv.html?id=${tv.id}`;
    tvContainer.appendChild(anchortag);
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
    const tvName = document.createElement("h5");
    anchortag.appendChild(tvName);
    tvName.innerText = `${tv.name}`;
  });
}
getTvData(trendingTvUrl);
