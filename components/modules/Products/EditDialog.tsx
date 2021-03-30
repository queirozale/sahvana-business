import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "gray",
    color: 'white'
  },
  logo: {
    maxWidth: 160,
    marginBottom: theme.spacing(3)
  }
}));

interface SimpleEditDialogProps {
  onClose: (_event: any) => void;
  title: string;
  open: boolean
}

function SimpleEditDialog(props: SimpleEditDialogProps) {
  const classes = useStyles();
  const { onClose, title, open } = props;

  const handleClose = () => {
    onClose();
  };


  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Modificar o preço</DialogTitle>
      <Divider />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
              <Typography gutterBottom variant="h6" component="h2">
                { title }
              </Typography>
          <form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="new_price"
                  id="new_price"
                  type="text"
                  variant="outlined"
                  fullWidth
                  label="Novo preço"
                  autoFocus
                  required
                  autoComplete="off"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Modificar
            </Button>
          </form>
        </div>
      </Container>
    </Dialog>
  );
}

SimpleEditDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default SimpleEditDialog;