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
      height: 480,
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
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="left" spacing={2}>
            {[0, 1, 2].map((value) => (
              <Grid key={value} item>
                <Paper className={classes.paperCard}>
                  Métrica {value}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Demo />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default withStyles(styles)(HomeContent);