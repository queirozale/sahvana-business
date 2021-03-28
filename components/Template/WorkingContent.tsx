import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import SettingsIcon from '@material-ui/icons/Settings';


const styles = (theme: Theme) =>
  createStyles({
    paper: {
      maxWidth: 936,
      margin: 'auto',
      overflow: 'hidden',
      background: '#eaeff1',
      position: 'absolute',
      top: '50%',
      left: '50%'
      // transform: 'translateY(-50%)'
    },
    message: {
      fontSize: 20
    },
    gearIcon :{
      height: '40px',
      width: '40px'
    }
  });

export interface ContentProps extends WithStyles<typeof styles> {}

function Content(props: ContentProps) {
  const { classes } = props;

  return (
    <Paper className={classes.paper} elevation={0}>
      <Typography variant="body2" color="textSecondary" align="center" className={classes.message}>
        <SettingsIcon className={classes.gearIcon} /> Estamos trabalhando nisso
      </Typography>
    </Paper>
  );
};

export default withStyles(styles)(Content);