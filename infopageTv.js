const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const posterContainer = document.querySelector(".poster-container");
const titleContainer = document.querySelector(".title-container");
const rating = document.getElementById("rating");
const overviewOfTv = document.getElementById("overview");
const creator = document.getElementById("creator");
const originalLanguage = document.getElementById("original-language");
const seasons = document.getElementById("seasons");
const streaming = document.querySelector(".streaming");
const movieCast = document.querySelector(".cast");
const mediatype = window.matchMedia("(max-width: 430px)");

const myApiKey = `9eb5cad426ec0a993b098ec9be833032`;
const posterUrl = `https://image.tmdb.org/t/p/w500`;
let genresOfTv = "";
let creators = "";

async function getInfo(id) {
  const url = `https://api.themoviedb.org/3/tv/${id}?append_to_response=credits&language=en-US'&api_key=${myApiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  displayInfo(data);
}
getInfo(id);

function displayInfo(data) {
  let {
    backdrop_path,
    poster_path,
    name,
    first_air_date,
    genres,
    vote_average,
    overview,
    created_by,
    credits,
    original_language,
    number_of_seasons,
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
    genresOfTv += genre.name + ", ";
  });

  titleContainer.innerHTML = `<h1 id="title">${name}<span id="year">(${first_air_date.slice(
    0,
    4
  )})</span></h1>
          <h4>
            <span id="genres">&#x2022; &nbsp;${genresOfTv.slice(
              0,
              genresOfTv.length - 2
            )}</span>
            </h4>`;
  rating.innerText = vote_average.toFixed(1);
  overviewOfTv.innerText = overview;
  displayCreatedby(created_by);
  originalLanguage.innerText = original_language;
  seasons.innerText = number_of_seasons;
  displayWatchProviders(id);
  displayCast(credits.cast);
}

function displayCreatedby(created_by) {
  created_by.forEach((creator) => {
    creators += creator.name + ", ";
  });
  creator.innerText = `${creators.slice(0, creators.length - 2)}`;
}

async function displayWatchProviders(id) {
  const url = `https://api.themoviedb.org/3/tv/${id}/watch/providers?append_to_response=credits&language=en-US'&api_key=${myApiKey}`;
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
