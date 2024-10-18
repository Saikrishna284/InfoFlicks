async function getSearchData(search, myApiKey) {
  const searchUrl = `https://api.themoviedb.org/3/search/multi?query=${search}&include_adult=false&language=en-US&page=1'&api_key=${myApiKey}`;
  const response = await fetch(searchUrl);
  const data = await response.json();
  displaySearchResults(data.results);
}

function searchData() {
  let search = searchInput.value.trim();
  if (search.length > 0) {
    getSearchData(search, myApiKey);
    searchList.classList.remove("hide-search-list");
  } else {
    searchList.classList.add("hide-search-list");
  }
}

function displaySearchResults(result) {
  searchList.innerHTML = "";
  if (result.length > 0) {
    result.forEach((flick) => {
      if (Object.hasOwn(flick, "title")) {
        let { id, poster_path, title, release_date, media_type } = flick;
        if (media_type != "person") {
          if (release_date != undefined) {
            release_date = release_date.slice(0, 4);
          } else {
            release_date = "";
          }

          const anchortag = document.createElement("a");
          anchortag.id = "anchor-tag";
          anchortag.href = `infopageMovie.html?id=${id}`;
          searchList.appendChild(anchortag);
          const searchContainer = document.createElement("div");
          searchContainer.className = "search-container";

          if (poster_path != null) {
            searchContainer.innerHTML = `<img id="search-poster" src="${
              posterUrl + poster_path
            }" alt="" />
            <p id="movie-title">${title}</p>
            <p>${release_date}</p>
          </div>`;
          } else {
            searchContainer.innerHTML = `<img id="search-poster" src="posternotfound.jpeg" alt="" />
            <p id="movie-title">${title}</p>
            <p>${release_date}</p>
          </div>`;
          }

          anchortag.appendChild(searchContainer);
        }
      } else {
        let { id, poster_path, name, first_air_date, media_type } = flick;
        if (media_type != "person") {
          if (first_air_date != undefined) {
            first_air_date = first_air_date.slice(0, 4);
          } else {
            first_air_date = "";
          }
          const anchortag = document.createElement("a");
          anchortag.id = "anchor-tag";
          anchortag.href = `infopageTv.html?id=${id}`;
          searchList.appendChild(anchortag);
          const searchContainer = document.createElement("div");
          searchContainer.className = "search-container";
          if (poster_path != null) {
            searchContainer.innerHTML = `<img id="search-poster" src="${
              posterUrl + poster_path
            }" alt="" />
            <p id="movie-title">${name}</p>
            <p>${first_air_date}</p>
          </div>`;
          } else {
            searchContainer.innerHTML = `<img id="search-poster" src="posternotfound.jpeg" alt="" />
            <p id="movie-title">${name}</p>
            <p>${first_air_date}</p>
          </div>`;
          }
          anchortag.appendChild(searchContainer);
        }
      }
    });
  } else {
    const searchContainer = document.createElement("div");
    searchContainer.className = "search-container";
    searchContainer.innerHTML = `<p>No Results</p>`;
    searchList.appendChild(searchContainer);
  }
}
