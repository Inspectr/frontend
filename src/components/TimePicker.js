import dayjs from 'dayjs';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';


import TimeIcon from '@material-ui/icons/AccessTime';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

const options = [
  // 'Show some love to Material-UI',
  // 'Show all notification content',
  // 'Hide sensitive notification content',
  // 'Hide all notification content',

  {
    label: 'Last hour',
    filter: dayjs().subtract(1, 'hour')
  },
  {
    label: 'Last day',
    filter: dayjs().subtract(1, 'day')
  },
  {
    label: 'Last week',
    filter: dayjs().subtract(1, 'week')
  },
  {
    label: 'Last month',
    filter: dayjs().subtract(1, 'month')
  }
];

class TimePicker extends React.Component {
  state = {
    anchorEl: null,
    selectedIndex: 0,
  };

  button = undefined;

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, anchorEl: null });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <div className={classes.root}>
        <List component="nav">
          <Button onClick={this.handleClickListItem} variant="outlined" className={classes.button}>
            <TimeIcon /><span>{' '}</span>{options[this.state.selectedIndex]['label']}
          </Button>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option.label}
              selected={index === this.state.selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index)}
            >
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(TimePicker);
