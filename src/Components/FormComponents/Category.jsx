import React, { useState } from "react";
import {
  useTheme,
  FormControl,
  Box,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  Chip,
} from "@mui/material";
import { CATEGORIES } from "../../Data";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selectedGenres, theme) {
  return {
    fontWeight:
      selectedGenres?.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Category(props) {
  const theme = useTheme();
  const selectedGenres = props.categories;
  const [genres, setGenres] = useState(selectedGenres ? selectedGenres : []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setGenres(value);
  };

  return (
    <FormControl sx={{ mt: 2.8, width: "100%" }}>
      <InputLabel
        required
        id="demo-multiple-chip-label"
        sx={{ zIndex: 1, backgroundColor: "white", p: 0, px: 1 }}
      >
        Genre
      </InputLabel>
      <Select
        required
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={genres}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {CATEGORIES.map((name) => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, genres, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
