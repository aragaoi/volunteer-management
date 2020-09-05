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
  disabled: {
    color: 'rgba(0, 0, 0, 0.38)'
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px'
  }
}));

const marks = [{value: 5}, {value: 100}];
const DEFAULT_DISTANCE_KM = 10;

const ProximitySearchInput = props => {
  const {className, onChange, style, ...rest} = props;

  const classes = useStyles();
  const {enqueueSnackbar} = useSnackbar();
  const {position, error} = usePosition(true);
  const {remoteFilter, setRemoteFilter} = useContext(FilterContext);
  const [enabled, setEnabled] = useState(false);
  const [proximity, setProximity] = useState({
    distanceKm: DEFAULT_DISTANCE_KM,
    address: "",
    location: undefined
  });

  function updateFilter(searchAttributes) {
    setRemoteFilter({...remoteFilter, ...{searchAttributes}});
  }

  const handleSwitchChange = (event) => {
    const isOn = event.target.checked;
    const searchAttributes = isOn ? {...proximity} : {};

    updateFilter(searchAttributes);
    setEnabled(isOn);
  };

  function handleDistanceChange(event, newDistance) {
    setProximity({...proximity, distanceKm: newDistance});
  }

  function handleAddressChange(event) {
    setProximity({...proximity, location: null, address: event.target.value});
  }

  function handleUpdateLocation() {
    if (error) {
      enqueueSnackbar("Ative a localização no navegador", {variant: "error"});
    } else {
      setProximity({...proximity, address: "", location: {...position}});
    }
  }

  function resolveAddressPlaceholder() {
    const enabledMessage = proximity.location ? "Usando sua localização atual" : "Digite seu endereço";
    return enabled ? enabledMessage : "Habilite para buscar por proximidade";
  }

  function handleApply() {
    const searchAttributes = {...proximity};
    updateFilter(searchAttributes);
    onChange && onChange(searchAttributes);
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
          spacing={2}
          alignItems={"center"}
        >
          <Grid item>
            <Typography className={clsx(!enabled && classes.disabled)}>
              Distância máx.:
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant={"caption"}
              className={clsx(!enabled && classes.disabled)}
            >
              5km
            </Typography>
          </Grid>
          <Grid item xs>
            <Slider
              disabled={!enabled}
              defaultValue={DEFAULT_DISTANCE_KM}
              min={5}
              max={100}
              step={5}
              valueLabelDisplay="auto"
              marks={marks}
              onChange={handleDistanceChange}
            />
          </Grid>
          <Grid item>
            <Typography
              variant={"caption"}
              className={clsx(!enabled && classes.disabled)}
            >
              100km
            </Typography>
          </Grid>
          <Grid item>
            <Button
              disabled={!enabled}
              onClick={handleApply}
              size="small"
              variant="contained"
              color="secondary"
            >
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
