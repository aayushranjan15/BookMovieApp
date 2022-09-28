import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Chip,
  TextField,
  Button,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import "./MovieCardFilter.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 240,
    maxWidth: 240,
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
}));
function MovieCardFilter({ childToParent }) {
  const classes = useStyles();
  //genre
  const [MovieGenres, setGenres] = useState([]);
  const [state, setState] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState([]);
  //artist
  const [artists, setArtists] = useState([]);
  const [artistCheckedState, setArtistCheckedState] = useState(false);
  const [selectedArtists, setSelectedArtists] = useState([]);
  //
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndStartDate] = useState(new Date());
  const [movieName, setMovieName] = useState("");

  const filterData = {
    movie_Name: movieName,
    movie_genere: selectedGenre,
    movie_Artists: selectedArtists,
    movie_startTime: selectedStartDate,
    movie_endTime: selectedEndDate,
  };

  const url = `/api/v1/genres`;
  const artistURL = `/api/v1/artists?page=1&limit=10`;

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const responseJson = await response.json();
      console.log("artist");
      console.log(responseJson);
      console.log(responseJson.genres);
      setGenres(responseJson.genres);
    }
    fetchData();
  }, [url]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(artistURL);
      const responseJson = await response.json();
      console.log("artist");
      console.log(responseJson);
      console.log(responseJson.artists);
      setArtists(responseJson.artists);
    }
    fetchData();
  }, [artistURL]);

  //genre
  const handleChange = (event) => {
    console.log(event.target.value);
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const selectionChangeHandler = (event) => {
    setSelectedGenre(event.target.value);
  };
  //artists
  const handleArtistChange = (event) => {
    console.log(event.target.value);
    setArtistCheckedState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const selectionArtistsChangeHandler = (event) => {
    setSelectedArtists(event.target.value);
  };

  const handleStartDateChange = (e) => {
    setSelectedStartDate(e.target.value);
    console.log(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setSelectedEndStartDate(e.target.value);
    console.log(e.target.value);
  };

  const movieNameHandler = (e) => {
    setMovieName(e.target.value);
  };

  console.log("MovieName");
  console.table(movieName);

  return (
    <div>
      <Card className="cardStyle">
        <CardContent>
          <Typography
            variant="subtitle1"
            color="primary"
            className={classes.formControl}
          >
            FIND MOVIES BY:
          </Typography>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="movie-name">Movie Name</InputLabel>
            <Input id="movie-name" onChange={movieNameHandler} />
          </FormControl>
          <br />
          <br />

          <FormControl className={classes.formControl}>
            <InputLabel shrink htmlFor="genres">
              Genres
            </InputLabel>
            <Select
              multiple
              value={selectedGenre}
              onChange={selectionChangeHandler}
              renderValue={(selectedGenre) => (
                <div>
                  {selectedGenre.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </div>
              )}
            >
              {MovieGenres.map((genre) => (
                <MenuItem key={genre.id} value={genre.genre}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={genre.genre}
                        onChange={handleChange}
                        name={genre.genre}
                      />
                    }
                    label={genre.genre}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl className={classes.formControl}>
            <InputLabel shrink htmlFor="artists">
              Artists
            </InputLabel>
            <Select
              multiple
              value={selectedArtists}
              onChange={selectionArtistsChangeHandler}
              renderValue={(selectedArtists) => (
                <div>
                  {selectedArtists.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </div>
              )}
            >
              {artists.map((artist) => (
                <MenuItem
                  key={artist.id}
                  value={`${artist.first_name} ${artist.last_name}`}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={`${artist.first_name} ${artist.last_name}`}
                        onChange={handleChange}
                        name={`${artist.first_name} ${artist.last_name}`}
                      />
                    }
                    label={`${artist.first_name} ${artist.last_name}`}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <br />

          <FormControl className={classes.formControl}>
            <TextField
              id="date"
              label="Release Date Start"
              type="date"
              value={selectedStartDate}
              onChange={handleStartDateChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
          <br />
          <br />
          <FormControl className={classes.formControl}>
            <TextField
              id="date"
              label="Release Date End "
              type="date"
              value={selectedEndDate}
              onChange={handleEndDateChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br />
            <br />
          </FormControl>
          <Button
            className={classes.formControl}
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => childToParent(filterData)}
          >
            APPLY
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
export default MovieCardFilter;