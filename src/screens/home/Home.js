import React from "react";
import "./Home.css";
import Header from "../../common/header/Header";
import NewReleasedGrid from "./NewReleasedGrid";
import SingleLineGridList from "./SingleLineGridList";

function Home(props) {
  return (
    <div className="Home-page">
        <Header baseUrl={props.baseUrl} />
        <div className="upcomingMovies">Upcoming Movies</div>
        <SingleLineGridList />
        <NewReleasedGrid />
    </div>
  );
}
export default Home;