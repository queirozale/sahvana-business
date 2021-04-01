import React, {useState} from "react";
import { NextPage } from 'next';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';

import { useForm, ValidationError } from '@formspree/react';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
  paper: {
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
    backgroundColor: "#DAC48E",
    width: '70%'
  },
  logo: {
    maxWidth: 160,
    marginBottom: theme.spacing(3)
  },
  title: {
    paddingBottom: theme.spacing(3),
  },
  signUp: {
    backgroundColor: 'white',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    borderRadius: '10px'
  }
}));

const SignUp: NextPage = () => {
  const classes = useStyles();
  const [state, handleSubmit] = useForm("xgerewgn");
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.signUp}>
      <CssBaseline />
      <div className={classes.paper}>
      <Typography variant="h4" component="h5" className={classes.title}>Cadastre-se</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                name="name"
                id="name"
                type="text"
                // variant="outlined"
                fullWidth
                label="Nome"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                autoFocus
                required
              />
            </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  fullWidth
                  label="Email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  autoFocus
                  required
                />
              </Grid>
            <Grid item xs={12}>
              <TextField
                id="phone"
                name="phone"
                type="text"
                fullWidth
                label="Celular"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
                autoFocus
                required
              />
            </Grid>
            <Grid item xs={12} style={{textAlign: "center"}}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                Começar o cadastro
              </Button>
              {state.submitting && (
                <LinearProgress />
              )}
            </Grid>
          </Grid>
          {state.succeeded && (
              <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                  Vamos entrar em contato com você!
                </Alert>
              </Snackbar>
          )}
        </form>
      </div>
    </Container>
  );
};

export default SignUp;