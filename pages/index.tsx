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

import { signIn, signOut, useSession } from 'next-auth/client';

import MediaCard from '../components/Products/AddProductCard';
import Header from "../components/Header/Header";
import ProductTable from "../components/Products/ProductTable";
import RecipeReviewCard from "../components/Products/ProductCard";
import ProductCard from "../components/Products/ProductCard";
import ProductInfo from "../components/Products/ProductInfo";

import { DataGrid } from '@material-ui/data-grid';
import useSWR from 'swr';

const useStyles = makeStyles(() => ({
  main: {
    backgroundColor: '#eeeeee',
    height:'720px'
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
  smallAddIcon: {
    width: 18,
    height: 18,
    color: '#36bf58'
  },
  smallRemoveIcon: {
    width: 18,
    height: 18,
    color: '#f74545'
  },
  mediumDeleteIcon: {
    width: 20,
    height: 20,
    color: '#f74545'
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
  }
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

// {isDisplayed ? <HelloReact hello={hello} /> : null}

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


  const columns = [
    { field: '_id', headerName: 'ID', width: 70, hide: true },
    { field: 'description', headerName: 'Descrição', width: 250 },
    { field: 'inventory', headerName: 'Estoque', width: 110, type: 'number' },
    { field: 'original_price', headerName: 'Preço Original', width: 150, type: 'number' },
    { field: 'promotional_price', headerName: 'Preço Promocional', width: 180, type: 'number' },
  ];


  if (session) {
    return (
      <div className={classes.main}>
        <Header />
        <h1>Home page do usuário</h1>
        {data ?
        <div>
          <Grid container spacing={5} className={classes.root}>
            <Grid item xs={12} sm={6}>
                <div style={{ height: 400, width: '100%' }}>
                  <Box display="flex" flexDirection="row-reverse" mb={1}>
                    {/* <Box>
                      <Link href="/adicionar_produto">
                        <Button color="primary">
                          Adcionar produto
                        </Button>
                      </Link>
                    </Box>
                    <Box>
                      <Button color="primary" onClick={handleClickEdit}>
                        Deletar produtos
                      </Button>
                      {edit && (
                        <div>
                          <Box component="div" display="inline" p={1} m={1} bgcolor="background.paper">
                            <Button color="primary" onClick={handleCloseEdit}>
                                Deletar
                            </Button>
                          </Box>
                          <Box component="div" display="inline" p={1} m={1} bgcolor="background.paper">
                          <Button color="primary" onClick={handleCloseEdit}>
                            Cancelar
                          </Button>
                          </Box>
                        </div>
                      )}
                    </Box> */}
                    <Box>
                      <SearchBar 
                      className={classes.searchBar} 
                      value={search}
                      onChange={(newValue) => setSearch(newValue)}
                      onRequestSearch={() => console.log(search)}
                      />
                    </Box>
                  </Box>
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
              {/* <ProductInfo data={showInfo} /> */}
              {showInfo ? <ProductInfo data={showInfo} /> : <p>Selecione um produto</p>}
              {/* <Box display="flex" justifyContent="center">
                {showInfo ? <ProductCard data={showInfo} /> : null}
              </Box> */}
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