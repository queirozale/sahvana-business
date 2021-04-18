import React, { useState } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer, { DrawerProps } from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';

import ImageUploadCard from '../ImageUpload';


import tagOptions from './TagOptions';

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
    maxWidth: 950,
    minWidth: 400,
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      minWidth: 950,
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
  },
  mediaArea: {
    padding: theme.spacing(2),
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
  const [collection, setCollection] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [categoriesItems, setCategoriesItems] = useState([]);
  const [subcategoriesItems, setSubcategoriesItems] = useState([]);
  const [originalPrice, setOriginalPrice] = useState('');
  const categoriesOptions = tagOptions.categoriesOptions;
  const subcategoriesOptionsMale = tagOptions.subcategoriesOptionsMale;
  const subcategoriesOptionsFemale = tagOptions.subcategoriesOptionsFemale;
  const subcategoriesOptionsUnissex = tagOptions.subcategoriesOptionsUnissex;
  // const [variantPrices, setVariantPrices] = useState({});

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

  const handleCollectionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCollection(event.target.value as string);
    setCategoriesItems(categoriesOptions[event.target.value as string]);
  };

  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(event.target.value as string);
    if (collection === "Masculino") {
      setSubcategoriesItems(subcategoriesOptionsMale[event.target.value as string]);
    } else if (collection === "Feminino") {
      setSubcategoriesItems(subcategoriesOptionsFemale[event.target.value as string]);
    } else {
      setSubcategoriesItems(subcategoriesOptionsUnissex[event.target.value as string]);
    }
  };

  const handleSubcategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSubcategory(event.target.value as string);
  };

  const handleOriginalPriceChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setOriginalPrice(event.target.value as string);
  };

  const createProduct = async event => {
    event.preventDefault();
    const form = event.target;

    const inputOption1 = event.target.inputOption1? event.target.inputOption1.value : null;
    const variantType1 = event.target.variantType1? event.target.variantType1.value : null;

    const inputOption2 = event.target.inputOption2? event.target.inputOption2.value : null;
    const variantType2 = event.target.variantType2? event.target.variantType2.value : null;

    const inputOption3 = event.target.inputOption3? event.target.inputOption3.value : null;
    const variantType3 = event.target.variantType3? event.target.variantType3.value : null;

    var variantPrices = {}
    var variantInventories = {}

    optionValues.map(item => (
      variantPrices[item] = event.target['price_' + item].value
    ))

    optionValues.map(item => (
      variantInventories[item] = Number(event.target['inventory_' + item].value)
    ))

    const res = await fetch('https://sahvana-admin.herokuapp.com/api/create_product', {

      body: JSON.stringify({
        title: event.target.title.value,
        description: event.target.description.value,
        total_inventory: Number(event.target.inventory.value),
        original_price: event.target.original_price.value, 
        promotional_price: event.target.promotional_price.value,
        gender: event.target.gender.value,
        category: event.target.category.value,
        subcategory: event.target.subcategory.value,
        has_variant: event.target.has_variant.value,
        variantType1: variantType1,
        inputOption1: inputOption1,
        variantType2: variantType2,
        inputOption2: inputOption2,
        variantType3: variantType3,
        inputOption3: inputOption3,
        variantPrices: variantPrices,
        variantInventories: variantInventories,
        imageFiles: [
          imageFile1,
          imageFile2,
          imageFile3,
          imageFile4
        
        ]}),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    const result = await res.text();
    Router.reload();
  };

  const [imageFile1, setImageFile1] = useState(null);
  const [imageFile2, setImageFile2] = useState(null);
  const [imageFile3, setImageFile3] = useState(null);
  const [imageFile4, setImageFile4] = useState(null);

  const setImage1 = (selectedFile) => {
    setImageFile1(selectedFile);
  };

  const setImage2 = (selectedFile) => {
    setImageFile2(selectedFile);
  };

  const setImage3 = (selectedFile) => {
    setImageFile3(selectedFile);
  };

  const setImage4 = (selectedFile) => {
    setImageFile4(selectedFile);
  };

  return (
    <React.Fragment>
    <CssBaseline />
    <main className={classes.layout}>
      <form onSubmit={createProduct}>
        <Grid 
        container 
        spacing={4}   
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.root}
        >
          <Grid item xs={12}>
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
                    label="Nome do produto"
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
                <Grid item xs={12}>
                  <Typography className={classes.title} component="h5" variant="h6" align="left">
                    Media
                  </Typography>
                  <Box display="flex" justifyContent="center" border={1} className={classes.mediaArea} borderRadius={5}>
                    <Grid container>
                      <Grid item xs={3}>
                        <ImageUploadCard setImage={setImage1} />
                      </Grid>
                      <Grid item xs={3}>
                        <ImageUploadCard setImage={setImage2} />
                      </Grid>
                      <Grid item xs={3}>
                        <ImageUploadCard setImage={setImage3} />
                      </Grid>
                      <Grid item xs={3}>
                        <ImageUploadCard setImage={setImage4} />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.title} component="h5" variant="h6" align="left">
                    Tags
                  </Typography>
                  <Select
                    id="gender"
                    name="gender"
                    value={collection}
                    onChange={handleCollectionChange}
                    inputProps={{ 'aria-label': 'Without label' }}
                    fullWidth
                    displayEmpty
                    variant="outlined"
                  >
                    <MenuItem value="">
                      <em>Coleção</em>
                    </MenuItem>
                    <MenuItem value={"Masculino"}>Masculino</MenuItem>
                    <MenuItem value={"Feminino"}>Feminino</MenuItem>
                    <MenuItem value={"Unissex"}>Unissex</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <Select
                    id="category"
                    name="category"
                    value={category}
                    onChange={handleCategoryChange}
                    inputProps={{ 'aria-label': 'Without label' }}
                    fullWidth
                    displayEmpty
                    variant="outlined"
                  >
                    <MenuItem value="">
                      <em>Categoria</em>
                    </MenuItem>
                    {categoriesItems.map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <Select
                    id="subcategory"
                    name="subcategory"
                    value={subcategory}
                    onChange={handleSubcategoryChange}
                    inputProps={{ 'aria-label': 'Without label' }}
                    fullWidth
                    displayEmpty
                    variant="outlined"
                  >
                    <MenuItem value="">
                      <em>Sub-Categoria</em>
                    </MenuItem>
                    {subcategoriesItems.map(option => (
                      <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paperSecondRow}>
              <Typography className={classes.title} component="h4" variant="h5" align="left">
                Variantes
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="inventory"
                    name="inventory"
                    variant="outlined"
                    fullWidth
                    label="Quantidade Total"
                    defaultValue="0"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="original_price"
                    name="original_price"
                    variant="outlined"
                    fullWidth
                    label="Preço Original"
                    value={originalPrice}
                    onChange={handleOriginalPriceChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="promotional_price"
                    name="promotional_price"
                    variant="outlined"
                    fullWidth
                    label="Preço Promocional"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary" 
                        id="has_variant" 
                        name="has_variant" 
                        value={variant} 
                      />
                    }
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
                            id={"variantType" + option}
                            name={"variantType" + option}
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
                        id={"price_" + item}
                        name={"price_" + item}
                        variant="outlined"
                        fullWidth
                        defaultValue={originalPrice}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id={"inventory_" + item}
                        name={"inventory_" + item}
                        variant="outlined"
                        fullWidth
                        label="Quantidade"
                        defaultValue="0"
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

