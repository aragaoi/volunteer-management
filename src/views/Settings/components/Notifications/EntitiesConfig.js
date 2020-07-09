import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Divider,
  FormControlLabel,
  Checkbox,
  Typography,
  Button
} from '@material-ui/core';
import ChipInput from "material-ui-chip-input";

const useStyles = makeStyles(() => ({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const EntitiesConfig = props => {
  const { className, ...rest } = props;
  const [form, setForm] = useState({
    entitiesTypes: []
  });

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form>
        <CardHeader
          subheader="Gerencie as configurações de entidades"
          title="Entidades"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={6}
            wrap="wrap"
          >
            <Grid
              className={classes.item}
              item
              xs
            >
              <Typography
                gutterBottom
                variant="h6"
              >
                Tipos de entidades
              </Typography>
              <ChipInput
                fullWidth
                variant="outlined"
                defaultValue={form.entitiesTypes}
                onChange={(entitiesTypes) => setForm({...form, entitiesTypes})}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="outlined"
          >
            Salvar
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

EntitiesConfig.propTypes = {
  className: PropTypes.string
};

export default EntitiesConfig;
