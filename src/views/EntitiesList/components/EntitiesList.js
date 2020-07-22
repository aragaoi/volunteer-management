import {Grid} from "@material-ui/core";
import {EntityStore} from "../../../contexts/entity.context";
import {EntityCard} from "./index";
import {RatingStars} from "../../../components/Rating/RatingStars";
import {ProfileDialogButton} from "../../../components/Profile/ProfileDialogButton";
import React, {useContext} from "react";
import {EntitiesContext} from "../../../contexts/entities.context";

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
            >
              <Grid
                item
              >
                <RatingStars stars={entity.rating.average}/>
              </Grid>
              <Grid
                item
              >
                <ProfileDialogButton
                  entity={entity}
                />
              </Grid>
            </Grid>
          }/>
        </EntityStore>
      </Grid>
    ))}
  </Grid>
}
