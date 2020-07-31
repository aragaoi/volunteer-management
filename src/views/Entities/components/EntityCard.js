import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Card, CardActions, CardContent, Divider} from '@material-ui/core';
import {EntityContext} from "../../../contexts/entity.context";
import {BasicInfo} from "../../../components/BasicInfo";
import ApartmentIcon from "@material-ui/icons/Apartment";

const EntityCard = props => {
  const {className, ...rest} = props;
  const [entity] = useContext(EntityContext);

  return (
    <Card {...rest}>
      <CardContent>
        <BasicInfo
          {...entity}
          defaultAvatar={
            <ApartmentIcon fontSize={"large"}/>
          }
        />
      </CardContent>
      <Divider/>
      <CardActions>
        {props.actions}
      </CardActions>
    </Card>
  );
};

EntityCard.propTypes = {
  actions: PropTypes.any,
  className: PropTypes.string,
};

export default EntityCard;
