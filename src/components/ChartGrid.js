import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import BarChart from './BarChart';

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

const ChartGrid = (props) => {
  const { classes } = props;

  return (
    <div>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="subheading" gutterBottom>Event count</Typography>
            <BarChart height={200} />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Typography variant="subheading" gutterBottom>Chart 2</Typography>
            <BarChart height={100} />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Typography variant="subheading" gutterBottom>Chart 2</Typography>
            <BarChart height={100} />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Typography variant="subheading" gutterBottom>Chart 2</Typography>
            <BarChart height={100} />
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

export default withStyles(styles)(ChartGrid);
