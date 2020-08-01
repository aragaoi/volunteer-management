import {Grid} from "@material-ui/core";
import {EntityStore} from "../../../contexts/entity.context";
import {EntityCard} from "./index";
import {DialogButtonHandler} from "../../../components/DialogButtonHandler";
import React, {useContext} from "react";
import {EntitiesContext} from "../../../contexts/entities.context";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import EventIcon from "@material-ui/icons/Event";
import Tooltip from "@material-ui/core/Tooltip";
import {list, remove} from "../../../services/entity.service";
import {useSnackbar} from "notistack";
import Rating from "@material-ui/lab/Rating";
import InfoIcon from "@material-ui/icons/Info";
import {EntityDialog} from "./EntityDialog";
import {ConfirmDialog} from "../../../components/ConfirmDialog";
import {EntityFormDialog} from "./EntityFormDialog";
import {VisitFormDialog} from "../../Visits/components/VisitFormDialog";

export function EntitiesList() {
  const {enqueueSnackbar} = useSnackbar();
  const [entities, setEntities] = useContext(EntitiesContext);

  async function handleDelete(entity) {
    await remove(entity);
    setEntities(await list());
    enqueueSnackbar("Entidade removida com sucesso!", {variant: "success"});
  }

  return <Grid
    container
    spacing={3}
  >
    {entities.map(entity => (
      <Grid
        key={entity.id}
        item
        lg={4}
        md={6}
        xs={12}
      >
        <EntityStore entity={entity}>
          <EntityCard actions={
            <Grid
              container
              justify="space-between"
              alignItems={"center"}
            >
              <Grid item>
                {!!entity.rating && <Rating defaultValue={entity.rating} readOnly/>}
              </Grid>
              <Grid item>
                <DialogButtonHandler
                  actionIcon={
                    <Tooltip title={"Mais detalhes"}>
                      <InfoIcon color={"action"}/>
                    </Tooltip>
                  }
                  dialog={<EntityDialog/>}
                />
                <DialogButtonHandler
                  color={"primary"}
                  actionIcon={
                    <Tooltip title="Agendar visita">
                      <EventIcon/>
                    </Tooltip>
                  }
                  dialog={<VisitFormDialog/>}
                />
                <DialogButtonHandler
                  actionIcon={
                    <Tooltip title="Editar">
                      <EditIcon/>
                    </Tooltip>
                  }
                  dialog={
                    <EntityFormDialog
                      isEdit={true}
                    />
                  }
                />
                <DialogButtonHandler
                  actionIcon={
                    <Tooltip title="Excluir">
                      <DeleteIcon/>
                    </Tooltip>
                  }
                  dialog={
                    <ConfirmDialog
                      title={"Excluir entidade"}
                      message={`Essa ação não poderá ser desfeita. Deseja realmente excluir a entidade ${entity.name}?`}
                      onClose={(confirmed) => confirmed && handleDelete(entity)}
                    />
                  }
                />
              </Grid>
            </Grid>
          }/>
        </EntityStore>
      </Grid>
    ))}
  </Grid>
}
