import {Typography} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import PropTypes from "prop-types";
import React from "react";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  root: {
    padding: "10px 8px",
    display: "block"
  }
}));

export function RatingStars(props) {
  const classes = useStyles();

  const {stars, size = "default"} = props;

  return <Typography
        className={classes.root}
        display="inline"
        variant="body2"
    >
        {!!stars && (stars > 0) &&
        <>
            {stars > 0 ? <StarIcon fontSize={size}/> : <StarBorderIcon fontSize={size}/>}
            {stars > 1 ? <StarIcon fontSize={size}/> : <StarBorderIcon fontSize={size}/>}
            {stars > 2 ? <StarIcon fontSize={size}/> : <StarBorderIcon fontSize={size}/>}
            {stars > 3 ? <StarIcon fontSize={size}/> : <StarBorderIcon fontSize={size}/>}
            {stars > 4 ? <StarIcon fontSize={size}/> : <StarBorderIcon fontSize={size}/>}
        </>
        }
    </Typography>
}

RatingStars.propTypes = {
  stars: PropTypes.number,
  size: PropTypes.oneOf(['default', 'inherit', 'large', 'small'])
}
