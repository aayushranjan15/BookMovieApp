import {
Button,
GridList,
GridListTile,
GridListTileBar,
Typography,
} from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import Modal from "react-modal";
import { Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Details.css";
import Header from "../../common/header/Header";
import YouTube from "react-youtube";
import StarRatingIcon from "../../common/StarRatingIcon";
import { Link } from "react-router-dom";
import Login from "../../common/Login";
import Register from "../../common/Register";

function TabPanel(props) {
    const { children, value, index } = props;
    return <div>{value === index && <div>{children}</div>}</div>;
}

const useStyles = makeStyles((theme) => ({
    paper: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: `translate(-50%, -50%)`,
      background: theme.palette.background.paper,
      padding: theme.spacing(2, 4, 3),
    },
}));

function Details(props) {
const [Movie, setMovie] = useState([]);
const [isLoggedOut, setIsLoggedOut] = useState(false);
const [modalIsOpen, setModalIsOpen] = useState(false);
const [selectedTab, setSelectedTab] = useState(0);
const classes = useStyles();

const handleChange = (event, newValue, index) => {
    setSelectedTab(newValue);
};

useEffect(() => {
    setIsLoggedOut(false);
}, [isLoggedOut]);

useEffect(() => {
    async function fetchData() {
    // You can await here
    if (props.match) {
        const response = await fetch("/api/v1/movies/" + props.match.params.id);
        const data = await response.json();
        console.log(data);
        setMovie(data);
    }
    }
    fetchData();
}, []);

console.log("Details page for the movie:");
console.log(Movie);

const opts = {
    height: "390",
    width: "100%",
    PalyerVars: {
    //https://developers.google.com/youtube/player_parameters
    autoplay: 1,
    },
};

let videoCode;
if (Movie.trailer_url) {
    console.log("inside trailer_url");
    videoCode = Movie.trailer_url.split("v=")[1].split("&")[0];
}
let movieGenre = [];
movieGenre = Movie.genres;
console.log(movieGenre);
return (
    <Fragment>
    <Header baseUrl={props.baseUrl} />
    <div className="container">
    {!localStorage.getItem("user-info") ? (
        <span className="BookShow-btn">
        <Button id="BookShow-btn" variant="contained" color="primary" onClick={() => setModalIsOpen(true)}>BookShow</Button>
        </span>
        ) : (
            <span className="BookShow-btn">
            <Link to={{ pathname: "/bookshow/"+ props.match.params.id }}>
                <Button id="BookShow-btn" variant="contained" color="primary">BookShow</Button>
            </Link>
            </span>
        )} 
    <div className="item item-1">
        <Typography align="left">
        <Link to={{ pathname: "/" }}>
            <button className="backhome_btn">ᑉ Back to home</button>
        </Link>
        </Typography>
        {
        <img
            src={Movie.poster_url}
            className="Movie_poster_details"
            alt={Movie.title}
        />
        }
    </div>
    <div className="item item-2">
        <Typography variant="h5" component="h2">
        {Movie.title}
        </Typography>

        <Typography>
        <b>Genre:</b>
        {Movie.genres &&
            Movie.genres.map((item) => <span key={item}> {item}</span>)}
        <br />
        <b>Duration:</b> {Movie.duration}
        <br />
        <b>Release Date:</b>
        {new Date(Movie.release_date).toDateString()}
        <br />
        <b>Rating:</b> {Movie.rating}
        <br />
        <br />
        <Typography>
            <b>Plot:</b>
            <a href={Movie.wiki_url}> (Wiki link) </a>
            {Movie.storyline}
        </Typography>
        <br />
        </Typography>
        <Typography>
        <b>Trailer:</b>
        </Typography>
        <YouTube videoId={videoCode} opts={opts} />
    </div>
    <div className="item item-3">
        <Typography align="justify">
        <b>Rate this Movie:</b>
        </Typography>
        <StarRatingIcon></StarRatingIcon>

        <br />

        <Typography style={{ marginBottom: "16px" }}>
        <b>Artists:</b>
        </Typography>
        <GridList
        cols={2}
        style={{
            padding: "1px",
            display: "flex",
            flexWrap: "nowrap",
            height: "350px",
        }}
        >
        {Movie.artists &&
            Movie.artists.map((item) => (
            <GridListTile key={item.id + item.first_name}>
                <img
                src={item.profile_url}
                className="Artist_image"
                alt={item.first_name}
                ></img>

                <GridListTileBar
                key={item.last_name}
                title={
                    <span>
                    {item.first_name} {item.last_name}
                    </span>
                }
                style={{
                    textAlign: "start",
                    marginTop: 16,
                    marginBottom: 16,
                }}
                />
            </GridListTile>
            ))}
        </GridList>
    </div>
    </div>
    <Modal
            isOpen={modalIsOpen}
            shouldCloseOnOverlayClick={true}
            onRequestClose={() => setModalIsOpen(false)}
            className={classes.paper}
        >
            <Tabs value={selectedTab} onChange={handleChange}>
            <Tab label="LOGIN" />
            <Tab label="REGISTER" />
            </Tabs>

            <TabPanel value={selectedTab} index={0}>
            <Login />
            </TabPanel>
            <TabPanel value={selectedTab} index={1}>
            <Register />
            </TabPanel>
        </Modal>
    </Fragment>
);
}
export default Details;