import React, {useState} from "react";
import { NextPage } from 'next';
import Router from 'next/router';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


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
    backgroundColor: "#DAC48E"
  },
  logo: {
    maxWidth: 160,
    marginBottom: theme.spacing(3)
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
  const [serverState, setServerState] = useState({
    submitting: false,
    status: null
  });

  const handleServerResponse = (ok, msg, form) => {
    setServerState({
      submitting: false,
      status: { ok, msg }
    });
    if (ok) {
      form.reset();
    }
  };

  const registerUser = async event => {
    event.preventDefault();
    const form = event.target;

    const res = await fetch('/api/createUser', {
      body: JSON.stringify({
        name: event.target.name.value,
        surname: event.target.surname.value,
        email: event.target.email.value,
        store: event.target.store.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    const result = await res.json();
    if (res.status === 200){
      handleServerResponse(true, alert("Obrigado por se cadastrar na Sahvana Business!"), form);
      // Router.push('/');
    }
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.signUp}>
      <CssBaseline />
      <div className={classes.paper}>
      <Typography variant="h4" component="h5">Cadastre-se</Typography>
        <form className={classes.form} onSubmit={registerUser}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                id="name"
                type="text"
                variant="outlined"
                fullWidth
                label="Nome"
                autoFocus
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="surname"
                name="surname"
                type="text"
                variant="outlined"
                fullWidth
                label="Sobrenome"
                autoFocus
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="store"
                name="store"
                type="text"
                variant="outlined"
                fullWidth
                label="Loja"
                autoFocus
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                name="email"
                type="email"
                variant="outlined"
                fullWidth
                label="Email"
                autoFocus
                required
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Cadastrar
          </Button>
          {serverState.status && (
                    <p className={!serverState.status.ok ? "errorMsg" : ""}>
                      {serverState.status.msg}
                    </p>
          )}
        </form>
      </div>
    </Container>
  );
};

export default SignUp;