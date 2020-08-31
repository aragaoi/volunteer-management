import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import {Input, Paper} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import Switch from "@material-ui/core/Switch";
import Tooltip from "@material-ui/core/Tooltip";
import Slider from "@material-ui/core/Slider";
import {FilterContext} from "../contexts/filter.context";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {usePosition} from "../hooks/usePosition";
import {useSnackbar} from "notistack";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 420,
    // height: '46px'
  },
  icon: {
    color: theme.palette.text.secondary
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px'
  }
}));

const marks = [
  {
    value: 5,
    // label: '5km',
  },
  {
    value: 100,
    // label: '100km',
  },
];

const ProximitySearchInput = props => {
  const {className, onChange, style, ...rest} = props;

  const classes = useStyles();
  const {enqueueSnackbar} = useSnackbar();
  const {latitude, longitude, error} = usePosition(true);
  const [filter, setFilter] = useContext(FilterContext);
  const [enabled, setEnabled] = useState(false);
  const [proximity, setProximity] = useState({
    distance: undefined,
    address: "",
    location: undefined
  });

  const handleSwitchChange = (event) => {
    const isOn = event.target.checked;
    const searchAttributes = isOn ? {...proximity} : undefined;

    setFilter({...filter, ...{searchAttributes}});
    setEnabled(isOn);
  };

  function handleDistanceChange(event, newDistance) {
    setProximity({...proximity, distance: newDistance});
  }

  function handleAddressChange(event) {
    setProximity({...proximity, location: null, address: event.target.value});
  }

  function handleUpdateLocation() {
    if(error) {
      enqueueSnackbar("Ative a localização no navegador", {variant: "error"});
    } else {
      setProximity({...proximity, address: "", location: {latitude, longitude}});
    }
  }

  function resolveAddressPlaceholder() {
    const enabledMessage = proximity.location ? "Usando sua localização atual" : "Digite seu endereço";
    return enabled ? enabledMessage : "Habilite para buscar por proximidade";
  }

  return (
    <Paper
      {...rest}
      className={clsx(classes.root, className)}
      style={style}
    >
      <Grid container spacing={2} alignItems={"center"}>
        <Grid item>
          <Tooltip title="Filtro por proximidade">
            <LocationOnIcon className={classes.icon}/>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="Ativar filtro por proximidade">
            <Switch size="small" checked={enabled} onChange={handleSwitchChange}/>
          </Tooltip>
        </Grid>
        <Grid item xs>
          <Input
            disabled={!enabled}
            fullWidth
            placeholder={resolveAddressPlaceholder()}
            className={classes.input}
            onChange={handleAddressChange}
            value={proximity.address}
          />
        </Grid>
        <Grid item>
          <Tooltip title="Usar localização atual">
            <IconButton
              onClick={handleUpdateLocation}
              disabled={!enabled}
            >
              <MyLocationIcon/>
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid
          item
          container
          xs={12}
          spacing={2}
          alignItems={"center"}
        >
          <Grid item>
            <Typography>
              Distância máx.:
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant={"caption"}>
              5km
            </Typography>
          </Grid>
          <Grid item xs>
            <Slider
              disabled={!enabled}
              defaultValue={10}
              min={5}
              max={100}
              step={5}
              valueLabelDisplay="auto"
              marks={marks}
              onChange={handleDistanceChange}
            />
          </Grid>
          <Grid item>
            <Typography variant={"caption"}>
              100km
            </Typography>
          </Grid>
          <Grid item>
            <Button onClick={onChange}>
              Aplicar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

ProximitySearchInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object
};

export default ProximitySearchInput;
