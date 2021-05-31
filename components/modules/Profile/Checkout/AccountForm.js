import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Tooltip from '@material-ui/core/Tooltip';
import Router from 'next/router';

import ImageUpload from "../../ImageUpload";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme) => ({
  submitBtn: {
    backgroundColor: 'rgb(242, 135, 41, 0.7)',
    color: 'white',
    margin: theme.spacing(3, 0, 2),

  }
}));

export default function AccountForm() {
  const classes = useStyles();
  const [storePickup, setStorePickup] = useState(false);
  const [expressDelivery, setExpressDelivery] = useState(false);
  const [serverState, setServerState] = useState({
    submitting: false,
    succeeded: null
  });
  const [open, setOpen] = useState(true);

  
  const handleCheckPickup = () => {
    setStorePickup(!storePickup);
  };
  
  const handleCheckDelivery = () => {
    setExpressDelivery(!expressDelivery);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const computeWeight = (event) => {
    var weight = 0;
    const expressDelivery = event.target.expressDelivery.value;
    const storePickup = event.target.storePickup.value;
    if (expressDelivery && storePickup) {
      weight = 0.2;
    } else if (expressDelivery && !storePickup) {
      weight = 0.1;
    } else if (!expressDelivery && storePickup) {
      weight = 0.3;
    } else {
      weight = 0.4;
    }

    return weight
  }

  const registerUser = async event => {
    event.preventDefault();
    const form = event.target;
    setServerState({...serverState, ['submitting']: true})

    const res = await fetch('/api/createUser', {
      body: JSON.stringify({
        store: event.target.store.value,
        email: event.target.email.value,
        address: event.target.address.value,
        city: event.target.city.value,
        state: event.target.state.value,
        description: event.target.description.value,
        storePickup: event.target.storePickup.value,
        expressDelivery: event.target.expressDelivery.value,
        weight: computeWeight(event),
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    const result = await res.json();
    if (res.status === 200){
      setServerState({
        submitting: false,
        succeeded: true
      });
      form.reset();
      Router.push('/home');
    } else {
      setServerState({
        submitting: false,
        succeeded: false
      });
    }
  }

  return (
    <React.Fragment>
      <form onSubmit={registerUser}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Sobre a loja
          </Typography>
            <TextField
              required
              id="store"
              name="store"
              label="Nome da loja"
              fullWidth
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              type="email"
              label="Email"
              fullWidth
              autoComplete="given-name"
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <InputLabel>
            Logo
            </InputLabel>
            <ImageUpload cardName="Input Image" />
          </Grid> */}
          <Grid item xs={12}>
            <TextField
              required
              id="address"
              name="address"
              label="Endereço"
              fullWidth
              autoComplete="shipping address-line1"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="Cidade"
              fullWidth
              autoComplete="shipping address-level2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
              required
              id="state"
              name="state"
              label="Estado"
              fullWidth
              autoComplete="shipping address-level3"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="description"
              name="description"
              label="Apresente-se aqui"
              multiline
              rows={6}
              variant="outlined"
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Escolha a forma de entrega
          </Typography>
            <FormControlLabel
              control={<Checkbox color="primary" id="storePickup" name="storePickup" value={storePickup} onChange={handleCheckPickup} />}
              label="Retirada em loja"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="primary" id="expressDelivery" name="expressDelivery" value={expressDelivery} onChange={handleCheckDelivery} />}
              label="Expresso (grande Vitória)"
            />
          </Grid>
          <Grid item xs={12} style={{textAlign: "center"}}>
            <Button type="submit" className={classes.submitBtn}>
              Completar perfil
            </Button>
            {serverState.submitting && (
            <LinearProgress />
            )}
            {serverState.succeeded && (
              <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                  Usuário cadastrado!
                </Alert>
              </Snackbar>
            )}
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}