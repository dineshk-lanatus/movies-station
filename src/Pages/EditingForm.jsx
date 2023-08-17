import React, { useContext, useState } from "react";
import { Button } from "@mui/joy";
import { CancelRounded } from "@mui/icons-material";
import { Box, Card, CardContent, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { MoviesContext } from "../Context/MoviesContext";

export default function EditingForm() {
  const { searched, setSearched } = useContext(MoviesContext);
  const { id } = useParams();

  const initialFormData =
    searched.find((movie) => movie.id === parseInt(id)) || {};

  const [formData, setFormData] = useState(initialFormData);

  const navigate = useNavigate();

  function cancelHandler() {
    navigate(-1);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          backgroundColor: "white",
          borderRadius: "14px",
          p: 2,
          width: "64%",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              mb: 5.5,
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Typography color="primary" variant="h4" fontWeight={500}>
              Edit Movie Data
            </Typography>

            <CancelRounded
              color="primary"
              onClick={cancelHandler}
              sx={{
                fontSize: 28,
                "&:hover": {
                  fill: "red",
                },
              }}
            />
          </Box>

          <Box sx={{ width: "100%" }}>
            <TextField
              required
              fullWidth
              label="Title"
              name="title"
              value={formData.title || ""}
              placeholder="Fast X"
              onChange={(e) => {
                setFormData((prevData) => ({
                  ...prevData,
                  title: e.target.value,
                }));
              }}
            />

            <TextField
              fullWidth
              label="Image URL"
              type="url"
              variant="outlined"
              name="poster"
              value={formData.poster_path || ""}
              sx={{
                mt: 2.8,
                display: "flex",
                justifyContent: "space-between",
              }}
              required
              onChange={(e) => {
                setFormData((prevData) => ({
                  ...prevData,
                  poster_path: e.target.value,
                }));
              }}
            />

            <TextField
              fullWidth
              type="number"
              label="Rating"
              name="rating"
              defaultValue={formData?.vote_average?.toFixed(1) || ""}
              sx={{ mt: 2.8 }}
              inputProps={{
                inputMode: "numeric",
                step: "0.1",
                min: "0.0",
                max: "10.0",
              }}
              required
              onChange={(e) => {
                setFormData((prevData) => ({
                  ...prevData,
                  rating: e.target.value,
                }));
              }}
            />

            <TextField
              required
              fullWidth
              id="outlined-multiline-static"
              label="Description"
              name="description"
              multiline
              rows={5}
              sx={{ mt: 2.8 }}
              defaultValue={formData.overview}
              onChange={(e) => {
                setFormData((prevData) => ({
                  ...prevData,
                  overview: e.target.value,
                }));
              }}
            />
          </Box>

          <Box
            sx={{
              mt: 5.5,
              width: "100%",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button
              type="submit"
              onClick={() => {
                if (
                  window.confirm(
                    `Are You Sure ? You want to Save the Changes made in "${formData.title}" Movie Data.!`
                  )
                ) {
                  setSearched((prev) => {
                    return prev.map((m) => {
                      if (m.id === parseInt(id)) {
                        return formData;
                      }
                      return m;
                    });
                  });
                  navigate(-1);
                  console.log("Updated Movie Data.", { formData });
                }
              }}
            >
              Save Changes
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
