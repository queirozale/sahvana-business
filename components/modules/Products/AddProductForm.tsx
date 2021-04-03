import React, { useState } from 'react';
import { NextPage } from 'next';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer, { DrawerProps } from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import ImageUpload from "../ImageUpload";

const styles = (theme: Theme) => 
createStyles({
  layout: {
    width: 'auto',
    backgroundColor: '#eeeeee',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paperFirstRow: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    maxWidth: 950,
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  paperSecondRow: {
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(3),
    },
  },
  paperThirdRow: {
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(3),
    },
  },
  root: {
    display: 'flex',
    paddingTop: '15px',
    paddingBottom: '15px', 
    paddingLeft: '15px',
    paddingRight: '15px',
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  optionDescription: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  submitBtn: {
    backgroundColor: 'rgb(242, 135, 41, 0.7)',
    color: 'white',
    width: '10%',
    [theme.breakpoints.down('sm')]: {
      width: '20%',
    },
  }
});

export interface AddProductFormProps extends Omit<DrawerProps, 'classes'>, WithStyles<typeof styles> {}

const AddProductForm: NextPage = (props: AddProductFormProps) => {
  const { classes, ...other } = props;
  const [variant, setVariant] = useState(false);
  const [options, setOptions] = useState([1]);
  const [variantTypes, setVariantTypes] = useState({1: '', 2: '', 3: ''})
  const [options1, setOptions1] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [options3, setOptions3] = useState([]);
  const [optionValues, setOptionValues] = useState([]);
  
  const handleSubmit = () => {
    console.log(variantTypes);
  };

  const handleCheckBox = () => {
    setVariant(!variant);
  };

  const handleAddOption = () => {
    if (options[options.length-1] < 3) {
      setOptions([...options, options[options.length-1] + 1]);
    }
  };

  const handleRemoveOption = () => {
    setOptions(options.slice(0, options.length-1));
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>, option: number) => {
    setVariantTypes({...variantTypes, [option]: event.target.value as string});
  };

  const generateOptionsCombinations = () => {
    var optionsCombinations = [];

    if (options2.length == 0 && options3.length == 0) {
      options1.map(x => (
        optionsCombinations.push(x)
      ))
    } else if (options2.length > 0 && options3.length == 0) {
      options1.map(x => (
        options2.map(y => (
          x.length * y.length > 0 && optionsCombinations.push(x + '/' + y)
        ))
      ))
    } else if (options2.length == 0 && options3.length > 0) {
      options1.map(x => (
        options3.map(z => (
          x.length * z.length > 0 && optionsCombinations.push(x + '/' + z)
        ))
      ))
    } else {
      options1.map(x => (
        options2.map(y => (
          options3.map(z => (
            x.length * y.length * z.length > 0 && optionsCombinations.push(x + '/' + y + '/' + z)
          ))
        ))
      ))
    }

    return optionsCombinations;
  };

  const handleOptionChange = (e, option) => {
    if (option === 1) {
      setOptions1(e.target.value.split(','));
    } else if (option === 2) {
      setOptions2(e.target.value.split(','));
    } else {
      setOptions3(e.target.value.split(','));
    }

    setOptionValues(generateOptionsCombinations());
  };

  const registerProduct = async event => {
    event.preventDefault();
    const form = event.target;

    const res = await fetch('/api/registerProduct', {
      body: JSON.stringify({
        title: event.target.title.value,
        variantProperties: event.target.description.value,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    const result = await res.json();

  };

  return (
    <React.Fragment>
    <CssBaseline />
    <main className={classes.layout}>
      {/* <Typography className={classes.title} component="h1" variant="h4" align="center">
        Form
      </Typography> */}
      <form onSubmit={registerProduct}>
        <Grid container spacing={5} className={classes.root}>
          <Grid item xs={12} sm={4}>
            <Paper className={classes.paperFirstRow}>
              <Typography className={classes.title} component="h4" variant="h5" align="left">
                Produto
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    id="title"
                    name="title"
                    variant="outlined"
                    fullWidth
                    label="Título"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="description"
                    name="description"
                    label="Descrição"
                    multiline
                    rows={6}
                    variant="outlined"
                    fullWidth
                    autoFocus
                    required
                  />
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                  <ImageUpload cardName="Input Image" />
                </Grid> */}
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper className={classes.paperFirstRow}>
              <Typography className={classes.title} component="h4" variant="h5" align="left">
                Variantes
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox color="primary" name="saveCard" value="yes" />}
                    label="Este produto tem várias opções, como tamanhos ou cores diferentes"
                    onChange={handleCheckBox}
                  />
                </Grid>
                {variant && 
                options.map((option) => (
                  <React.Fragment key={option}>
                    <Grid item xs={12}>
                      <Divider light={true} />
                      <Typography className={classes.optionDescription} component="h6" align="left">
                        Opção {option}
                      </Typography>
                      <Grid container spacing={4}>
                        <Grid item xs={12} sm={4}>
                          <Select
                            value={variantTypes[option]}
                            onChange={e => handleChange(e, option)}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            fullWidth
                            variant="outlined"
                          >
                            <MenuItem value="">
                              <em>Selecione</em>
                            </MenuItem>
                            <MenuItem value={'Tamanho'}>Tamanho</MenuItem>
                            <MenuItem value={'Cor'}>Cor</MenuItem>
                            <MenuItem value={'Estilo'}>Estilo</MenuItem>
                          </Select>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                        <TextField
                          id={"inputOption" + option}
                          name={"inputOption" + option}
                          variant="outlined"
                          fullWidth
                          label="Separe as opções com vírgula"
                          onChange={(e) => handleOptionChange(e, option)}
                          autoFocus
                          required
                          autoComplete='off'
                        />
                        </Grid>
                      </Grid>
                      {option < 3 && (
                        <Button onClick={handleAddOption}>
                          Adicionar outra opção
                        </Button>
                      )}
                      {option > 1 && (
                        <Button onClick={handleRemoveOption}>
                          Remover
                        </Button>
                      )}
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </Paper>
          </Grid>
          {variant && (
            <Grid item xs={12}>
              <Paper className={classes.paperSecondRow}>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={4}>
                    Variante
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    Preço
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    Quantidade
                  </Grid>
                  {optionValues.length > 0 && 
                  optionValues.map((item) => (
                    <React.Fragment key={item}>
                      <Grid item xs={12} sm={4}>
                        <InputLabel>
                          {item}
                        </InputLabel>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          id="price"
                          name="price"
                          variant="outlined"
                          fullWidth
                          label="R$ 00,00"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          id="inventory"
                          name="inventory"
                          variant="outlined"
                          fullWidth
                          label="0"
                          required
                        />
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          )}
          <Grid item xs={12} sm={12} style={{textAlign: "center"}}>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submitBtn}
            >
              Cadastrar
            </Button>
          </Grid>
        </Grid>
      </form>
    </main>
  </React.Fragment>
  );
};

export default withStyles(styles)(AddProductForm);

