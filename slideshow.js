const slideshowContainer = document.querySelector(".slideshow-container");
let slideIndex = 1;
let slideInterval;
function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
  resetAutoSlide();
}

async function getMovieData() {
  let url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${myApiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  createSlides(data.results.slice(0, 5));
}

function createSlides(results) {
  results.forEach((movie) => {
    let { id, backdrop_path, poster_path, title, release_date, overview } =
      movie;
    const slide = document.createElement("div");
    slide.classList.add("slides", "fade");
    slideshowContainer.appendChild(slide);
    const anchortag = document.createElement("a");
    anchortag.id = "anchor-tag";
    anchortag.href = `infopageMovie.html?id=${id}`;
    slide.appendChild(anchortag);
    const backdropImg = document.createElement("img");
    backdropImg.src = posterUrl + backdrop_path;
    backdropImg.className = "backdrop";
    backdropImg.loading = "lazy";

    anchortag.appendChild(backdropImg);
    const infoContainer = document.createElement("div");
    infoContainer.className = "info-container";
    anchortag.appendChild(infoContainer);
    infoContainer.innerHTML = `<img src="${
      posterUrl + poster_path
    }" class="poster" />`;
    const info = document.createElement("div");
    info.className = "info";
    infoContainer.appendChild(info);
    info.innerHTML = `  <h1 class="title">
               ${title} <span class="year">(${release_date.slice(0, 4)})</span>
              </h1>
              
            <h3>Overview</h3>
              <p id="overview">
                ${overview} 
              </p>`;
  });
  const dotsEl = document.createElement("div");
  dotsEl.className = "dots-container";
  dotsEl.innerHTML = `<span class="dot" onclick="currentSlide(1)"></span>
          <span class="dot" onclick="currentSlide(2)"></span>
          <span class="dot" onclick="currentSlide(3)"></span>
          <span class="dot" onclick="currentSlide(4)"></span>
          <span class="dot" onclick="currentSlide(5)"></span>
        </div>`;
  slideshowContainer.appendChild(dotsEl);
  showSlides(slideIndex);
  startAutoSlide();
}

function showSlides(n) {
  let slides = document.getElementsByClassName("slides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

function startAutoSlide() {
  slideInterval = setInterval(() => {
    plusSlides(1);
  }, 5000);
}

function resetAutoSlide() {
  clearInterval(slideInterval);
  startAutoSlide();
}

getMovieData();
