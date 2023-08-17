import { createContext, useState, useEffect } from "react";
import Error from "../Components/Error";
import { mood } from "../Data";

export const MoviesContext = createContext();

export const MoviesContextProvider = ({ children }) => {
  const [movie, setMovie] = useState({});
  const [movies, setMovies] = useState([]);
  const [searched, setSearched] = useState([]);

  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSearched(data.results);
        setMovies(data.results);
      })
      .catch((error) => {
        <Error
          text={"Error in fetching Movies: " + error}
          mood={mood.surprised}
        />;
      });
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        movie,
        setMovie,
        movies,
        setMovies,
        searched,
        setSearched,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export const API = `https://api.themoviedb.org/3/trending/all/${"day"}?api_key=7b0d1536c78ed232ff4f9e9b88c32865&page=${1}`;
