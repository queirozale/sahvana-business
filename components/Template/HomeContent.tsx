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
import SimpleCard from './Card';
import Demo from './Chart';
import Dashboard from './Dashboard/Dashboard';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paperCard: {
      height: 140,
      width: 300,
      marginTop: '15px',
      marginLeft: '15px'
    },
    control: {
      padding: theme.spacing(2),
    },
    paper: {
      maxWidth: 1200,
      height: '100%',
      margin: 'auto',
      overflow: 'hidden',
      backgroundColor: '#eaeff1'
    }
  });

export interface ContentProps extends WithStyles<typeof styles> {}

function HomeContent(props: ContentProps) {
  const { classes } = props;

  return (
    <Paper className={classes.paper} elevation={0}>
      <Dashboard />
    </Paper>
  );
}

export default withStyles(styles)(HomeContent);