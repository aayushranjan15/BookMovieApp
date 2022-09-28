import React from "react";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import "../common/StarRatingIcon.css";
function StarIcon(props) {
  const { fill = "none" } = props;
  return (
    <div>
      <StarBorderIcon fontSize="large" htmlColor={fill}></StarBorderIcon>
    </div>
  );
}
export default StarIcon;