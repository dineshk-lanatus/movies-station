import React, { useContext, useEffect, useState } from "react";
import { Button, Card, CardContent } from "@mui/joy";
import {
  Backdrop,
  Box,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { ArrowBackIosNewRounded, SmartDisplay } from "@mui/icons-material";
import TrailerCard from "../Components/TrailerCard";
import { useNavigate } from "react-router-dom";
import { MoviesContext } from "../Context/MoviesContext";
import Error from "../Components/Error";
import { mood } from "../Data";

export default function MovieDetails(props) {
  const { movie, setMovie } = useContext(MoviesContext);
  const [open, setOpen] = useState(false);
  const [trailer, setTrailer] = useState();
  const navigate = useNavigate();

  let trailerContent = trailer;

  const posterURL = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2";
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}?api_key=7b0d1536c78ed232ff4f9e9b88c32865&append_to_response=videos,credits`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
      })
      .catch((error) => {
        <Error
          text={"Error fetching movie details: " + error}
          mood={mood.surprised}
        />;
      });
  }, [movie.id, setMovie]);

  const getYouTubeTrailerKey = () => {
    const youtubeTrailer = movie?.videos?.results.find(
      (video) =>
        video.name.includes("Official Trailer") ||
        video.name.includes("Final Trailer" || "Trailer")
    );
    console.log("Trailer Info:", youtubeTrailer);
    return youtubeTrailer?.key || null;
  };

  const trailerKey = getYouTubeTrailerKey();

  const handleOpen = () => {
    if (trailerKey) {
      setOpen(true);
      setTrailer(<TrailerCard onClose={handleClose} trailerKey={trailerKey} />);
    } else {
      window.open(
        `https://www.youtube.com/results?search_query=${movie?.title}`
      );
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTrailer(null);
  };

  console.log(movie.credits);

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        backgroundColor: "#181414",
        borderRadius: "1.4rem",
        flexDirection: {
          md: "row",
          xs: "column",
        },
        alignItems: "center",
        position: "relative",
      }}
    >
      <ArrowBackIosNewRounded
        sx={{
          bgcolor: "white",
          borderRadius: "50%",
          fill: "#1565C0",
          p: "6px 5px",
          textAlign: "center",
          "&:hover": {
            boxShadow: "0 0 14px grey",
            transform: `scale(1.09)`,
          },
          position: "absolute",
          left: 10,
          top: 10,
        }}
        onClick={() => {
          navigate(-1);
        }}
      />

      <Card
        sx={{
          maxWidth: 266,
          width: 266,
          maxHeight: 473,
          height: 470,
          boxShadow: "none",
          background: "transparent",
          mr: { md: 6, xs: 0 },
          ml: { md: 4, xs: 0 },
          mt: { sm: 0, xs: 4 },
        }}
      >
        <CardMedia
          component="img"
          image={
            movie?.poster_path
              ? `${posterURL}${movie.poster_path}`
              : "/Img/NoImage.png"
          }
          alt="Poster"
          height="82%"
          sx={{
            objectFit: "contain",
            borderRadius: "14px",

            "&:hover": {
              boxShadow: "0 0 95px",
              transform: `scale(${1.054})`,
              backgroundImage: movie?.poster_path
                ? `url(${posterURL}${movie.poster_path})`
                : `url("/Img/NoImage.png")`,
            },
          }}
        />

        <Button
          onClick={handleOpen}
          sx={{
            mt: 4,
            "&:hover svg": {
              fill: "#FF0000",
            },
          }}
        >
          Watch Trailer
          <SmartDisplay sx={{ ml: 1 }} />
        </Button>

        <CardContent sx={{ zIndex: 3 }}>
          <Box sx={{ position: "absolute" }}>
            <Backdrop sx={{ color: "#fff" }} open={open}>
              {trailerContent}
            </Backdrop>
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ width: { md: "70%", xs: "100%" }, color: "#106cdc" }}>
        <Box
          sx={{
            textShadow: "0 0 14px black",
            overflowWrap: "break-word",
          }}
        >
          <Typography variant="h4" fontWeight="700" sx={{ mt: 1 }}>
            {movie?.title}
          </Typography>

          <Typography variant="h6" fontWeight="500" sx={{ mt: 0.1 }}>
            {movie?.genres?.map((genre) => genre.name).join(", ")}
          </Typography>
        </Box>

        <Box
          sx={{
            overflowWrap: "break-word",
            maxHeight: 340,
            overflow: "auto",
            p: 1,
          }}
        >
          <Typography variant="h5" fontWeight="500" sx={{ mt: 4 }}>
            Release Date: {movie?.release_date || movie?.first_air_date}
          </Typography>

          <Typography variant="h6" fontWeight="500" sx={{ mt: 1 }}>
            Rating: {movie?.vote_average?.toFixed(1)} / 10
          </Typography>

          <Typography variant="h6" fontWeight="500" sx={{ mt: 1 }}>
            Duration:{" "}
            {movie?.runtime
              ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}min`
              : "N/A"}
          </Typography>

          <Typography variant="h5" fontWeight="500" sx={{ mt: 4 }}>
            Overview:
            <Typography sx={{ ml: 1.4 }}>{movie?.overview}</Typography>
          </Typography>

          <Typography variant="h5" fontWeight="500" sx={{ mt: 4 }}>
            Cast:
            <List>
              {movie?.credits?.cast.map((castMember) => (
                <ListItem key={castMember.id}>
                  <ListItemText primary={castMember.name} />
                </ListItem>
              ))}
            </List>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
