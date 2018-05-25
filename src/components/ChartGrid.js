import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from "mobx-react"

import BarChart from './BarChart';

const query = gql`
query Metric($startsAt: Time, $interval: Int, $endsAt: Time){
  metrics(startsAt: $startsAt, interval: $interval, endsAt: $endsAt) {
    startsAt
    interval
    size
  }
}
`

const queryOptions = {
  options: ({ store}) => {
    // debugger
    console.log(JSON.stringify(store.query.startsAt, null, 2))
    return ({
      variables: {
        startsAt: store.query.startsAt.toISOString(),
        interval: 3600,
        endsAt: new Date().toISOString()
      }
    })
  }
}

const styles = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `${theme.spacing.unit * 3}px`,
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing.unit,
  },
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`,
  },
});

const ChartGrid = ({ data: { metrics }, classes}) => {
  return (
    <div>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="subheading" gutterBottom>Event count</Typography>
            <BarChart height={100} data={metrics}/>
          </Paper>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
    </div>
  );
}

ChartGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default inject("store")(observer(graphql(query, queryOptions)(withStyles(styles)(ChartGrid))));
