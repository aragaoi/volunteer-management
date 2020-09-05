import {Typography} from "@material-ui/core";
import React, {Fragment} from "react";
import {AddressType} from "../Types";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from "@material-ui/core/Grid";

export function AddressLink(props) {
  let googleMapsBaseUrl = `https://www.google.com/maps/search/?api=1&query=`;

  const {address = {}, ...rest} = props;

  return (
    <Fragment>
      {address.street && address.city && address.state &&
      <a target="_blank"
         rel="noopener noreferrer"
         href={`${googleMapsBaseUrl}${address.street},${address.city},${address.state}`}>
        <Grid
          container
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <LocationOnIcon fontSize="small"/>
          </Grid>
          <Grid item>
            <Typography
              align="center"
              variant="body2"
              {...rest}
            >
              {`${address.street} - ${address.city} / ${address.state}`}
            </Typography>
          </Grid>
        </Grid>
      </a>
      }
    </Fragment>
  )
}

AddressLink.propTypes = {
  address: AddressType
}
