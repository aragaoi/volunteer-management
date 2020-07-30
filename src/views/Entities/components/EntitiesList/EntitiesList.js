import {Grid} from "@material-ui/core";
import {EntityStore} from "../../../../contexts/entity.context";
import {EntityCard} from "../index";
import {RatingStars} from "../../../../components/Rating/RatingStars";
import {ProfileDialogButton} from "../../../../components/Profile/ProfileDialogButton";
import React, {useContext} from "react";
import {EntitiesContext} from "../../../../contexts/entities.context";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import EventIcon from "@material-ui/icons/Event";
import Tooltip from "@material-ui/core/Tooltip";
import {EntityFormDialogButton} from "../EntityForm/EntityFormDialogButton";
import {ConfirmDialogButton} from "../../../../components/ConfirmDialogButton";
import {list, remove} from "../../../../services/entity.service";
import {useSnackbar} from "notistack";
import {VisitFormDialogButton} from "../../../Visits/components/VisitForm/VisitFormDialogButton";

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
        item
        key={entity.id}
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
                <RatingStars stars={entity.rating} size={"small"}/>
              </Grid>
              <Grid item>
                <ProfileDialogButton/>
                <VisitFormDialogButton
                  color={"primary"}
                  actionIcon={
                    <Tooltip title="Agendar visita">
                      <EventIcon/>
                    </Tooltip>
                  }
                />
                <EntityFormDialogButton
                  entity={entity}
                  actionIcon={
                    <Tooltip title="Editar">
                      <EditIcon/>
                    </Tooltip>
                  }
                />
                <ConfirmDialogButton
                  title={"Excluir entidade"}
                  message={`Essa ação não poderá ser desfeita. Deseja realmente excluir a entidade ${entity.name}?`}
                  onConfirm={() => handleDelete(entity)}
                  actionIcon={
                    <Tooltip title="Excluir">
                      <DeleteIcon/>
                    </Tooltip>
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
