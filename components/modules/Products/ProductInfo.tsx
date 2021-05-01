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
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer, { DrawerProps } from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import CardActionArea from "@material-ui/core/CardActionArea";
import Box from '@material-ui/core/Box';

import Router from 'next/router';

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
  media: {
    maxWidth: 250
  },
  mediaArea: {
    padding: theme.spacing(2),
  }
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
  
  const [variant, setVariant] = useState(data.has_variant);
  const [options, setOptions] = useState([1]);
  const [variantTypes, setVariantTypes] = useState({1: '', 2: '', 3: ''})
  const [options1, setOptions1] = useState(data.inputOption1);
  const [options2, setOptions2] = useState(data.inputOption2);
  const [options3, setOptions3] = useState(data.inputOption3);
  const [collection, setCollection] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [categoriesItems, setCategoriesItems] = useState([]);
  const [subcategoriesItems, setSubcategoriesItems] = useState([]);
  const [originalPrice, setOriginalPrice] = useState(data.original_price);
  const categoriesOptions = tagOptions.categoriesOptions;
  const subcategoriesOptionsMale = tagOptions.subcategoriesOptionsMale;
  const subcategoriesOptionsFemale = tagOptions.subcategoriesOptionsFemale;
  const subcategoriesOptionsUnissex = tagOptions.subcategoriesOptionsUnissex;

  const variantValues = {
    1: {
      variantType: data.variantType1,
      inputOption: data.inputOption1
    },
    2: {
      variantType: data.variantType2,
      inputOption: data.inputOption2
    },
    3: {
      variantType: data.variantType3,
      inputOption: data.inputOption3
    },
  }

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

  const optionValues = generateOptionsCombinations();

  // const handleOptionChange = (e, option) => {
  //   if (option === 1) {
  //     setOptions1(e.target.value.split(','));
  //   } else if (option === 2) {
  //     setOptions2(e.target.value.split(','));
  //   } else {
  //     setOptions3(e.target.value.split(','));
  //   }

  //   setOptionValues(generateOptionsCombinations());
  // };

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


  return (
    <React.Fragment>
    <CssBaseline />
    <main className={classes.layout}>
      <form>
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
                    label="Título"
                    defaultValue={data.title}
                    disabled
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="left" border={1} className={classes.mediaArea} borderRadius={5}>
                    <div dangerouslySetInnerHTML={{__html: data.description}}></div>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                <Typography className={classes.title} component="h5" variant="h6" align="left">
                  Media
                </Typography>
                <Box display="flex" justifyContent="center" border={1} className={classes.mediaArea} borderRadius={5}>
                  {data.imageFiles.map(imageFile => (
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
                  ))}
                </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.title} component="h5" variant="h6" align="left">
                    Tags
                  </Typography>
                  <TextField
                      id={"tags"}
                      name={"tags"}
                      variant="outlined"
                      fullWidth
                      label="Tags"
                      autoFocus
                      required
                      defaultValue={data.tags}
                      disabled
                      autoComplete='off'
                    />
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
                    defaultValue={data.total_inventory}
                    required
                    disabled
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
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="promotional_price"
                    name="promotional_price"
                    variant="outlined"
                    fullWidth
                    label="Preço Promocional"
                    defaultValue={data.promotional_price}
                    required
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={variant} 
                        color="primary" 
                        id="has_variant" 
                        name="has_variant" 
                        value={variant}
                        disabled
                      />
                    }
                    label="Este produto tem várias opções, como tamanhos ou cores diferentes"
                    onChange={handleCheckBox}
                  />
                </Grid>
                {data.inputOption1 && 
                Object.keys(variantValues).map((key, option) => (
                  <React.Fragment key={key}>
                    <Grid item xs={12}>
                      <Divider light={true} />
                      <Typography className={classes.optionDescription} component="h6" align="left">
                        Opção {key}
                      </Typography>
                      <Grid container spacing={4}>
                        <Grid item xs={12} sm={4}>
                          <Select
                            id={"variantType" + key}
                            name={"variantType" + key}
                            value={variantValues[key].variantType}
                            onChange={e => handleChange(e, option+1)}
                            inputProps={{ 'aria-label': 'Without label' }}
                            fullWidth
                            displayEmpty
                            variant="outlined"
                            disabled
                            
                          >
                            <MenuItem value="">
                              <em>{variantValues[key].variantType}</em>
                            </MenuItem>
                            <MenuItem key={1} value={'Tamanho'}>Tamanho</MenuItem>
                            <MenuItem key={2} value={'Cor'}>Cor</MenuItem>
                            <MenuItem key={3} value={'Estilo'}>Estilo</MenuItem>
                          </Select>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                        <TextField
                          id={"inputOption" + option}
                          name={"inputOption" + option}
                          variant="outlined"
                          fullWidth
                          label="Separe as opções com vírgula"
                          autoFocus
                          required
                          value={variantValues[key].inputOption}
                          disabled
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
                        defaultValue={data.variantPrices[item]}
                        required
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id={"inventory_" + item}
                        name={"inventory_" + item}
                        variant="outlined"
                        fullWidth
                        label="Quantidade"
                        defaultValue={data.variantInventories[item]}
                        required
                        disabled
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

export default withStyles(styles)(ProductInfo);

