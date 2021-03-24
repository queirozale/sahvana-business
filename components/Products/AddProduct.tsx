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
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import ImageUpload from "./ImageUpload";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
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
  selectEmpty: {
    marginTop: theme.spacing(0),
    width: '100%'
  }
}));

const ProductForm: NextPage = () => {
  const classes = useStyles();
  const [serverState, setServerState] = useState({
    submitting: false,
    status: null
  });
  const [size, setSize] = useState('');
  const [gender, setGender] = useState('');

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleServerResponse = (ok, msg, form) => {
    setServerState({
      submitting: false,
      status: { ok, msg }
    });
    if (ok) {
      form.reset();
    }
  };

  const registerProduct = async event => {
    event.preventDefault()
    const form = event.target;

    const res = await fetch('/api/registerProduct', {
      body: JSON.stringify({
        description: event.target.description.value,
        gender: event.target.gender.value,
        size: event.target.size.value,
        color: event.target.color.value,
        inventory: event.target.inventory.value,
        original_price: event.target.original_price.value,
        promotional_price: event.target.promotional_price.value,
        tags: event.target.tags.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    const result = await res.json();
    if (res.status === 200){
      handleServerResponse(true, alert("Produto registrado"), form);
      Router.push('/');
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
            <Typography gutterBottom variant="h5" component="h2" className={classes.typography}>
              Adicione seu produto
            </Typography>
        <form className={classes.form} onSubmit={registerProduct}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="description"
                id="description"
                type="text"
                variant="outlined"
                fullWidth
                label="Descrição"
                autoFocus
                required
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                id="gender"
                name="gender"
                value={gender}
                onChange={handleGenderChange}
                displayEmpty
                className={classes.selectEmpty}
                variant="outlined"
                required
                autoFocus
              >
                <MenuItem value="">
                  <em>Gênero</em>
                </MenuItem>
                <MenuItem value={"Masculino"}>Masculino</MenuItem>
                <MenuItem value={"Feminino"}>Feminino</MenuItem>
                <MenuItem value={"Unissex"}>Unissex</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                id="size"
                name="size"
                value={size}
                onChange={handleSizeChange}
                displayEmpty
                className={classes.selectEmpty}
                variant="outlined"
                required
                autoFocus
              >
                <MenuItem value="">
                  <em>Tamanho</em>
                </MenuItem>
                <MenuItem value={"PP"}>PP</MenuItem>
                <MenuItem value={"P"}>P</MenuItem>
                <MenuItem value={"M"}>M</MenuItem>
                <MenuItem value={"G"}>G</MenuItem>
                <MenuItem value={"GG"}>GG</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="color"
                name="color"
                type="text"
                variant="outlined"
                fullWidth
                label="Cor"
                autoFocus
                required
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="inventory"
                name="inventory"
                type="text"
                variant="outlined"
                fullWidth
                label="Estoque"
                autoFocus
                required
                autoComplete="off"
              />
            </Grid>
            {/* <Grid>
              <ImageUpload cardName="Input Image" />
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <TextField
                id="original_price"
                name="original_price"
                type="text"
                variant="outlined"
                fullWidth
                label="Preço Original"
                autoFocus
                required
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="promotional_price"
                name="promotional_price"
                type="text"
                variant="outlined"
                fullWidth
                label="Preço Promocional"
                autoFocus
                required
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="tags"
                name="tags"
                type="text"
                variant="outlined"
                fullWidth
                label="Tags"
                autoFocus
                multiline
                rows={4}
                required
                autoComplete="off"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Adicionar
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ProductForm;