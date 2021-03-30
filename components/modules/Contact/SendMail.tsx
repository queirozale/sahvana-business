import React, {useState} from "react";
import { NextPage } from 'next';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';

import { useForm, ValidationError } from '@formspree/react';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#F2790F",
    color: 'white'
  },
  logo: {
    maxWidth: 160,
    marginBottom: theme.spacing(3)
  },
}));

const SignUp: NextPage = () => {
  const classes = useStyles();
  const [state, handleSubmit] = useForm("xrgrzjyo");
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h4">Fale conosco</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  label="Email para contato"
                  autoFocus
                  required
                />
              </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                name="message"
                label="Como podemos ajudar?"
                multiline
                rows={6}
                variant="outlined"
                fullWidth
                autoFocus
                required
              />
              <ValidationError 
                prefix="Message" 
                field="message"
                errors={state.errors}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            disabled={state.submitting}
          >
            Enviar
          </Button>
          {state.submitting && (
            <LinearProgress />
          )}
          {state.succeeded && (
              <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                  Mensagem enviada com sucesso!
                </Alert>
              </Snackbar>
          )}
        </form>
      </div>
    </Container>
  );
};

export default SignUp;