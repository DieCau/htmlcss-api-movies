const getMovies = async () => {
  const apiId = "4395bc843bd79c6c20bf0ef20213cf79";

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiId}&language=es-ES`
    );

    if (response.status === 200) {
      const dataMovies = await response.json();

      let movies = "";
      dataMovies.results.forEach((movie) => {
        movies += `
            <div class="movie">
                <img class="poster" 
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}" />
            </div>
            <h3 class="title">${movie.title}</h3>
        `;
      });
      document.getElementById("container").innerHTML = movies;
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
