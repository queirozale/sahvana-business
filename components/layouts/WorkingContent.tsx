import React from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
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