let page = 1;
let movies = "";
let lastMovie;

let observer = new IntersectionObserver(
  (input, observer) => {
    input.forEach(input => {
      if (input.isIntersecting) {
        page++;
        getMovies();
      }
    });
  },
  {
    rootMargin: "0px 0px 200px 0px",
    threshold: 1.0,
  }
);
// const btnPrevius = document.getElementById("btnPrevius");
// const btnNext = document.getElementById("btnNext");

// btnNext.addEventListener("click", () => {
//   if (page < 1000) {
//     page += 1;
//     getMovies();
//   }
// });

// btnPrevius.addEventListener("click", () => {
//   if (page > 1) {
//     page -= 1;
//     getMovies();
//   }
// });

const getMovies = async () => {
  const apiId = "4395bc843bd79c6c20bf0ef20213cf79";

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiId}&language=es-MX&page=${page}`
    );

    if (response.status === 200) {
      const dataMovies = await response.json();

      dataMovies.results.forEach((movie) => {
        movies += `
            <div class="movie">
                <img class="poster" 
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}" />
                <h3 class="title">${movie.title}</h3>
            </div>
        `;
      });
      document.getElementById("container").innerHTML = movies;

      if (page < 1000) {
        if (lastMovie) {
          observer.unobserve(lastMovie);
        }
        const moviesOnScreen = document.querySelectorAll(".container .movie");
        lastMovie = moviesOnScreen[moviesOnScreen.length - 1];
        observer.observe(lastMovie);
      }
    
    } else if (response.status === 401) {
      console.log("Key Not Authorization");
    } else if (response.status === 404) {
      console.log("Movie Not Found...");
    } else {
      console.log("Has Error Anything!!");
    }
  } catch (error) {
    console.log(error);
  }
};

getMovies();
