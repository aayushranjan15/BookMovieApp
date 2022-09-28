import React, { useState } from "react";
import RatingIcon from "./RatingIcon";
function StarRatingIcon(props) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const onMouseEnter = (index) => {
    setHoverRating(index);
    };
    const onMouseLeave = () => {
    setHoverRating(0);
    };
    const onSaveRating = (index) => {
    setRating(index);
    };
    console.log(rating);

    return (
    <div className="box flex">
        {[1, 2, 3, 4, 5].map((index) => {
        return (
            <RatingIcon
            key={index}
            index={index}
            rating={rating}
            hoverRating={hoverRating}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onSaveRating={onSaveRating}
            />
        );
        })}
    </div>
    );
}
export default StarRatingIcon;