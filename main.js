// Variables
const API_KEY = "989dc5c9";
const btn = document.getElementById("search");
const my_movies = document.getElementById("movies");
const UpButton = document.getElementById("Up");

// Fetch Data From The API
async function getData(movieName) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${movieName}`,
  );
  const data = await response.json();
  setTimeout(() => {
    if (data.Search) {
      my_movies.innerHTML = "";
      my_movies.classList.remove("movies");
      my_movies.classList.add("moviesaftersearch");
      data.Search.forEach((movie) => {
        console.log(movie);
        // if the movie has a photo
        if (movie.Poster !== "N/A") {
          my_movies.innerHTML += `
            <div class="card">
                <img src="${movie.Poster}">
                <h3>${movie.Title}</h3>
                <h4>${movie.Type}</h4>
                <p>${movie.Year}</p>
            </div>
            `;
        }
      });
    } else {
      alert("Movie Not Found");
      // return to home page
      window.location.href = "index.html";
    }
  }, 1000);
}

// Search Function
btn.onclick = function () {
  let name = document.getElementById("search_bar").value;
  if (name === "") {
    alert("Type a valid input");
    return;
  }
  my_movies.innerHTML = `<h3 class = "loading"> Loading... </h3>`;
  getData(name);
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 250) {
    UpButton.style.display = "block";
  } else {
    UpButton.style.display = "none";
  }
});

UpButton.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// press enter
document.getElementById("search_bar").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    btn.click();
  }
});
