import React from 'react';
import ChipInput from 'material-ui-chip-input'
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import InfoIcon from '@material-ui/icons/Info';
import TimeIcon from '@material-ui/icons/AccessTime';

import uniq from 'lodash/uniq'
import without from 'lodash/without'
import pick from 'lodash/pick'

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { trailFields } from '../constants'

import { withStyles } from '@material-ui/core/styles';

import TimePicker from './TimePicker'

const styles = theme => ({
  inputRoot: {
    padding: 0,
    margin: 0,
    // maxHeight: '1.4em',
  },
  chipContainer: {
    minHeight: 20,
    '&$labeled': {
      marginTop: 0
    }
  },
  input: {
    margin: 0
  },
  root: {
    position: 'relative',
    padding: 0,
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `${theme.spacing.unit * 3}px`,
  },
  paper: {
    padding: theme.spacing.unit / 2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit,
  },
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`,
  },
  suggestions: {
    position: 'absolute',
    top: '100%',
    zIndex: '100',
    width: '100%'
  },
  timeSelection: {
    textAlign: 'right'
  }
});

const endsWithColon = new RegExp(':$')

const filterVocabulary = {
  // TODO extract graphql call
  origin: ['checkr', 'tickets', 'optix', 'operator', 'providers'],
  event: ['upgrade_report', 'create_report', 'create_user']
}

const getSuggestions = (currTextValue) => {
  let suggestions = []

  if (currTextValue.includes(':')) {
    const column = currTextValue.split(':')[0]
    const fields = filterVocabulary[column] || []
    suggestions = suggestions.concat(fields.map(field => column + ":" + field))
  }

  return suggestions
}

class ControlledChipInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      chips: [],
      suggestionsActive: false,
      currTextValue: ''
    }
  }

  onBeforeAdd (chip) {
    return chip.length > 1 && !chip.match(endsWithColon)
  }

  handleAdd (chip) {
    this.setState({
      currTextValue: '',
      chips: uniq([...this.state.chips, chip])
    }, () => {
      this.props.handleChange(this.state.chips)
    })
  }

  handleDelete (deletedChip) {
    this.setState({
      chips: this.state.chips.filter((c) => c !== deletedChip)
    }, () => {
      this.props.handleChange(this.state.chips)
    })
  }

  render () {
    const {classes} = this.props
    const { currTextValue, chips, suggestionsActive } = this.state
    const currTextValueRegExp = new RegExp(currTextValue, 'i')
    const suggestions = without(getSuggestions(currTextValue), ...chips).filter(s => s.match(currTextValueRegExp))

    return (
      <div className={classes.root}>
        <ChipInput
          classes={{root: classes.inputRoot, input: classes.input, chipContainer: classes.chipContainer}}
          label="Search all fields using strings like '1234' or column values like 'origin:monolith'"
          fullWidth
          disableUnderline
          value={this.state.chips}
          onBeforeAdd={(chip) => this.onBeforeAdd(chip)}
          onAdd={(chip) => this.handleAdd(chip)}
          onDelete={(deletedChip) => this.handleDelete(deletedChip)}
          onBlur={(event) => {
            if (this.props.addOnBlur && event.target.value) {
              this.handleAdd(event.target.value)
            }
            setTimeout(() => {
              this.setState({suggestionsActive: false})
            },100)
          }}
          onUpdateInput={value => { this.setState({suggestionsActive: true, currTextValue: value})}}
        />
        { suggestionsActive && <Paper className={classes.suggestions}>
          {suggestions.map(s => <MenuItem key={s} onClick={ () => { this.onBeforeAdd(s) && this.handleAdd(s) } }>{s}</MenuItem>)}
        </Paper> }
      </div>
    )
  }
}

const Search = ({classes, handleChange}) => (
  <div>
    <Paper className={classes.paper}>
      <Grid container spacing={24} alignItems="center" justify="center">
        <Grid item xs={8} md={8}>
          <ControlledChipInput
            handleChange={handleChange}
            classes={classes}
          />
        </Grid>
        <Grid item xs={4} md={4} className={classes.timeSelection}>
          <TimePicker />
        </Grid>
      </Grid>
    </Paper>
  </div>
)



export default withStyles(styles)(Search)
