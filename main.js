// Variables
const API_KEY = '989dc5c9';
const btn = document.getElementById('search');
const searchBar = document.getElementById('search_bar');
const my_movies = document.getElementById('movies');
const UpButton = document.getElementById('Up');

function renderMovies(movies, query) {
  my_movies.innerHTML = `<div class="results-header"><p>Showing ${movies.length} results for <strong>"${query}"</strong></p></div>`;
  my_movies.classList.remove('movies');
  my_movies.classList.add('moviesaftersearch');

  movies.forEach((movie) => {
    const poster = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400x600/0d2238/ffffff?text=No+Image';
    const typeLabel = movie.Type ? movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1) : 'Unknown';

    my_movies.innerHTML += `
      <div class="card">
        <img src="${poster}" alt="Poster for ${movie.Title}" />
        <h3>${movie.Title}</h3>
        <div class="movie-meta">
          <span>${typeLabel}</span>
          <span>${movie.Year}</span>
        </div>
      </div>
    `;
  });
}

function showNoResults(query) {
  my_movies.classList.remove('movies');
  my_movies.classList.add('moviesaftersearch');
  my_movies.innerHTML = `
    <div class="no-results">
      Sorry, we couldn't find any movies matching <strong>"${query}"</strong>.
      Try another title or check for typos.
    </div>
  `;
}

async function getData(movieName) {
  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(movieName)}`);
    const data = await response.json();

    if (data.Search && data.Search.length > 0) {
      renderMovies(data.Search, movieName);
    } else {
      showNoResults(movieName);
    }
  } catch (error) {
    my_movies.innerHTML = `<div class="no-results">Unable to fetch results right now. Please try again later.</div>`;
    console.error('Search error:', error);
  }
}

btn.addEventListener('click', () => {
  const name = searchBar.value.trim();
  if (!name) {
    alert('Please enter a movie title.');
    searchBar.focus();
    return;
  }

  my_movies.innerHTML = `<h3 class="loading">Loading...</h3>`;
  getData(name);
});

window.addEventListener('scroll', () => {
  UpButton.style.display = window.scrollY > 250 ? 'block' : 'none';
});

UpButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

searchBar.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    btn.click();
  }
});
