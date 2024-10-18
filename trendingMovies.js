const trendingMovieUrl = `https://api.themoviedb.org/3/trending/movie/week?language=en-US&api_key=${myApiKey}`;
const scrollLeftTmovie = document.getElementById(
  "scroll-left-btn-trending-movie"
);
const scrollRightTmovie = document.getElementById(
  "scroll-right-btn-trending-movie"
);
const trendingMovieContainer = document.querySelector(
  ".trending-movie-container"
);

scrollLeftTmovie.addEventListener("click", () => {
  trendingMovieContainer.scrollBy(-350, 0);
});

scrollRightTmovie.addEventListener("click", () => {
  trendingMovieContainer.scrollBy(350, 0);
});

async function getMovieData(url) {
  const response = await fetch(url);
  const data = await response.json();
  displayTrendingMovies(data.results);
}

function displayTrendingMovies(trendingMovie) {
  trendingMovie.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.id = "movie-container";
    trendingMovieContainer.appendChild(movieContainer);
    const anchortag = document.createElement("a");
    anchortag.id = "anchor-tag";
    anchortag.href = `infopageMovie.html?id=${movie.id}`;
    movieContainer.appendChild(anchortag);
    const poster = document.createElement("img");
    poster.id = "poster";
    anchortag.appendChild(poster);
    if (movie.poster_path != null) {
      poster.src = posterUrl + `${movie.poster_path}`;
    } else {
      poster.src = "posternotfound.jpeg";
    }

    poster.alt = "poster";
    const movieName = document.createElement("h5");

    anchortag.appendChild(movieName);
    movieName.innerText = `${movie.title}`;
  });
}
getMovieData(trendingMovieUrl);
