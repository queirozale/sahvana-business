import React, { useState } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { useSession } from 'next-auth/client';

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
import { DrawerProps } from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import ChipInput from 'material-ui-chip-input';

import ImageUploadCard from '../ImageUpload';
import tagOptions from './TagOptions';
import utils from './Utils';
import { DataUsageSharp } from '@material-ui/icons';


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
  const [ session, loading ] = useSession();
  const [variant, setVariant] = useState(false); // Has variant or not
  const [options, setOptions] = useState([1]); // Number of options (variants)
  const [variantTypes, setVariantTypes] = useState({1: '', 2: '', 3: ''}); // Variant types
  const [variantValues, setVariantValues] = useState([]); // Variant values
  const [optionValues, setOptionValues] = useState({1: [], 2: [], 3: [] }); // Options (variant values)
  const [classification, setClassification] = useState({
    'collection': '',
    'category': '',
    'subcategory': ''
  }); // Classification names
  const [classificationItems, setClassificationItems] = useState({
    'collection': ['Masculino', 'Feminino', 'Genderless'],
    'category': [],
    'subcategory': []
    // 'category': tagOptions.categoriesOptions,
    // 'subcategory': {
    //   'Masculino': tagOptions.subcategoriesOptionsMale,
    //   'Feminino': tagOptions.subcategoriesOptionsFemale,
    //   'Genderless': tagOptions.subcategoriesOptionsGenderless
    // }
  }); // Classification values

  // tag options
  const categoriesOptions = tagOptions.categoriesOptions;
  const subcategoriesOptionsMale = tagOptions.subcategoriesOptionsMale;
  const subcategoriesOptionsFemale =  tagOptions.subcategoriesOptionsFemale;
  const subcategoriesOptionsGenderless = tagOptions.subcategoriesOptionsGenderless;

  const [originalPrice, setOriginalPrice] = useState('');
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const handleCheckBox = () => {
    setVariant(!variant);
  };

  const handleAddOption = () => {
    if (options[options.length-1] < 3) {
      setOptions([...options, options[options.length-1] + 1]);
    }
  };

  const handleRemoveOption = (option) => {
    var instantOptionsData = {};
    if (option === 1) {
      setOptionValues({...optionValues, [1]: []});
      instantOptionsData = {
        1: [],
        2: optionValues[2],
        3: optionValues[3]
      };
    } else if (option === 2) {
      setOptionValues({...optionValues, [2]: []});
      instantOptionsData = {
        1: optionValues[1],
        2: [],
        3: optionValues[3]
      };
    } else {
      setOptionValues({...optionValues, [3]: []});
      instantOptionsData = {
        1: optionValues[1],
        2: optionValues[2],
        3: []
      };
    }
    
    var combinations = utils.generateOptionsCombinations(instantOptionsData);
    setVariantValues(combinations);

    setOptions(options.slice(0, options.length-1));
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>, option: number) => {
    setVariantTypes({...variantTypes, [option]: event.target.value as string});
  };

  
  const handleOptionChange = (e, option) => {
    var instantOptionsData = {};
    if (option === 1) {
      setOptionValues({...optionValues, [1]: e});
      instantOptionsData = {
        1: e,
        2: optionValues[2],
        3: optionValues[3]
      };
    } else if (option === 2) {
      setOptionValues({...optionValues, [2]: e});
      instantOptionsData = {
        1: optionValues[1],
        2: e,
        3: optionValues[3]
      };
    } else {
      setOptionValues({...optionValues, [3]: e});
      instantOptionsData = {
        1: optionValues[1],
        2: optionValues[2],
        3: e
      };
    }
    
    var combinations = utils.generateOptionsCombinations(instantOptionsData);
    setVariantValues(combinations);
  };

  const handleCollectionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setClassification({...classification, ['collection']: event.target.value as string});
    if (event.target.value as string === "") {
      setClassificationItems({...classificationItems, ['category']: []});
    } else {
      setClassificationItems({...classificationItems, ['category']: categoriesOptions[event.target.value as string]});
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setClassification({...classification, ['category']: event.target.value as string});
    var collection = classification['collection'];

    if (event.target.value as string === "") {
      setClassificationItems({...classificationItems, ['subcategory']: []});
    } else {
      if (collection === "Masculino") {
        setClassificationItems({...classificationItems, ['subcategory']: subcategoriesOptionsMale[event.target.value as string]});
      } else if (collection === "Feminino") {
        setClassificationItems({...classificationItems, ['subcategory']: subcategoriesOptionsFemale[event.target.value as string]});
      } else {
        setClassificationItems({...classificationItems, ['subcategory']: subcategoriesOptionsGenderless[event.target.value as string]});
      }
    }
  };

  const handleSubcategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setClassification({...classification, ['subcategory']: event.target.value as string});
  };


  const handleOriginalPriceChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setOriginalPrice(event.target.value as string);
  };

  const setImageFile1 = (selectedFile) => {
    setImage1(selectedFile);
  };

  const setImageFile2 = (selectedFile) => {
    setImage2(selectedFile);
  };

  const setImageFile3 = (selectedFile) => {
    setImage3(selectedFile);
  };

  const setImageFile4 = (selectedFile) => {
    setImage4(selectedFile);
  };
  
  const handleSubmit = () => {
    utils.createProduct;
  };

  return (
    <React.Fragment>
    <CssBaseline />
    <main className={classes.layout}>
      <form onSubmit={handleSubmit}>
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
                    Imagens
                  </Typography>
                  <Box display="flex" justifyContent="center" border={1} className={classes.mediaArea} borderRadius={5}>
                    <Grid container>
                      <Grid item xs={3}>
                        <ImageUploadCard setImage={setImageFile1} />
                      </Grid>
                      <Grid item xs={3}>
                        <ImageUploadCard setImage={setImageFile2} />
                      </Grid>
                      <Grid item xs={3}>
                        <ImageUploadCard setImage={setImageFile3} />
                      </Grid>
                      <Grid item xs={3}>
                        <ImageUploadCard setImage={setImageFile4} />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Tooltip title="As classificações indicam onde os seus produtos irão aparecer no nosso shopping" 
                  aria-label="add">
                    <Typography className={classes.title} component="h5" variant="h6" align="left">
                      Classificações*
                    </Typography>
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <Select
                    id="gender"
                    name="gender"
                    value={classification['collection']}
                    onChange={handleCollectionChange}
                    inputProps={{ 'aria-label': 'Without label' }}
                    fullWidth
                    displayEmpty
                    variant="outlined"
                  >
                    <MenuItem value="">
                      <em>Gênero</em>
                    </MenuItem>
                    {classificationItems['collection'].map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <Select
                    id="category"
                    name="category"
                    value={classification['category']}
                    onChange={handleCategoryChange}
                    inputProps={{ 'aria-label': 'Without label' }}
                    fullWidth
                    displayEmpty
                    variant="outlined"
                  >
                    <MenuItem value="">
                      <em>Categoria</em>
                    </MenuItem>
                    {classificationItems['category'].map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <Select
                    id="subcategory"
                    name="subcategory"
                    value={classification['subcategory']}
                    onChange={handleSubcategoryChange}
                    inputProps={{ 'aria-label': 'Without label' }}
                    fullWidth
                    displayEmpty
                    variant="outlined"
                  >
                    <MenuItem value="">
                      <em>Sub-Categoria</em>
                    </MenuItem>
                    {classificationItems['subcategory'].map(option => (
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
                Estoque
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
                        <ChipInput
                          defaultValue={optionValues[option]}
                          onChange={(e) => handleOptionChange(e, option)}
                          onKeyPress={(ev) => {
                            console.log(`Pressed keyCode ${ev.key}`);
                            if (ev.key === 'Enter') {
                              // Do code here
                              ev.preventDefault();
                              console.log('Enter');
                            }}}
                          style={{width: '80%'}}
                        />
                        </Grid>
                      </Grid>
                      {option < 3 && (
                        <Button onClick={handleAddOption}>
                          Adicionar outra opção
                        </Button>
                      )}
                      {option > 1 && (
                        <Button onClick={() => handleRemoveOption(option)}>
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
                <Grid item xs={12} sm={6}>
                  Variante
                </Grid>
                <Grid item xs={12} sm={6}>
                  Quantidade
                </Grid>
                {variantValues.length > 0 && 
                variantValues.map((item) => (
                  <React.Fragment key={item}>
                    <Grid item xs={12} sm={6}>
                      <InputLabel>
                        {item}
                      </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={6}>
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

