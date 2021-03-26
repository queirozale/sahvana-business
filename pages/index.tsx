import React, { useState } from 'react';
import { NextPage } from 'next';
import { makeStyles } from '@material-ui/core/styles';

import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import SearchBar from "material-ui-search-bar";
import CircularProgress from '@material-ui/core/CircularProgress';
import StorefrontIcon from '@material-ui/icons/Storefront';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import ProductInfo from "../components/Products/ProductInfo";
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { DataGrid, GridToolbarContainer, GridDensitySelector } from '@material-ui/data-grid';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import { signIn, signOut, useSession } from 'next-auth/client';

import Header from "../components/Header/Header";
import MediaCard from '../components/Products/AddProductCard';

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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://sahvana.com/">
        Sahvana
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const fetcher = (...args) => fetch(...args).then(res => res.json());

const IndexPage: NextPage = () => {
  const [ session, loading ] = useSession();
  const classes = useStyles();
  const [ edit, setEdit ] = useState(false);
  const { data, error } = useSWR('/api/findProduct', fetcher);
  const [rows, setRows] = useState(data);
  const [deletedRows, setDeletedRows] = useState([]);
  const [showInfo, setShowInfo] = useState();
  const [search, setSearch] = useState();

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
  const handleRowSelection = (e) => {
    if (edit) {
      if (!deletedRows.includes(e.data.id)) {
        setDeletedRows(deletedRows => [...deletedRows, e.data.id]);
      } else {
        setDeletedRows(deletedRows.filter(item => item !== e.data.id));
      }
    } else {
      setShowInfo(e.data)
    }
 };

 const handlePurge = () => {
  console.log(deletedRows);
 }

 const handleDelete = async () => {
  const res = await fetch('/api/deleteProduct', {
    body: JSON.stringify({
      _id: deletedRows[0]
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  });
 };


  const handleClickEdit= (event) => {
    setEdit(true);
  };

  const handleCloseEdit= (event) => {
    setEdit(false);
  };

  // const handleSearch = () => {
    
  // } 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 70, hide: true },
    { field: 'description', headerName: 'Descrição', width: 220 },
    { field: 'inventory', headerName: 'Estoque', width: 110, type: 'number' },
    { field: 'original_price', headerName: 'Preço Original', width: 150, type: 'number' },
    { field: 'promotional_price', headerName: 'Preço Promocional', width: 180, type: 'number' },
  ];


  if (session) {
    return (
      <div className={classes.main}>
        <Header />
        <Typography variant="h4" component="h4" className={classes.title}>
          <StorefrontIcon className={classes.titleIcon} />
          Gerenciamento de produtos
        </Typography>
        <Typography variant="h6" color="textSecondary" className={classes.subTitle}>
          Potencialize suas vendas com uma boa gestão da informação dos produtos
        </Typography>
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
                      onChange={(newValue) => setSearch(newValue)}
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
                  {/* <div className={classes.actions}>
                    <Tooltip title="Delete">
                      <IconButton aria-label="Delete">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </div> */}
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
                      { columnField: 'description', operatorValue: 'contains', value: search },
                    ],
                  }}
                  components={
                    edit ? 
                    {Toolbar: CustomToolbar}
                    : false
                  }
                  />
                    {/* <Button variant="contained" color="primary" onClick={handlePurge}>
                      Purge
                    </Button>
                    <Button variant="contained" color="primary">
                      Delete
                    </Button> */}
                </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              {showInfo ? 
              <ProductInfo data={showInfo} /> 
              :
              <p>Selecione um produto</p>}
            </Grid>
            <Grid item xs={12}>
              <Box mt={5}>
              <Copyright />
              </Box>
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
          <Grid item xs={12}>
            <Box mt={5}>
            <Copyright />
            </Box>
          </Grid>
        </Grid>
      </Dialog>
      </div>
    );
  } else {
    return (
      <div>
        <Header />
        <h1>Home page genérica</h1>
      </div>
    );
  }
};

export default IndexPage;