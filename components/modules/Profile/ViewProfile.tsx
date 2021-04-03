import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      maxWidth: 900
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
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

  const handleBool = (boolResponse: string) => {
    if (boolResponse === "true") {
      return "Sim";
    } else {
      return "Não";
    }
  }

  return (
    <div className={classes.root}>
      <Typography variant="h6" gutterBottom>
        Dados cadastrais
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="standard-full-width"
            label="Loja"
            style={{ margin: 8 }}
            defaultValue={userData.store}
            fullWidth
            margin="normal"
            variant="outlined"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="standard-full-width"
            label="Email"
            style={{ margin: 8 }}
            defaultValue={userData.email}
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
            id="standard-full-width"
            label="Endereço"
            style={{ margin: 8 }}
            defaultValue={userData.address}
            fullWidth
            margin="normal"
            variant="outlined"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="standard-full-width"
            label="Cidade"
            style={{ margin: 8 }}
            defaultValue={userData.city}
            fullWidth
            margin="normal"
            variant="outlined"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="standard-full-width"
            label="Estado"
            style={{ margin: 8 }}
            defaultValue={userData.state}
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
            id="standard-full-width"
            label="Descrição"
            style={{ margin: 8 }}
            defaultValue={userData.description}
            fullWidth
            multiline
            rows={6}
            margin="normal"
            variant="outlined"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="standard-full-width"
            label="Retirar na loja"
            style={{ margin: 8 }}
            defaultValue={handleBool(userData.storePickup)}
            fullWidth
            margin="normal"
            variant="outlined"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="standard-full-width"
            label="Entrega expresso"
            style={{ margin: 8 }}
            defaultValue={handleBool(userData.expressDelivery)}
            fullWidth
            margin="normal"
            variant="outlined"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};
