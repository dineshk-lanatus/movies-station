import { Button, Card, CardContent, CardOverflow, Typography } from "@mui/joy";
import { CardMedia } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MoviesContext } from "../Context/MoviesContext";

export default function MovieCard(props) {
  const { setMovie } = useContext(MoviesContext);

  const getMovie = () => {
    setMovie(props.movie);
  };

  return (
    <Link to={`${props.linkTo}/movie-details`}>
      <Card
        sx={{
          m: 3,
          minWidth: { xs: 200, sm: 300 },
          maxWidth: { md: 300, xs: "100%" },
          boxShadow: "0 0 14px",
          cursor: "pointer",
          minHeight: { sm: 631, xs: "auto" },
          "&:hover": {
            boxShadow: "0 0 95px",
            transform: `scale(${1.014})`,
          },
        }}
        onClick={getMovie}
      >
        <CardMedia
          component="img"
          image={
            props.poster
              ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${props.poster}`
              : "/Img/NoImage.png"
          }
          alt="Poster"
        />

        <CardContent sx={{ display: "flex", overflowWrap: "break-word" }}>
          <Typography level="body3">{props.date}</Typography>

          <Typography fontSize="xl" fontWeight="xl" sx={{ mt: 1 }}>
            {props?.title}
          </Typography>

          <Typography fontSize="l" sx={{ mt: "auto" }}>
            <Typography fontWeight="500">Rating: </Typography>
            {props?.rating.toFixed(1)} / 10
          </Typography>
        </CardContent>

        <CardOverflow>
          <Button variant="solid" color="primary" size="lg">
            View More
          </Button>
        </CardOverflow>
      </Card>
    </Link>
  );
}
