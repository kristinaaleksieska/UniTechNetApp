import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

function DatePickers(props) {
  const { classes } = props;
  return (
    <TextField
      id={props.id || 'date'}
      label={props.label}
      type="date"
      value={props.defaultDate}
      className={classes.textField}
      InputLabelProps={{
        shrink: true
      }}
      onChange={props.onChange}
    />
  );
}

DatePickers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DatePickers);
