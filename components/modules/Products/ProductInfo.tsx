import React, { useState } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { useSession } from 'next-auth/client';
import useSWR from 'swr';

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
import CardActionArea from "@material-ui/core/CardActionArea";
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import ChipInput from 'material-ui-chip-input';
import MuiAlert from '@material-ui/lab/Alert';

import ImageUploadCard from '../ImageUpload';
import tagOptions from './TagOptions';
import utils from './Utils';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

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
  },
  btn: {
    backgroundColor: "rgb(242, 121, 15, 0.7)",
    color: "white"
  },
  media: {
    maxWidth: 250
  },
});

export interface ProductInfoProps extends Omit<DrawerProps, 'classes'>, WithStyles<typeof styles> {
  data: {
    title: string;
    description: string;
    total_inventory: number;
    original_price: string;
    promotional_price: string;
    gender: string;
    category: string;
    subcategory: string;
    tags: string;
    has_variant: boolean;
    variantType1: string;
    inputOption1: Array<string>;
    variantType2: string;
    inputOption2: Array<string>;
    variantType3: string;
    inputOption3: Array<string>;
    variantPrices: object;
    variantInventories: object;
    imageFiles: Array<string>;
    id: string;
    id_: string;
  }
}

const ProductInfo: NextPage = (props: ProductInfoProps) => {
  const { classes, ...other } = props;
  const data = props.data;
  const [userData, setUserData] = useState(null);
  const [ session, loading ] = useSession();
  const [serverState, setServerState] = useState({
    submitting: false,
    succeeded: null
  });
  const [open, setOpen] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [disabled, setDisabled] = useState(data? true : false)
  const [title, setTitle] = useState(data? data.title : ""); // Product title
  const [description, setDescription] = useState(data? data.description : ""); // Product description
  const [totalInventory, setTotalInventory] = useState(data? data.total_inventory : 0);
  const [originalPrice, setOriginalPrice] = useState(data? data.original_price : "");
  const [promotionalPrice, setPromotionalPrice] = useState(data? data.promotional_price : "");
  const [variant, setVariant] = useState(data? data.has_variant: false); // Has variant or not

  const fetcher = async () => {
    const res = await fetch('/api/findUser', {
        body: JSON.stringify({
            email: session.user.email,
          }),
          headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST'
          });

    return await res.json();
  };

  if (!userData) {
    const userPromise = fetcher();
    userPromise.then(response => {
      setUserData(response);
    });
  };

  const computeOptions = (data) => {
    var c = [];
    if (data.variantType1) {
      c.push(1);
    }
    if (data.variantType2) {
      c.push(2);
    }
    if (data.variantType3) {
      c.push(3);
    }
    
    return c;
  };

  const [options, setOptions] = useState(data? computeOptions(data) : [1]); // Number of options (variants)
  const [variantTypes, setVariantTypes] = useState({
    1: data? data.variantType1 : "Selecione", 
    2: data? data.variantType2 : "Selecione", 
    3: data? data.variantType3 : "Selecione", 
  }); // Variant types
  const [variantTypesOptions, setVariantTypesOptions] = useState(["Tamanho", "Cor", "Estilo"]); // Variant types 
  const [variantValues, setVariantValues] = useState(data? Object.keys(data.variantInventories) : []); // Variant values
  const [variantInventories, setVariantInventories] = useState(data? data.variantInventories : {}); // Variant inventories
  const [variantPrices, setVariantPrices] = useState(data? data.variantPrices : {}); // Variant prices
  const [optionValues, setOptionValues] = useState({
    1: data? data.inputOption1 : [],
    2: data? data.inputOption2 : [], 
    3: data? data.inputOption3 : []
  }); // Options (variant values)
  const [classification, setClassification] = useState({
    'collection': data? data.gender : "Gênero",
    'category': data? data.category : "Categoria",
    'subcategory': data? data.subcategory : "Subcategoria",
  }); // Classification names
  const [classificationItems, setClassificationItems] = useState({
    'collection': ['Masculino', 'Feminino', 'Genderless'],
    'category': [],
    'subcategory': []
  }); // Classification values

  // tag options
  const categoriesOptions = tagOptions.categoriesOptions;
  const subcategoriesOptionsMale = tagOptions.subcategoriesOptionsMale;
  const subcategoriesOptionsFemale =  tagOptions.subcategoriesOptionsFemale;
  const subcategoriesOptionsGenderless = tagOptions.subcategoriesOptionsGenderless;

  const [image1, setImage1] = useState(
    data?
      data.imageFiles.length > 0?
      data.imageFiles[0]
      :
      null
    :
    null
  );
  const [image2, setImage2] = useState(
    data?
    data.imageFiles.length > 1?
    data.imageFiles[1]
    :
    null
  :
  null
  );
  const [image3, setImage3] = useState(
    data?
    data.imageFiles.length > 2?
    data.imageFiles[2]
    :
    null
  :
  null
  );
  const [image4, setImage4] = useState(
    data?
    data.imageFiles.length > 3?
    data.imageFiles[3]
    :
    null
  :
  null
  );

  const handleClose = () => {
    setOpen(false);
  };

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

  const handleTitleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTitle(event.target.value as string);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDescription(event.target.value as string);
  };
  
  const handleTotalInventoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTotalInventory(event.target.value as number);
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

  const handlePromotionalPrice = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPromotionalPrice(event.target.value as string);
  };

  const handleVariantInventoriesChange = (event: React.ChangeEvent<{ value: unknown }>, item: string) => {
    setVariantInventories({...variantInventories, [item]: Number(event.target.value as number)});
  }

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
  
  const handleEdit = () => {
    setEditMode(!editMode);
    setDisabled(!disabled);
  };

  const getVariantPrices = () => {
    var x = {};

    for (var i=0; i < variantValues.length; i++) {
      x[variantValues[i]] = originalPrice;
    };

    setVariantPrices(x);
  }

  const getProductData = (isNew: boolean) => {
    getVariantPrices();

    var productData = {
      title: title,
      description: description,
      vendor: userData.store,
      total_inventory: Number(totalInventory),
      original_price: originalPrice, 
      promotional_price: promotionalPrice,
      gender: classification['collection'],
      category: classification['category'],
      subcategory: classification['subcategory'],
      has_variant: variant,
      weight: userData.weight,
      variantType1: variantTypes[1],
      inputOption1: optionValues[1],
      variantType2: variantTypes[2],
      inputOption2: optionValues[2],
      variantType3: variantTypes[3],
      inputOption3: optionValues[3],
      variantPrices: variantPrices,
      variantInventories: variantInventories,
      imageFiles: [
        image1,
        image2,
        image3,
        image4
      
      ],
      created_at: new Date(),
      updated_at: new Date(),
      email: session.user.email
    };

    if (!isNew) {
      productData['_id'] = data.id;
    };

    return productData;
  };
  
  const createProduct = async event => {
    event.preventDefault();
    setServerState({...serverState, ['submitting']: true});

    const productData = getProductData(true);

    const res = await fetch('https://sahvana-admin.herokuapp.com/api/create_product', {

      body: JSON.stringify(productData),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });
  
    const result = await res.text();
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
    Router.reload();
  };

  const updateProduct = async event => {
    event.preventDefault();
    setServerState({...serverState, ['submitting']: true});

    const productData = getProductData(false);

    const res = await fetch('https://sahvana-admin.herokuapp.com/api/update_product', {

      body: JSON.stringify(productData),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });
  
    const result = await res.text();
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
    Router.reload();
  };


  const handleTest = () => {
    const productData = getProductData(false);
    console.log(productData)
  }

  return (
    <React.Fragment>
    <CssBaseline />
    <main className={classes.layout}>
      <form onSubmit={data? updateProduct : createProduct}>
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
              {data && (
                <Grid item xs={12} sm={12} style={{textAlign: 'right'}}>
                  <Button onClick={handleEdit} className={classes.btn}>
                    {editMode? "Voltar" : "Editar"}
                  </Button>
                </Grid>
              )}
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
                    defaultValue={title}
                    onChange={handleTitleChange}
                    required
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={12}>
                {disabled && (
                  <Box display="flex" justifyContent="left" border={1} className={classes.mediaArea} borderRadius={5}>
                    <div dangerouslySetInnerHTML={{__html: data.description}}></div>
                  </Box>
                )}
                {!disabled && (
                  <TextField
                    id="description"
                    name="description"
                    label="Descrição"
                    placeholder=" Uma boa descrição do produto é essencial na hora de vender.
                    Capriche na descrição e forneça o máximo de informações possíveis sobre o produto, como o material, composição, modo de lavagem, etc."
                    multiline
                    rows={6}
                    variant="outlined"
                    fullWidth
                    autoFocus
                    defaultValue={description}
                    onChange={handleDescriptionChange}
                    required
                    disabled={disabled}
                  />
                )}
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.title} component="h5" variant="h6" align="left">
                    Imagens
                  </Typography>
                  <Box display="flex" justifyContent="center" border={1} className={classes.mediaArea} borderRadius={5}>
                    {!data || editMode ?
                    (
                      <Grid container>
                        <Grid item xs={3}>
                          <ImageUploadCard setImage={setImageFile1} selectedFile={image1} />
                        </Grid>
                        <Grid item xs={3}>
                          <ImageUploadCard setImage={setImageFile2} selectedFile={image2} />
                        </Grid>
                        <Grid item xs={3}>
                          <ImageUploadCard setImage={setImageFile3} selectedFile={image3} />
                        </Grid>
                        <Grid item xs={3}>
                          <ImageUploadCard setImage={setImageFile4} selectedFile={image4} />
                        </Grid>
                      </Grid>
                    )
                    :
                    data.imageFiles.map(imageFile => (
                      <Grid item xs={3}>
                        <CardActionArea >
                          <div className={classes.media}>
                            <img
                              width="100%"
                              src={imageFile}
                            />
                          </div>
                        </CardActionArea>
                      </Grid>
                    ))
                    }
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
                    required
                    disabled={disabled}
                  >
                    <MenuItem key={classification['collection'] + '_default'} value={classification['collection']}>
                      {classification['collection']}
                    </MenuItem>
                    {classificationItems['collection'].map(option => (
                        <MenuItem key={option + '_collection'} value={option}>{option}</MenuItem>
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
                    required
                    disabled={disabled}
                  >
                    <MenuItem key={classification['category'] + '_default'} value={classification['category']}>
                      {classification['category']}
                    </MenuItem>
                    {classificationItems['category'].map(option => (
                        <MenuItem key={option + '_category'} value={option}>{option}</MenuItem>
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
                    required
                    disabled={disabled}
                  >
                    <MenuItem key={classification['subcategory'] + '_default'} value={classification['subcategory']}>
                      {classification['subcategory']}
                    </MenuItem>
                    {classificationItems['subcategory'].map(option => (
                      <MenuItem key={option + '_subcategory'} value={option}>{option}</MenuItem>
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
                {!variant && (
                  <TextField
                    id="total_inventory"
                    name="total_inventory"
                    variant="outlined"
                    fullWidth
                    label="Quantidade Total"
                    defaultValue={totalInventory}
                    onChange={handleTotalInventoryChange}
                    required
                    disabled={disabled}
                  />
                )}
                {variant && (
                  <TextField
                    id="total_inventory"
                    name="total_inventory"
                    variant="outlined"
                    fullWidth
                    label="Quantidade Total"
                    value={
                      Object.keys(variantInventories).length > 0 ?
                      Object.values(variantInventories).reduce((a, b) => a + b) :
                      0
                    }
                    required
                    disabled={true}
                />
                )}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="original_price"
                    name="original_price"
                    variant="outlined"
                    fullWidth
                    label="Preço Original"
                    defaultValue={originalPrice}
                    onChange={handleOriginalPriceChange}
                    disabled={disabled}
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
                    defaultValue={promotionalPrice}
                    onChange={handlePromotionalPrice}
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary" 
                        id="has_variant" 
                        name="has_variant"
                        checked={Boolean(variant)}
                        value={variant}
                        disabled={disabled}
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
                            defaultValue={variantTypes[option]}
                            onChange={e => handleChange(e, option)}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            fullWidth
                            variant="outlined"
                            required
                            disabled={disabled}
                          >
                            <MenuItem key={variantTypes[option]  + '_default'} value={variantTypes[option]}>
                              {variantTypes[option]}
                            </MenuItem>
                            {variantTypesOptions.map(variant => (
                              <MenuItem key={variant + '_variantType'} value={variant}>{variant}</MenuItem>
                            ))}
                          </Select>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                        <ChipInput
                          defaultValue={optionValues[option]}
                          onChange={(e) => handleOptionChange(e, option)}
                          style={{width: '80%'}}
                          label={"Valor da opção " + String(option)}
                          variant="outlined"
                          disabled={disabled}
                        />
                        </Grid>
                      </Grid>
                      {!disabled &&
                        option < 3 && (
                          <Button onClick={handleAddOption}>
                            Adicionar outra opção
                          </Button>
                        )
                      }
                      {!disabled && 
                        option > 1 && (
                          <Button onClick={() => handleRemoveOption(option)}>
                            Remover
                          </Button>
                        )
                      }
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
                        defaultValue={variantInventories[item]}
                        onChange={(e) => handleVariantInventoriesChange(e, item)}
                        required
                        disabled={disabled}
                      />
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </Paper>
            {serverState.submitting && (
            <LinearProgress />
            )}
            {serverState.succeeded && (
              <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                  {editMode? "Produto atualizado!" : "Produto cadastrado!"}
                </Alert>
              </Snackbar>
            )}
          </Grid>
          )}
          {!disabled && (
            <Grid item xs={12} sm={12} style={{textAlign: "center"}}>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submitBtn}
              >
                {editMode? "Editar" : "Cadastrar"}
              </Button>
            </Grid>
          )}
        </Grid>
      </form>
    </main>
  </React.Fragment>
  );
};

export default withStyles(styles)(ProductInfo);

