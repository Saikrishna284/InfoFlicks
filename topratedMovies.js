const topratedMovieUrl = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${myApiKey}`;
const scrollLeftTrMovie = document.getElementById(
  "scroll-left-btn-toprated-movie"
);
const scrollRightTrMovie = document.getElementById(
  "scroll-right-btn-toprated-movie"
);
const topratedMovieContainer = document.querySelector(
  ".toprated-movie-container"
);

scrollLeftTrMovie.addEventListener("click", () => {
  topratedMovieContainer.scrollBy(-350, 0);
});

scrollRightTrMovie.addEventListener("click", () => {
  topratedMovieContainer.scrollBy(350, 0);
});

async function getTrMovieData(url) {
  const response = await fetch(url);
  const data = await response.json();
  displayTopratedMovie(data.results);
}
function displayTopratedMovie(topratedMovie) {
  topratedMovie.forEach((movie) => {
    const topratedEachMovieContainer = document.createElement("div");
    topratedEachMovieContainer.id = "toprated-each-movie-container";
    topratedMovieContainer.appendChild(topratedEachMovieContainer);
    const anchortag = document.createElement("a");
    anchortag.id = "anchor-tag";
    anchortag.href = `infopageMovie.html?id=${movie.id}`;
    topratedEachMovieContainer.appendChild(anchortag);
    const poster = document.createElement("img");
    poster.id = "poster";
    anchortag.appendChild(poster);
    if (movie.poster_path != null) {
      poster.src = posterUrl + `${movie.poster_path}`;
    } else {
      poster.src = "posternotfound.jpeg";
    }
    poster.alt = "poster";
    const trMovieName = document.createElement("h5");
    anchortag.appendChild(trMovieName);
    trMovieName.innerText = `${movie.title}`;
  });
}
getTrMovieData(topratedMovieUrl);
