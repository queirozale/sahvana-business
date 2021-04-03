import React, { useState }  from 'react';

import Paper from '@material-ui/core/Paper';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import CompleteProfile from '../modules/Profile/Checkout/CompleteProfile';
import LayoutTextFields from '../modules/Profile/ViewProfile';

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
  const [completed, setCompleted] = useState(false);

  function handleClick() {
    setCompleted(!completed);
  };

  return (
    <Paper className={classes.paper} elevation={0}>
      <Button onClick={handleClick}>
        Change
      </Button>
      {completed && (
        <LayoutTextFields />
      )}
      {!completed && (
        <CompleteProfile />
      )}
    </Paper>
  );
}

export default withStyles(styles)(ProfileContent);