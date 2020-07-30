import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Card, CardActions, CardContent, Divider} from '@material-ui/core';
import {UserContext} from "../../../contexts/user.context";
import {BasicInfo} from "../../../components/BasicInfo";

const UserCard = props => {
  const {className, ...rest} = props;
  const [user] = useContext(UserContext);

  return (
    <Card {...rest}>
      <CardContent>
        <BasicInfo {...user}/>
      </CardContent>
      <Divider/>
      <CardActions>
        {props.actions}
      </CardActions>
    </Card>
  );
};

UserCard.propTypes = {
  actions: PropTypes.any,
  className: PropTypes.string,
};

export default UserCard;
