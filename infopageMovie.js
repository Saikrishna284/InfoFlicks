const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const posterContainer = document.querySelector(".poster-container");
const titleContainer = document.querySelector(".title-container");
const rating = document.getElementById("rating");
const overviewOfMovie = document.getElementById("overview");
const directorOfMovie = document.getElementById("director");
const originalLanguage = document.getElementById("original-language");
const originalTitle = document.getElementById("original-title");
const streaming = document.querySelector(".streaming");
const movieCast = document.querySelector(".cast");
const mediatype = window.matchMedia("(max-width: 430px)");

const myApiKey = `9eb5cad426ec0a993b098ec9be833032`;
const posterUrl = `https://image.tmdb.org/t/p/w500`;
let genresOfMovie = "";

async function getInfo(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits&language=en-US'&api_key=${myApiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  displayInfo(data);
}
getInfo(id);
function displayInfo(data) {
  let {
    backdrop_path,
    poster_path,
    title,
    release_date,
    genres,
    runtime,
    vote_average,
    overview,
    credits,
    original_language,
    original_title,
  } = data;

  let backdropUrl = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url('${
    posterUrl + backdrop_path
  }'`;
  document.body.style.backgroundImage = `${backdropUrl}`;
  if (poster_path != null) {
    posterContainer.innerHTML = `<img id="poster" src="${
      posterUrl + poster_path
    }" alt="image Not Found" />
 `;
  } else {
    posterContainer.innerHTML = `<img id="poster" src="posternotfound.jpeg" alt="image Not Found" />
 `;
  }

  genres.forEach((genre) => {
    genresOfMovie += genre.name + ", ";
  });
  let time = convertRuntime(runtime);

  titleContainer.innerHTML = `<h1 id="title">${title}<span id="year">(${release_date.slice(
    0,
    4
  )})</span></h1>
          <h4>
            <span id="genres">&#x2022; &nbsp;${genresOfMovie.slice(
              0,
              genresOfMovie.length - 2
            )}</span>
            <span id="runtime">&ensp;&#x2022; &nbsp;${time.hrs}h ${
    time.mins
  }m</span>
          </h4>`;

  rating.innerText = vote_average.toFixed(1);

  overviewOfMovie.innerText = overview;
  displayCrew(credits.crew);
  originalLanguage.innerText = original_language;
  originalTitle.innerText = original_title;
  displayWatchProviders(id);
  displayCast(credits.cast);
}

function convertRuntime(runtime) {
  let totalTime = runtime / 60;
  let hrs = Math.trunc(totalTime);
  let remainingMins = totalTime - hrs;
  let mins = Math.round(remainingMins * 60);
  return { hrs, mins };
}

function displayCrew(crew) {
  crew.forEach((crew) => {
    if (crew.department == "Directing" && crew.job == "Director") {
      directorOfMovie.innerText = `${crew.name}`;
    }
  });
}

async function displayWatchProviders(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}/watch/providers?append_to_response=credits&language=en-US'&api_key=${myApiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  try {
    let watchProviders = data.results.IN.flatrate;
    watchProviders.forEach((provider) => {
      if (mediatype.matches) {
        if (watchProviders.length < 2) {
          streaming.style.width = "50%";
        } else if (watchProviders.length < 4) {
          streaming.style.width = "80%";
        }
      }
      let { logo_path, provider_name } = provider;
      const imgEl = document.createElement("img");
      imgEl.src = `${posterUrl + logo_path}`;
      imgEl.alt = `${provider_name}`;
      streaming.appendChild(imgEl);
    });
  } catch (error) {
    const para = document.createElement("p");
    streaming.appendChild(para);
    para.innerText = "Not Available";
  }
}

function displayCast(cast) {
  cast.forEach((cast) => {
    let { profile_path, character, name } = cast;
    const eachMember = document.createElement("div");
    eachMember.className = "each-member";
    if (profile_path != null) {
      eachMember.innerHTML = ` <img src="${
        posterUrl + profile_path
      }" alt="${name}" />
              <h5>${name}</h5>
              <p>${character}</p>`;
    } else {
      eachMember.innerHTML = ` <img src="nullcast.jpg" alt="${name}" />
              <h5>${name}</h5>
              <p>${character}</p>`;
    }

    movieCast.appendChild(eachMember);
  });
}
