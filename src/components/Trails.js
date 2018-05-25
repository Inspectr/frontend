import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';

import FormattedDate from './FormattedDate';
import TrailDetail from './TrailDetail';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 5,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  summaryRow: {
    cursor: 'pointer'
  },
  detailRow: {
    padding: '36px'
  }
});

class Trails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDetails: {}
    }
  }

  render() {
    const { classes, data } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Event Date</TableCell>
              <TableCell>Event Type</TableCell>
              <TableCell>Actor</TableCell>
              <TableCell>Target</TableCell>
              <TableCell>Origin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(trail => {
              return (
                <React.Fragment key={trail.id}>
                  <TableRow className={classes.summaryRow} onClick={this.onToggleDetails(trail.id)}>
                    <TableCell>
                      <Icon className={classes.icon}>{this.state.showDetails[trail.id] ? 'remove_circle' : 'add_circle' }</Icon>
                    </TableCell>  
                    <TableCell><FormattedDate date={trail.created} /></TableCell>
                    <TableCell>{trail.event}</TableCell>
                    <TableCell>{trail.actor}</TableCell>
                    <TableCell>{trail.target}</TableCell>
                    <TableCell>{trail.origin}</TableCell>
                  </TableRow>
                  { 
                    this.state.showDetails[trail.id] &&
                    <TableRow>
                      <TableCell className={classes.detailRow} colSpan={6}>
                        <TrailDetail data={trail}/>
                      </TableCell>
                    </TableRow> 
                  }
                </React.Fragment>  
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }

  onToggleDetails(trailId) {
    return () => {
      this.setState({
        showDetails: {
          ...this.state.showDetails,
          [trailId]: !this.state.showDetails[trailId]
        }
      });

    }
  }
}

Trails.defaultProps = {
  data: []  
}

Trails.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired
};

export default withStyles(styles)(Trails);
