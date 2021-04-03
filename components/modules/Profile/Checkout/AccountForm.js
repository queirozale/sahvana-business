import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import ImageUpload from "../../ImageUpload";

const useStyles = makeStyles((theme) => ({
  submitBtn: {
    backgroundColor: 'rgb(242, 135, 41, 0.7)',
    color: 'white'
  }
}));

export default function AccountForm() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Sobre a loja
        </Typography>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Nome da loja"
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
            id="address1"
            name="address1"
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
            required
            id="zip"
            name="zip"
            label="Fale um pouco sobre a sua loja"
            multiline
            rows={6}
            variant="outlined"
            fullWidth
            autoComplete="shipping postal-code"
          />
        </Grid>
        <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Escolha a forma de entrega
        </Typography>
          <FormControlLabel
            control={<Checkbox color="primary" name="saveCard" value="yes" />}
            label="Retirada em loja"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="primary" name="saveCard" value="yes" />}
            label="Expresso (grande Vitória)"
          />
        </Grid>
        <Grid item xs={12} style={{textAlign: "center"}}>
          <Button className={classes.submitBtn}>
            Completar perfil
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}