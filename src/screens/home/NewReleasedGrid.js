import React, { useState } from "react";
import "./Grid.css";
import NewReleasedContent from "./NewReleasedContent";
import { makeStyles } from "@material-ui/core/styles";
import MovieCardFilter from "./MovieCardFilter";

const useStyles = makeStyles((theme) => ({
root: {
    backgroundcolor: "#f1f1f1",
    display: "flex",
    width: "76%",
    height: "100%",
    margin: 16,
    padding: 10,
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
},
}));

console.log("movieData:-");
console.table(MovieCardFilter.filterData);

function NewReleasedGrid(props) {
// const classes = useStyles();
const [filteredData, setFilteredData] = useState("");
const childToParent = (childData) => {
    setFilteredData(childData);
};
console.log("child to parent");
console.log(filteredData);
return (
    <div className="flex-container">
    <div className="flexbox-item flexbox-item-1">
        <NewReleasedContent filteredData={filteredData} />
    </div>

    <div className="flexbox-item flexbox-item-2">
        <MovieCardFilter childToParent={childToParent} />
    </div>
    </div>
);
}
export default NewReleasedGrid;