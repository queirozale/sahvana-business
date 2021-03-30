import React from 'react';

import Paper from '@material-ui/core/Paper';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

import Checkout from '../modules/Profile/CompleteProfile';

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      maxWidth: 936,
      margin: 'auto',
      overflow: 'hidden',
      backgroundColor: '#eaeff1'
    },
    searchBar: {
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    searchInput: {
      fontSize: theme.typography.fontSize,
    },
    block: {
      display: 'block',
    },
    addUser: {
      marginRight: theme.spacing(1),
    },
    contentWrapper: {
      margin: '40px 16px',
    },
  });

export interface ContentProps extends WithStyles<typeof styles> {}

function ProfileContent(props: ContentProps) {
  const { classes } = props;

  return (
    <Paper className={classes.paper} elevation={0}>
      <Checkout />
    </Paper>
  );
}

export default withStyles(styles)(ProfileContent);