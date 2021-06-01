import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Router from 'next/router';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

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
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState(null);
  const [serverState, setServerState] = useState({
    submitting: false,
    succeeded: null
  });
  const [checked, setChecked] = useState(false);
  const [text, setText] = useState(null);
  const transcript = {
    "User created": "Usuário criado com sucesso",
    "Password is too weak": "Senha muito fraca",
    "User already exists": "Usuário já existente",
    "Error": "Erro ao cadastrar usuário"
  };

  const handleClose = () => {
    setOpen(false);
    Router.reload();
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setServerState({...serverState, ['submitting']: true});
    setText("Carregando...");

    const res = await fetch('https://sahvana-admin.herokuapp.com/api/create_user', {
      body: JSON.stringify({
        email: event.target.email.value,
        name: event.target.name.value,
        nickname: event.target.vendor.value,
        password: event.target.password.value,
        data_migration: checked
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    const result = await res.json();
    setMessage(result);
    setText(null);

    if (res.status === 200){
      setServerState({
        submitting: false,
        succeeded: true
      });
    } else {
      setServerState({
        submitting: false,
        succeeded: false
      });
    }
  };

  const handleCheck = () => {
    setChecked(!checked);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastro
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Nome"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="vendor"
                label="Loja"
                name="vendor"
                autoComplete="vendor"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                value={checked}
                onChange={handleCheck}
                label="Importar os dados já existentes?"
              />
            </Grid>
            <Grid item xs={12}>
              {text}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Cadastrar
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Já tem uma conta? Entrar
              </Link>
            </Grid>
          </Grid>
        </form>
          {serverState.submitting && (
            <LinearProgress />
          )}
          {serverState.succeeded && (
            <div>
              <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={message.message == "User created"? "success" : "error"}>
                  {transcript[message.message]}
                  {checked?
                  message.data_migration == "Success"? ". Dados migrados com sucesso" : ". Erro na migração de dados"
                  :
                  null
                  }
                </Alert>
              </Snackbar>
            </div>

          )}
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}