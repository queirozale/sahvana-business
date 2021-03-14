import React, {useState} from "react";
import { NextPage } from 'next';

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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://sahvana.com/">
        Sahvana
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
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
    backgroundColor: "#DAC48E"
  },
  logo: {
    maxWidth: 160,
    marginBottom: theme.spacing(3)
  },
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
    event.preventDefault()
    const form = event.target;

    const res = await fetch('/api/user', {
      body: JSON.stringify({
        name: event.target.name.value,
        surname: event.target.surname.value,
        email: event.target.email.value,
        store: event.target.store.value,
        password: event.target.password.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    const result = await res.json();
    handleServerResponse(true, "Obrigado por se cadastrar na Sahvana Business!", form);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src="sahvana_logo.png" alt="logo" className={classes.logo} />
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
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
            <Grid item xs={12}>
              <TextField
                id="password"
                name="password"
                type="password"
                variant="outlined"
                fullWidth
                label="Password"
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
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Já possui uma conta? Entre agora mesmo
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignUp;