import React from 'react';
import Paper from '@material-ui/core/Paper';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Dashboard from '../modules/Dashboard/Dashboard';

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