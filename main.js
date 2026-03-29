const API_KEY = "989dc5c9";
const btn = document.getElementById("search");
const searchBar = document.getElementById("search_bar");
const moviesContainer = document.getElementById("movies");
const upButton = document.getElementById("Up");
const clearBtn = document.getElementById("Clear");

// handle reload if there was a search in the local storage

const searchHistory = JSON.parse(localStorage.getItem("MoviesResult"));
const lastSearch = localStorage.getItem("LastQuery");
console.log(typeof searchHistory);
console.log(searchHistory);
if (searchHistory !== null) {
  renderMovies(searchHistory, lastSearch);
}

clearBtn.onclick = function () {
  const searchHistory = JSON.parse(localStorage.getItem("MoviesResult"));

  if (!searchHistory || searchHistory.length === 0) {
    alert("History is already empty");
    return;
  }

  if (!confirm("Are you sure you want to clear results?")) return;

  // add animation
  moviesContainer.classList.add("fade-out");

  setTimeout(() => {
    localStorage.removeItem("MoviesResult");
    localStorage.removeItem("LastQuery");
    localStorage.removeItem("selectedOne");

    moviesContainer.classList.remove("moviesaftersearch", "fade-out");
    moviesContainer.classList.add("movies");

    moviesContainer.innerHTML = `
      <div class="text">
        <h2 id="info1">Here is your Movie Search App</h2>
        <p id="info2">Type your Movie Title To get Information About it</p>
      </div>
    `;

    searchBar.value = "";
  }, 600);
};

function setLoading() {
  moviesContainer.classList.remove("movies");
  moviesContainer.classList.add("moviesaftersearch");
  moviesContainer.innerHTML = `<h3 class="loading">Loading...</h3>`;
}

function showMessage(message) {
  moviesContainer.classList.remove("movies");
  moviesContainer.classList.add("moviesaftersearch");
  moviesContainer.innerHTML = `<div class="no-results">${message}</div>`;
}

function MovieDetailsPage(id) {
  const titleOfMovie = document.getElementById(id);
  console.log(titleOfMovie);
  console.log(`id: ${titleOfMovie.id}`);
  const movieNumber = titleOfMovie.id;
  const moviesRes = localStorage.getItem("MoviesResult");
  const moviesResArray = JSON.parse(moviesRes);

  const selectedMovie = moviesResArray[movieNumber];
  localStorage.setItem("selectedOne", JSON.stringify(selectedMovie));
  console.log(moviesResArray[movieNumber].Title);
  console.log(moviesResArray[movieNumber].Poster);
  console.log(moviesResArray[movieNumber].Year);
  console.log(moviesResArray[movieNumber].Type);
  window.location.href = "./movie-Details.html";
}

function renderMovies(movies, query) {
  console.log(typeof movies);
  moviesContainer.classList.remove("movies");
  moviesContainer.classList.add("moviesaftersearch");
  let count = -1;

  const cards = movies
    .map((movie) => {
      count++;

      const poster =
        movie.Poster !== "N/A"
          ? movie.Poster
          : "https://via.placeholder.com/400x600/0d2238/ffffff?text=No+Image";

      const typeLabel = movie.Type
        ? movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)
        : "Unknown";

      return `
        <div class="card">
          <img src="${poster}" alt="Poster for ${movie.Title}" />
          <h3 id="movieTitle">${movie.Title}</h3>
          <div class="movie-meta">
            <span>${typeLabel}</span>
            <span>${movie.Year}</span>
            <button class="btn showDetailsBtn" id= "${count}" onclick="MovieDetailsPage(${count})">Show Details</button>
          </div>
        </div>
      `;
    })
    .join("");

  moviesContainer.innerHTML = `
    <div class="results-header">
      <p>Showing ${movies.length} results for <strong>"${query}"</strong></p>
    </div>
    ${cards}
  `;
}

async function getData(movieName) {
  btn.disabled = true;
  btn.textContent = "Searching...";

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(movieName)}`,
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (data.Response === "True" && data.Search?.length > 0) {
      console.log(data.Search);
      localStorage.setItem("MoviesResult", JSON.stringify(data.Search));
      localStorage.setItem("LastQuery", movieName);

      renderMovies(data.Search, movieName);
    } else {
      showMessage(
        `Sorry, we couldn't find any movies matching <strong>"${movieName}"</strong>. Try another title or check for typos.`,
      );
    }
  } catch (error) {
    console.error("error:", error);
    showMessage("Unable to fetch results right now. Please try again later.");
  } finally {
    btn.disabled = false;
    btn.textContent = "Search";
  }
}

function handleSearch() {
  const movieName = searchBar.value.trim();

  if (!movieName) {
    showMessage("Please enter a movie title.");
    searchBar.focus();
    return;
  }

  setLoading();
  getData(movieName);
}

btn.addEventListener("click", handleSearch);

searchBar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleSearch();
  }
});

window.addEventListener("scroll", () => {
  upButton.style.display = window.scrollY > 250 ? "block" : "none";
});

upButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
