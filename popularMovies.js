const popularMovieUrl = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${myApiKey}`;
const scrollLeftPMovie = document.getElementById(
  "scroll-left-btn-popular-movie"
);
const scrollRightPMovie = document.getElementById(
  "scroll-right-btn-popular-movie"
);
const popularMovieContainer = document.querySelector(
  ".popular-movie-container"
);

scrollLeftPMovie.addEventListener("click", () => {
  popularMovieContainer.scrollBy(-350, 0);
});

scrollRightPMovie.addEventListener("click", () => {
  popularMovieContainer.scrollBy(350, 0);
});

async function getPMovieData(url) {
  const response = await fetch(url);
  const data = await response.json();
  displayPopularMovie(data.results);
}
function displayPopularMovie(popularMovie) {
  popularMovie.forEach((movie) => {
    const popularEachMovieContainer = document.createElement("div");
    popularEachMovieContainer.id = "popular-each-movie-container";
    popularMovieContainer.appendChild(popularEachMovieContainer);
    const anchortag = document.createElement("a");
    anchortag.id = "anchor-tag";
    anchortag.href = `infopageMovie.html?id=${movie.id}`;
    popularEachMovieContainer.appendChild(anchortag);
    const poster = document.createElement("img");
    poster.id = "poster";
    anchortag.appendChild(poster);
    if (movie.poster_path != null) {
      poster.src = posterUrl + `${movie.poster_path}`;
    } else {
      poster.src = "posternotfound.jpeg";
    }
    poster.alt = "poster";
    const pMovieName = document.createElement("h5");
    anchortag.appendChild(pMovieName);
    pMovieName.innerText = `${movie.title}`;
  });
}
getPMovieData(popularMovieUrl);
