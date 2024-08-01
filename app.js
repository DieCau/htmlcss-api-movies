const getMovies = async () => {
  const apiId = "4395bc843bd79c6c20bf0ef20213cf79";

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiId}&language=es-ES`
    );

    if (response.status === 200) {
      const dataMovies = await response.json();
      dataMovies.results.forEach((movie) => {
        console.log(movie.title);
      });
    } else if (response.status === 401) {
      console.log("Key Not Authorization");
    } else if (response.status === 404) {
      console.log("Pelicula Inexistente...");
    } else {
      console.log("Hubo un Error y No sabemos que paso!!");
    }
  } catch (error) {
    console.log(error);
  }
};

getMovies();
