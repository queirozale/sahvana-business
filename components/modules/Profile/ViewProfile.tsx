import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Tooltip from '@material-ui/core/Tooltip';

import Router from 'next/router';
import { useSession } from 'next-auth/client';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(2),
    },
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      maxWidth: 900
    },
    form: {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
    title: {
      marginLeft: theme.spacing(2),
    },
    btn: {
      backgroundColor: "rgb(242, 121, 15, 0.7)",
      color: "white"
    }
  }),
);

export interface ProfileProps {
  userData: {
    store: string; 
    email: string; 
    address: string; 
    city: string; 
    state: string;
    description: string;
    storePickup: string;
    expressDelivery: string; 
  };
};

export default function Profile(props: ProfileProps) {
  const classes = useStyles();
  const userData = props.userData;
  const [editMode, setEditMode] = useState(false);
  const [storePickup, setStorePickup] = useState(false);
  const [expressDelivery, setExpressDelivery] = useState(false);
  const [sahvanaDelivery, setSahvanaDelivery] = useState(false);
  const [ session, loading ] = useSession();
  const [serverState, setServerState] = useState({
    submitting: false,
    succeeded: null
  });
  const [open, setOpen] = useState(true);

  const handleBool = (boolResponse: string) => {
    if (boolResponse === "true") {
      return "Sim";
    } else {
      return "N??o";
    }
  };

  const handleClick = () => {
    setEditMode(!editMode);
  };

  const handleCheckPickup = () => {
    setStorePickup(!storePickup);
  };

  const handleCheckDelivery = () => {
    setExpressDelivery(!expressDelivery);
  };

  const handleSahvanaDelivery = () => {
    setSahvanaDelivery(!sahvanaDelivery);
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
    };

    return weight;
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
        weight: computeWeight(event)
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
      Router.reload();
    } else {
      setServerState({
        submitting: false,
        succeeded: false
      });
    }
  };


  const updateUser = async event => {
    event.preventDefault();
    const form = event.target;
    setServerState({...serverState, ['submitting']: true})

    const res = await fetch('/api/updateUser', {
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
      Router.reload();
    } else {
      setServerState({
        submitting: false,
        succeeded: false
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.root}>
        {userData && (
          <div>
            <form onSubmit={updateUser} className={classes.form}>
              <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5" gutterBottom className={classes.title}>
                  Dados cadastrais
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} style={{textAlign: 'right'}}>
                <Button onClick={handleClick} className={classes.btn}>
                  EDITAR
                </Button>
              </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="store"
                    name="store"
                    label="Loja"
                    style={{ margin: 8 }}
                    defaultValue={userData.store}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    disabled={!editMode}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="email"
                    name="email"
                    label="Email"
                    style={{ margin: 8 }}
                    defaultValue={session.user.email}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    disabled
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="address"
                    name="address"
                    label="Endere??o"
                    style={{ margin: 8 }}
                    defaultValue={userData.address}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    disabled={!editMode}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="city"
                    name="city"
                    label="Cidade"
                    style={{ margin: 8 }}
                    defaultValue={userData.city}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    disabled={!editMode}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="state"
                    name="state"
                    label="Estado"
                    style={{ margin: 8 }}
                    defaultValue={userData.state}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    disabled={!editMode}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="description"
                    name="description"
                    label="Apresente-se aqui"
                    style={{ margin: 8 }}
                    defaultValue={userData.description}
                    fullWidth
                    multiline
                    rows={6}
                    margin="normal"
                    variant="outlined"
                    disabled={!editMode}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                {editMode && (
                  <>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Escolha a forma de entrega
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      disabled control={<Checkbox color="primary" id="mail" name="mail"
                      checked={true}
                      />}
                      label="Correios"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={<Checkbox color="primary" id="storePickup" name="storePickup" 
                      value={storePickup} onChange={handleCheckPickup} />}
                      label="Retirada em loja *"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={<Checkbox color="primary" id="expressDelivery" name="expressDelivery" 
                      value={expressDelivery} onChange={handleCheckDelivery} />}
                      label="Entrega via motoboy *"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Tooltip title="Utilize o nosso contrato com os correios e nossa frota de motoboys, por R$4,99 por pedido" 
                    aria-label="add">
                      <FormControlLabel
                        control={<Checkbox color="primary" id="sahvanaDelivery" name="sahvanaDelivery" 
                        value={sahvanaDelivery} onChange={handleSahvanaDelivery} />}
                        label="Entrega da Sahvana *"
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={12} style={{textAlign: "center"}}>
                    <Button type="submit" className={classes.btn}>
                      SALVAR
                    </Button>
                  </Grid>
                  {serverState.submitting && (
                    <Grid item xs={12}>
                      <LinearProgress />
                    </Grid>
                  )}
                  {serverState.succeeded && (
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                      <Alert onClose={handleClose} severity="success">
                        Informa????es atualizadas com sucesso!
                      </Alert>
                    </Snackbar>
                  )}
                  </>
                )}
                {!editMode && (
                  <>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="mail"
                        name="mail"
                        label="Correios"
                        style={{ margin: 8 }}
                        defaultValue={"Sim"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        disabled
                        InputLabelProps={{
                          shrink: true,
                        }}
                        required
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="storePickup"
                        name="storePickup"
                        label="Retirar na loja"
                        style={{ margin: 8 }}
                        defaultValue={userData? handleBool(userData.storePickup) : ""}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        disabled
                        InputLabelProps={{
                          shrink: true,
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="expressDelivery"
                        name="expressDelivery"
                        label="Entrega via motoboy"
                        style={{ margin: 8 }}
                        defaultValue={userData? handleBool(userData.expressDelivery) : ""}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        disabled
                        InputLabelProps={{
                          shrink: true,
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Tooltip title="Utilize o nosso contrato com os correios e nossa frota de motoboys, por R$4,99 por pedido" 
                      aria-label="add">
                        <TextField
                          id="sahvanaDelivery"
                          name="sahvanaDelivery"
                          label="Entrega da Sahvana"
                          style={{ margin: 8 }}
                          defaultValue={userData? handleBool(userData.expressDelivery) : ""}
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          disabled
                          InputLabelProps={{
                            shrink: true,
                          }}
                          required
                        />
                      </Tooltip>
                    </Grid>
                  </>
                )}
              </Grid>
            </form>
          </div>
        )}
        {!userData && (
          <div>
            <Typography variant="h5" gutterBottom className={classes.title}>
              Complete seu perfil
            </Typography>
            <form onSubmit={registerUser} className={classes.form}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="store"
                    name="store"
                    label="Loja"
                    style={{ margin: 8 }}
                    defaultValue=""
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="email"
                    name="email"
                    label="Email"
                    style={{ margin: 8 }}
                    defaultValue={session.user.email}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    disabled
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="address"
                    name="address"
                    label="Endere??o"
                    style={{ margin: 8 }}
                    defaultValue=""
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="city"
                    name="city"
                    label="Cidade"
                    style={{ margin: 8 }}
                    defaultValue=""
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="state"
                    name="state"
                    label="Estado"
                    style={{ margin: 8 }}
                    defaultValue=""
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="description"
                    name="description"
                    label="Descri????o"
                    style={{ margin: 8 }}
                    defaultValue=""
                    fullWidth
                    multiline
                    rows={6}
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="mail"
                    name="mail"
                    label="Correios"
                    style={{ margin: 8 }}
                    defaultValue={"Sim"}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    disabled
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                    disabled
                  />
                  <FormControlLabel
                    control={<Checkbox color="primary" id="storePickup" name="storePickup" 
                    value={storePickup} onChange={handleCheckPickup} />}
                    label="Retirada em loja"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={<Checkbox color="primary" id="expressDelivery" name="expressDelivery" 
                    value={expressDelivery} onChange={handleCheckDelivery} />}
                    label="Entrega via motoboy"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Tooltip title="Utilize o nosso contrato com os correios e nossa frota de motoboys, por R$4,99 por pedido" 
                    aria-label="add">
                      <FormControlLabel
                        control={<Checkbox color="primary" id="sahvanaDelivery" name="sahvanaDelivery" 
                        value={sahvanaDelivery} onChange={handleSahvanaDelivery} />}
                        label="Entrega da Sahvana *"
                      />
                    </Tooltip>
                  </Grid>
                <Grid item xs={12} style={{textAlign: "center"}}>
                  <Button type="submit" className={classes.btn}>
                    SALVAR
                  </Button>
                </Grid>
                {serverState.submitting && (
                  <Grid item xs={12}>
                    <LinearProgress />
                  </Grid>
                )}
                {serverState.succeeded && (
                  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                      Usu??rio cadastrado com sucesso!
                    </Alert>
                  </Snackbar>
                )}
              </Grid>
            </form>
          </div>
        )}
      </div>
    </Paper>
  );
};
