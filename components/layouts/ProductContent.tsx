import React, { useState } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import SearchBar from "material-ui-search-bar";
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { DataGrid, GridToolbarContainer  } from '@material-ui/data-grid';


import ProductInfo from '../modules/Products/ProductInfo';
import AddProductForm from '../modules/Products/AddProductForm';

import useSWR from 'swr';

const useStyles = makeStyles(() => ({
  main: {
    backgroundColor: '#eeeeee',
    minHeight: '100vh',
  },
  title: {
    paddingTop: '20px',
    paddingBottom: '10px', 
    paddingLeft: '15px',
    paddingRight: '15px',
  },
  subTitle: {
    paddingBottom: '15px', 
    paddingLeft: '15px',
    paddingRight: '15px',
  },
  root: {
    display: 'flex',
    paddingTop: '15px',
    paddingBottom: '15px', 
    paddingLeft: '15px',
    paddingRight: '15px',
  },
  table: {
    minWidth: 500,
    backgroundColor: 'white'
  },
  titleIcon: {
    width: 30,
    height: 30,
    marginRight: '10px'
  },
  paginationLinks: {
    marginTop: '10px',
    marginLeft: '10px'
  },
  searchBar: {
    width: '300px',
    height: '40px'
  },
  loading : {
    position: 'fixed',
    top: '50%',
    left: '50%',
    marginTop: '-50px',
    marginLeft: '-100px'
  },
  actions: {
    backgroundColor: '#ef5350',
    opacity: 0.8,
    height: '45px'
  },
  selectMessage: {
    alignItems: 'center'
  },
  appBar: {
    position: 'relative',
    backgroundColor: '#F28729',
  },
  titleDialog: {
    marginLeft: '10px',
    flex: 1,
  }
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const fetcher = (...args: [input: RequestInfo, init?: RequestInit | undefined]) => fetch(...args).then(res => res.json());

const Products: NextPage = () => {
  const classes = useStyles();
  const [ edit, setEdit ] = useState(false);
  const { data, error } = useSWR('/api/findProduct', fetcher);
  const [deletedRows, setDeletedRows] = useState(Array());
  const [search, setSearch] = useState("");
  
  const [open, setOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [infoData, setInfoData] = useState(null);
  
  function CustomToolbar() {
    return (
      <GridToolbarContainer className={classes.actions}>
        <Tooltip title="Delete">
          <IconButton aria-label="Delete" onClick={deleteProduct}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Cancel">
          <Button onClick={handleCloseEdit}>Cancelar</Button>
        </Tooltip>
      </GridToolbarContainer>
    );
  };
  
  const handleRowSelection = (e: MessageEvent) => {
    const data = e.data as {
      color: string;
      description: string;
      gender: string;
      id: string;
      inventory: string;
      original_price: string;
      promotional_price: string;
      size: string;
      tags: string;
      _id: string
    };
    if (edit) {
      if (!deletedRows.includes(data.id)) {
        setDeletedRows(deletedRows => [...deletedRows, e.data.id]);
      } else {
        setDeletedRows(deletedRows.filter(item => item !== e.data.id));
      }
    } else {
      setInfoData(e.data)
      setShowInfo(!showInfo);
    }
  };

  const handleClickEdit= (_event: any) => {
    setEdit(true);
  };

  const handleCloseEdit= (_event: any) => {
    setEdit(false);
  };

  const deleteProduct = async event => {
    event.preventDefault();

    const res = await fetch('/api/deleteProduct', {

      body: JSON.stringify({
        ids: deletedRows,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    const result = await res.json();
    Router.reload();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseInfo = () => {
    setShowInfo(false);
  }

  const columns = [
    { field: '_id', headerName: 'ID', width: 70, hide: true },
    { field: 'title', headerName: 'Título', width: 150 },
    { field: 'gender', headerName: 'Gênero', width: 150 },
    { field: 'category', headerName: 'Categoria', width: 150 },
    { field: 'subcategory', headerName: 'Sub-Categoria', width: 150 },
    { field: 'total_inventory', headerName: 'Estoque Total', width: 150, type: 'number' },
    { field: 'original_price', headerName: 'Preço Original', width: 150, type: 'number' },
    { field: 'promotional_price', headerName: 'Preço Promocional', width: 200, type: 'number' },
  ];

  return (
    <div className={classes.main}>
      {data ?
      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={12}>
          <Box display="flex" flexDirection="row-reverse">
            <Box>
              <SearchBar 
              className={classes.searchBar} 
              value={search}
              onChange={(newValue: string) => setSearch(newValue)}
              onRequestSearch={() => console.log(search)}
              />
            </Box>
            <Box mr={5}>
              <Button color="primary" variant="outlined" onClick={handleClickOpen}>
                Adcionar produto
              </Button>
            </Box>
            <Box mr={2}>
              <Button color="primary" variant="outlined" onClick={handleClickEdit}>
                Deletar produtos
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} style={{ height: 400, width: '100%' }}>
          <DataGrid 
            className={classes.table}
            rows={data} 
            columns={columns} 
            pageSize={5} 
            getRowId={(data) => data._id} 
            checkboxSelection={edit}
            onRowSelected={e => handleRowSelection(e)}
            filterModel={{
              items: [
                { columnField: 'title', operatorValue: 'contains', value: search },
              ],
            }}
            components={
              edit ? {Toolbar: CustomToolbar}
              :
              undefined
            }
            />
        </Grid>
      </Grid>
      :
      <div className={classes.loading}>
        <CircularProgress />
      </div>
      }

      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <div className={classes.main}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.titleDialog}>
                Adicionar produtos
              </Typography>
            </Toolbar>
          </AppBar>
          <AddProductForm />
        </div>
      </Dialog>

      <Dialog fullScreen open={showInfo} onClose={handleCloseInfo} TransitionComponent={Transition}>
        <div>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleCloseInfo} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.titleDialog}>
                Informações dos produtos
              </Typography>
            </Toolbar>
          </AppBar>
          <ProductInfo data={infoData} />
        </div>
      </Dialog>

    </div>
  );
};

export default Products;