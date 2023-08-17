import React, { useContext } from "react";
import Header from "../Components/Header";
import { Outlet } from "react-router-dom";
import { Container, Paper } from "@mui/material";
import { API, MoviesContext } from "../Context/MoviesContext";
import Error from "../Components/Error";
import { mood } from "../Data";

export default function Layout() {
  const { movies, setMovies, setSearched } = useContext(MoviesContext);

  const fetchDefaultMovies = () => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => {
        <Error
          text={"Error in fetching Movies: " + error}
          mood={mood.surprised}
        />;
      });
  };

  const handleSearch = (event) => {
    const searchedString = event.target.value;

    if (searchedString.length === 0) {
      fetchDefaultMovies();
      setSearched([]);
      return;
    }

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=7b0d1536c78ed232ff4f9e9b88c32865&query=${searchedString}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK!");
        }
        return response.json();
      })
      .then((data) => {
        const results = data.results;

        const filteredMovies = results.filter((movie) =>
          movie.title.toLowerCase().includes(searchedString.toLowerCase())
        );

        setSearched(filteredMovies);
        setMovies(filteredMovies);
      })
      .catch((error) => {
        console.error("Error fetching Search results:", error);
      });
  };

  const sortAsAscending = () => {
    setMovies([
      ...movies.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        return 0;
      }),
    ]);
  };

  const sortAsDescending = () => {
    setMovies([
      ...movies.sort((a, b) => {
        if (a.title > b.title) {
          return -1;
        }
        return 0;
      }),
    ]);
  };

  return (
    <>
      <Paper
        sx={{
          backgroundImage: `url(${"/Img/endless-constellation.svg"})`,
          backgroundAttachment: "fixed",
          minHeight: "100vh",
        }}
      >
        <Header
          searchHandler={handleSearch}
          onAscend={sortAsAscending}
          onDescend={sortAsDescending}
        />

        <Container
          sx={{
            pt: 10,
            pb: 2.5,
          }}
        >
          <Outlet />
        </Container>
      </Paper>
    </>
  );
}
