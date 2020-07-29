import {Typography} from "@material-ui/core";
import React from "react";
import {AddressType} from "../Types";

export function AddressLink(props) {
  let googleMapsBaseUrl = `https://www.google.com/maps/search/?api=1&query=`;

  const {address = {}, ...rest} = props;

  return <Typography
    align="center"
    variant="body2"
    {...rest}
  >
    {address.street && address.city && address.state &&
    <a target="_blank"
       rel="noopener noreferrer"
       href={`${googleMapsBaseUrl}${address.street},${address.city},${address.state}`}>
      {`${address.street} - ${address.city} / ${address.state}`}
    </a>
    }
  </Typography>
}

AddressLink.propTypes = {
  address: AddressType
}
