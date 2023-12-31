import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function Loading(props) {
  return (
    <Card
      sx={{
        boxShadow: "none",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardMedia
        component="img"
        src="/Img/MovieLoading.gif"
        sx={{
          height: "82vh",
        }}
      />
      <CardContent sx={{ zIndex: 1, position: "absolute", left: 0, right: 0 }}>
        <Card
          sx={{
            boxShadow: "none",
            background: "transparent",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CardMedia
            component="img"
            src={props.mood}
            sx={{
              width: 149,
              height: 149,
              background: "transparent",
            }}
          />
          <Typography
            variant="h5"
            color="primary"
            sx={{
              fontWeight: "700",
              backgroundColor: "white",
              borderRadius: 10,
              py: 1,
              px: 2.8,
            }}
          >
            {props.text}
          </Typography>
        </Card>
      </CardContent>
    </Card>
  );
}
