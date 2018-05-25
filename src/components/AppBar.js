import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';

const styles = {
  root: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  flex: {
    flex: 1,
  },
  bar: {
    backgroundImage: "linear-gradient(287deg, #00526b, #006d75, #008875)",
  },
  children: {
    flex: 1,
  },
  header: {
    flex: 1,
    textAlign: 'left'
  }
};

const MainAppBar = (props) => {
  const { classes, children } = props;
  return (
    <div className={classes.root}>
      <AppBar className={classes.bar} position="static">
        <Grid container spacing={24} alignItems="center" justify="center">
          <Grid item xs={1}>
            <Toolbar>
              <Typography variant="title" color="inherit" className={classes.header}>
                Inspectr
              </Typography>
            </Toolbar>
          </Grid>
          <Grid item xs={9}>
            <div classes={classes.children}>{ children }</div>
          </Grid>
          <Grid item xs={2} style={{textAlign: 'right'}}>
            <Button color="inherit">Logout</Button>
          </Grid>
        </Grid>
      </AppBar>
    </div>
  );
}

MainAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainAppBar);
