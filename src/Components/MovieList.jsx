import React, { useContext, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import MovieCard from "./MovieCard";
import { MoviesContext } from "../Context/MoviesContext";
import Error from "./Error";
import { mood } from "../Data";
import Loading from "./Loading";

export default function MovieList() {
  const { movies } = useContext(MoviesContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <Box>
      <Box>
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            textAlign: "center",
            textShadow: "10px 0 14px",
          }}
        >
          {isLoading ? (
            <Loading mood={mood.happy} text="Loading" />
          ) : movies?.length ? (
            "Welcome To The Station Of Movies..."
          ) : (
            <Error text="No Movies Found." mood={mood.sad} />
          )}
        </Typography>
      </Box>

      {!isLoading && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
          }}
        >
          {movies.map(
            (movie) =>
              movie.title && (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  poster={movie.poster_path}
                  title={movie.title}
                  date={movie.release_date}
                  rating={movie.vote_average}
                  linkTo={movie.id}
                />
              )
          )}
        </Box>
      )}
    </Box>
  );
}
