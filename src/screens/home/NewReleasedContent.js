import React, { useEffect, useState } from "react";
import { GridList } from "@material-ui/core";
import { ImageListItem, ImageListItemBar } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./Grid.css";
function NewReleasedContent({ filteredData }) {
  const [newMovie, setNewMovie] = useState([]);

  let title = filteredData.movie_Name;

  let artists = filteredData.movie_Artists;

  let startTime = filteredData.movie_startTime;
  console.log("Start time: ",startTime);
  let endTime = filteredData.movie_endTime;
  let genres = filteredData.movie_genere;

  let UrlArtists = artists;
  console.log("Artists:-");
  console.log(UrlArtists);
  let urlGenres = genres;
  console.log("GenreArray:-");
  console.log(urlGenres);
  let fetchUrl;

  if (UrlArtists) {
    const parameterizeArray = (key, arr) => {
      arr = arr.map(encodeURIComponent);
      return "&" + key + "=" + arr.join("&" + key + "=");
    };

    console.log(parameterizeArray("genre", urlGenres));

    fetchUrl = `/api/v1/movies?page=1&limit=10&title=${title}&status=RELEASED&start_date=&end_date=${parameterizeArray("genre", urlGenres)}${parameterizeArray("artists", UrlArtists)}`;
    console.log("fetchUrl");
    console.log(fetchUrl);
  } else {
    fetchUrl = "/api/v1/movies?page=1&limit=10";
  }

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await fetch(fetchUrl);
      const data = await response.json();
      console.log(data.movies);
      setNewMovie(data.movies);
    }
    fetchData();
  }, [fetchUrl]); // Or [] if effect doesn't need props or state

  let latestReleased = [];
  for (let movie of newMovie) {
    if (movie.status === "RELEASED") {
      console.log(`${movie.status}:${movie.title}`);
      latestReleased.push(movie);
    }
  }
  console.log("Newly Released:-");
  console.log(latestReleased);

  return (
    <div>
      <GridList cellHeight={350} cols={4} spacing={20}>
        {latestReleased.map((data) => (
          <ImageListItem key={data.id} className="gridListTile">
            <Link to={{ pathname: `/details/${data.id}` }}>
              <img
                src={data.poster_url}
                className="Released_poster"
                alt={data.title}
              ></img>
            </Link>
            <ImageListItemBar
              title={data.title}
              subtitle={
                <p>
                  Released Date {new Date(data.release_date).toDateString()}
                </p>
              }
              style={{ textAlign: "start" }}
            />
          </ImageListItem>
        ))}
      </GridList>
    </div>
  );
}
export default NewReleasedContent;