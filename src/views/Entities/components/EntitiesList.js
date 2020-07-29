import {Grid} from "@material-ui/core";
import {EntityStore} from "../../../contexts/entity.context";
import {EntityCard} from "./index";
import {RatingStars} from "../../../components/Rating/RatingStars";
import {ProfileDialogButton} from "../../../components/Profile/ProfileDialogButton";
import React, {useContext} from "react";
import {EntitiesContext} from "../../../contexts/entities.context";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import EventIcon from "@material-ui/icons/Event";
import Tooltip from "@material-ui/core/Tooltip";

export function EntitiesList() {
  const [entities] = useContext(EntitiesContext);

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
              <Grid
                item
                alignItems={"center"}
              >
                <RatingStars stars={entity.rating} size={"small"}/>
              </Grid>
              <Grid
                item
              >
                <ProfileDialogButton
                  entity={entity}
                />
                <Tooltip title="Agendar visita">
                  <IconButton color={"primary"}>
                    <EventIcon/>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Editar">
                  <IconButton>
                    <EditIcon/>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Excluir">
                  <IconButton>
                    <DeleteIcon/>
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          }/>
        </EntityStore>
      </Grid>
    ))}
  </Grid>
}
