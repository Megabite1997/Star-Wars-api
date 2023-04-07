import React, { useState } from "react";

import "./App.css";
import MovieList from "./components/MovieList";

interface movieDataType {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

interface moviesType {
  id: number;
  title: string;
  openingText: string;
}

function App() {
  const [movies, setMovies] = useState<moviesType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function fetchMoviesHandler(): Promise<void> {
    // fetch("https://swapi.dev/api/films/", {
    //   method: "GET", // default method will be 'GET', can avoid of typing
    // })
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     const transformedMovies = data.results.map(
    //       (movieData: movieDataType) => {
    //         return {
    //           id: movieData.episode_id,
    //           title: movieData.title,
    //           openingText: movieData.opening_crawl,
    //         };
    //       },
    //     );
    //     setMovies(transformedMovies);
    //   });
    setIsLoading(true);

    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();
    const transformedMovies = data.results.map((movieData: movieDataType) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
      };
    });
    setMovies(transformedMovies);
    setIsLoading(false);
  }

  return (
    <div className="App">
      <section>
        <div className="button-section">
          <button className="button-click" onClick={fetchMoviesHandler}>
            Fetch Movies
          </button>
        </div>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MovieList movies={movies} />}
        {!isLoading && movies.length === 0 && (
          <p className="no-movies">There are no movies</p>
        )}
        {isLoading && <p className="loading">Loading...</p>}
      </section>
    </div>
  );
}

export default App;
