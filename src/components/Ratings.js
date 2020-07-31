import {Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import Collapse from "@material-ui/core/Collapse";
import React, {Fragment, useState} from "react";
import {makeStyles} from "@material-ui/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {EvaluationType} from "../Types";
import PropTypes from "prop-types"
import * as _ from "lodash";
import moment from "moment";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: 8
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export function Ratings(props) {
  const classes = useStyles();

  const {rating, evaluations} = props;
  const [expanded, setExpanded] = useState(false);

  return <>
    {_.isEmpty(evaluations) ?
      <Typography>
        Não há avaliações
      </Typography>
      :
      <Fragment>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Rating defaultValue={rating} readOnly/>
          </Grid>
          <Grid item>
            <Button
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              aria-label="avaliações"
            >
              Ver avaliações
              <ExpandMoreIcon
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
              />
            </Button>
          </Grid>
        </Grid>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <List>
            {evaluations.map((evaluation, index) =>
              <Card key={index} className={classes.card}>
                <CardContent>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg"/>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                          <Grid
                            container
                            spacing={2}
                            justify={"flex-start"}
                          >
                            <Grid item>
                              <Rating defaultValue={evaluation.rating} readOnly size={"small"}/>
                            </Grid>
                            <Grid item>
                              {`${evaluation.user.name} | ${moment(evaluation.date).format("DD/MM/YY")}`}
                            </Grid>
                        </Grid>
                      }
                      secondary={evaluation.comment && `— ${evaluation.comment}`}
                    />
                  </ListItem>
                </CardContent>
              </Card>
            )}
          </List>
        </Collapse>
      </Fragment>}
  </>;
}

Ratings.propTypes = {
  rating: PropTypes.number,
  evaluations: PropTypes.arrayOf(EvaluationType),
}
