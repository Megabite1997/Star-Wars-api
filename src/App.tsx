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
  const [error, setError] = useState<string | null>(null);

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

    try {
      // Fetch API doesn't treat error status codes, it will not throw a technical error.
      const response = await fetch("https://swapi.dev/api/film/");

      // Generate and throwour own error.
      if (!response.ok) {
        throw new Error(`Something went wrong ${response.status}`);
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData: movieDataType) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        setError(error.message);
      } else {
        console.log("Unexpected error", error);
      }
    }
    setIsLoading(false);
  }

  let content = <p>Found no movies</p>;

  if (movies.length > 0) {
    content = <MovieList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
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
        <div className="content">{content}</div>
      </section>
    </div>
  );
}

export default App;
