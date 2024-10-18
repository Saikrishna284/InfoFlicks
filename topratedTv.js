const topratedTvUrl = `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&api_key=${myApiKey}`;
const scrollLeftTrTv = document.getElementById("scroll-left-btn-toprated-tv");
const scrollRightTrTv = document.getElementById("scroll-right-btn-toprated-tv");
const topratedTvContainer = document.querySelector(".toprated-tv-container");

scrollLeftTrTv.addEventListener("click", () => {
  topratedTvContainer.scrollBy(-350, 0);
});

scrollRightTrTv.addEventListener("click", () => {
  topratedTvContainer.scrollBy(350, 0);
});

async function getTrTvData(url) {
  const response = await fetch(url);
  const data = await response.json();
  displayTopratedTv(data.results);
}
function displayTopratedTv(topratedTv) {
  topratedTv.forEach((tv) => {
    const topratedEachTvContainer = document.createElement("div");
    topratedEachTvContainer.id = "toprated-each-tv-container";
    topratedTvContainer.appendChild(topratedEachTvContainer);
    const anchortag = document.createElement("a");
    anchortag.id = "anchor-tag";
    anchortag.href = `infopageTv.html?id=${tv.id}`;
    topratedEachTvContainer.appendChild(anchortag);
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
    const trTvName = document.createElement("h5");
    anchortag.appendChild(trTvName);
    trTvName.innerText = `${tv.name}`;
  });
}
getTrTvData(topratedTvUrl);
