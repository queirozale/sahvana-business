import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import InputLabel from '@material-ui/core/InputLabel';

import Upload from "../../Products/ImUp";
import ImageUpload from "../../Products/ImageUpload";

export default function AddressForm() {
  const [file, setFile] = useState(null);

  const handleChange = (event) => {
    setFile({
      file: URL.createObjectURL(event.target.files[0])
    })
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Sobre a sua loja
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Nome da loja"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <Upload /> */}
          <InputLabel>
          Logo
          </InputLabel>
          <ImageUpload cardName="Input Image" />
          {/* <Button
            variant="contained"
            component="label"
          >
            <AddPhotoAlternateIcon />
            <input
              type="file"
              hidden
              onChange={handleChange}
            />
          </Button>
          <img src={file}/> */}
        </Grid>
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
      </Grid>
    </React.Fragment>
  );
}