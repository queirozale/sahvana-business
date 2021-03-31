import React, { useState } from 'react';
import { NextPage } from 'next';
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
import { TransitionProps } from '@material-ui/core/transitions';

import MediaCard from '../modules/Products/AddProduct';
import ProductInfo from '../modules/Products/ProductInfo';

import { signIn, signOut, useSession } from 'next-auth/client';

import useSWR from 'swr';

const useStyles = makeStyles(() => ({
  main: {
    backgroundColor: '#eeeeee',
    height:'720px'
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
  },
  titleDialog: {
    marginLeft: '10px',
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const fetcher = (...args: [input: RequestInfo, init?: RequestInit | undefined]) => fetch(...args).then(res => res.json());

const Products: NextPage = () => {
  const [ session, loading ] = useSession();
  const classes = useStyles();
  const [ edit, setEdit ] = useState(false);
  const { data, error } = useSWR('/api/findProduct', fetcher);
  const [deletedRows, setDeletedRows] = useState(Array());
  const [showInfo, setShowInfo] = useState({
    description: "",
    gender: "",
    size: "",
    color: "",
    inventory: 0,
    original_price: 0,
    promotional_price: 0
  });
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);


  function CustomToolbar() {
    return (
      <GridToolbarContainer className={classes.actions}>
        <Tooltip title="Delete">
          <IconButton aria-label="Delete" onClick={handleCloseEdit}>
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
      setShowInfo(e.data)
    }

    console.log(e.data);
    console.log(typeof(e));
    console.log(typeof(e.data));
    console.log(e);
  };

  const handleClickEdit= (_event: any) => {
    setEdit(true);
  };

  const handleCloseEdit= (_event: any) => {
    setEdit(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 70, hide: true },
    { field: 'description', headerName: 'Descrição', width: 150 },
    { field: 'inventory', headerName: 'Estoque', width: 110, type: 'number' },
    { field: 'original_price', headerName: 'Preço Original', width: 150, type: 'number' },
    { field: 'promotional_price', headerName: 'Preço Promocional', width: 180, type: 'number' },
  ];

  if (session) {
    return (
      <div className={classes.main}>
        {data ?
        <div>
          <Grid container spacing={5} className={classes.root}>
            <Grid item xs={12} sm={6}>
                <div style={{ height: 400, width: '100%' }}>
                  <Box display="flex" flexDirection="row-reverse" mb={1}>
                    <Box>
                      <SearchBar 
                      className={classes.searchBar} 
                      value={search}
                      onChange={(newValue: string) => setSearch(newValue)}
                      onRequestSearch={() => console.log(search)}
                      />
                    </Box>
                    <Box mr={5}>
                      <Button color="primary" onClick={handleClickOpen}>
                        Adcionar produto
                      </Button>
                    </Box>
                    <Box mr={5}>
                      <Button color="primary" onClick={handleClickEdit}>
                        Deletar produtos
                      </Button>
                    </Box>
                  </Box>
                  <DataGrid 
                  className={classes.table}
                  rows={data} 
                  columns={columns} 
                  pageSize={5} 
                  getRowId={(data) => data._id} 
                  checkboxSelection={edit}
                  // onRowSelected={e => handleRowSelection(e)}
                  filterModel={{
                    items: [
                      { columnField: 'description', operatorValue: 'contains', value: search },
                    ],
                  }}
                  components={
                    edit ? {Toolbar: CustomToolbar}
                    :
                    undefined
                  }
                  />
                </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              {showInfo.description.length > 0 ? 
                <ProductInfo data={showInfo} /> 
              :
              <p>Selecione um produto</p>}
            </Grid>
          </Grid>
        </div>
        :
        <div className={classes.loading}>
          <CircularProgress />
        </div>
        }
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.titleDialog}>
              Adicionar produtos
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Salvar
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container spacing={5} className={classes.root}>
          <Grid item xs={12} sm={6}>
            <p>Imagem</p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" justifyContent="center">
              <MediaCard />
            </Box>
          </Grid>
        </Grid>
      </Dialog>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Home page genérica</h1>
      </div>
    );
  }
};

export default Products;