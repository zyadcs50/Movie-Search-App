const API_KEY = "989dc5c9";
const movieSelected = JSON.parse(localStorage.getItem("selectedOne"));
const MovieDiv = document.querySelector(".Movie-details");



async function getMovieDetails() {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieSelected.imdbID}`,
    );

    const data = await response.json();

    console.log(data);

    if (data.Response === "True") {
      console.log("true");
      console.log(data);
      renderMovieData(data);
    } else {
      console.log("false");
    }
  } catch (error) {
    console.error(error);
    MovieDiv.innerHTML = `<p class="no-data">Unable to load movie details.</p>`;
  }
}


function renderMovieData(movie) {
  const poster =
    movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/400x600/0d2238/ffffff?text=No+Image";

  MovieDiv.innerHTML = `
                <a href="index.html" class="back-btn">← Back to Search</a>
                
          <div class="card">
            <img src="${poster}" alt="Poster for ${movie.Title}" />

            <div class="card-content">
              <h1>${movie.Title}</h1>

              <div class="movie-meta">
                <span>${movie.Year}</span>
                <span>${movie.Rated}</span>
                <span>${movie.Runtime}</span>
                <span>${movie.Type}</span>
                </div>
                
                <div class="movie-meta">
                    <span>${movie.Genre}</span>
                    <span>⭐ IMDb: ${movie.imdbRating}</span>
                    </div>
                    
                    <p class="movie-description">${movie.Plot}</p>
                    
                    <div class="extra-info">
                        <p><strong>Actors:</strong> ${movie.Actors}</p>
                <p><strong>Director:</strong> ${movie.Director}</p>
                <p><strong>Writer:</strong> ${movie.Writer}</p>
                <p><strong>Released:</strong> ${movie.Released}</p>
                <p><strong>Language:</strong> ${movie.Language}</p>
                <p><strong>Country:</strong> ${movie.Country}</p>
                <p><strong>Awards:</strong> ${movie.Awards}</p>
                </div>
                </div>
                </div>
                `;
}
getMovieDetails();
