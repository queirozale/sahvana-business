import React, { useState } from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      maxWidth: 936,
      margin: 'auto',
      overflow: 'hidden',
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

export interface AdminProps extends WithStyles<typeof styles> {}

const Admin = (props: AdminProps) => {
  const { classes } = props;
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const saveProducts = async event => {
    setSubmitting(true);

    const res = await fetch('https://sahvana-admin.herokuapp.com/api/save_products', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    const result = await res.text();
    setSaved(!saved);
    setSubmitting(false);
  };

  return (
    <Paper className={classes.paper} elevation={0}>
      <h3>Salvar produtos</h3>
      <Button onClick={saveProducts}>
        SAVE
      </Button>
      {submitting && (
            <LinearProgress />
      )}
      {saved && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Produtos registrados!
            </Alert>
          </Snackbar>
      )}
    </Paper>
  );
};

export default withStyles(styles)(Admin);
