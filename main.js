
// Variables
const API_KEY = "989dc5c9";
btn = document.getElementById("search");
const my_movies = document.getElementById("movies");


// Search Function
btn.onclick = function () {
  let name = document.getElementById("search_bar").value;
  my_movies.innerHTML = `<h3 class = "loading"> Loading... </h3>`;

  fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${name}`)
    .then((res) => res.json())
    .then((data) => {
      setTimeout(() => {
        if (data.Search) {
           my_movies.innerHTML = "";
          my_movies.classList.remove("movies");
          my_movies.classList.add("moviesaftersearch");
          data.Search.forEach((movie) => {
            // if the movie has a photo
            if (movie.Poster !== "N/A") {
              my_movies.innerHTML += `
            <div class="card">
                <img src="${movie.Poster}">
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
            </div>
            `;
            }
          });
        } else {
            alert("Movie Not Found");
        }
      }, 2000);
    });
};



// press enter
document.getElementById("search_bar").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    btn.click();
  }
});
