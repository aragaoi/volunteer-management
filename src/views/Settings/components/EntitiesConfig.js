import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import {Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, Typography} from '@material-ui/core';
import ChipInput from "material-ui-chip-input";
import {EntityTypesContext} from "../../../contexts/entitytypes.context";
import {deleteAll, saveAll} from "../../../services/entitytype.service";
import {useSnackbar} from "notistack";
import * as _ from "lodash";

const useStyles = makeStyles(() => ({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const EntitiesConfig = props => {
  const {className, ...rest} = props;

  const {enqueueSnackbar} = useSnackbar();
  const [entityTypes, dispatch] = useContext(EntityTypesContext);

  const classes = useStyles();

  function handleAdd(type) {
    if (!_.isEmpty(type.name)) {
      dispatch({type: "ADD", payload: type});
    }
  }

  function handleDelete(type) {
    dispatch({type: "DELETE", payload: type});
  }

  async function handleSave() {
    const allTypes = [...entityTypes];
    let addedTypes = _.remove(allTypes, {added: true}) || [];
    const deletedTypes = _.remove(allTypes, {deleted: true}) || [];

    await deleteAll(deletedTypes);
    addedTypes = await saveAll(addedTypes);

    dispatch({type: "INIT", payload: [...allTypes, ...addedTypes]});
    enqueueSnackbar("Configurações salvas com sucesso!", {variant: "success"});
  }

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
        <Divider/>
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
                value={_.filter(entityTypes, {active: true})}
                dataSourceConfig={{text: "name", value: "id"}}
                onAdd={handleAdd}
                onDelete={handleDelete}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider/>
        <CardActions>
          <Button
            color="primary"
            variant="outlined"
            onClick={handleSave}
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
