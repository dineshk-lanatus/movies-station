import { CancelRounded } from "@mui/icons-material";
import { Card, CardContent } from "@mui/joy";
import { CardMedia, Typography } from "@mui/material";
import React from "react";

export default function TrailerCard(props) {
  return (
    <Card
      sx={{ height: 480, width: 720, backgroundColor: "#181414", zIndex: 99 }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#1565C0",
        }}
      >
        <Typography variant="h6">Play Trailer</Typography>
        <CancelRounded
          onClick={props.onClose}
          sx={{
            "&:hover": {
              fill: "red",
            },
          }}
        />
      </CardContent>

      <CardMedia
        component="iframe"
        title="Trailer"
        src={`https://www.youtube.com/embed/${props.trailerKey}`}
        height="100%"
        sx={{ borderRadius: "14px" }}
        allowFullScreen={true}
      />
    </Card>
  );
}
