import React, { useState } from 'react';
import { NextPage } from 'next';
import { makeStyles } from '@material-ui/core/styles';

import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { signIn, signOut, useSession } from 'next-auth/client';

import MediaCard from '../components/Products/AddProductCard';
import Header from "../components/Header/Header";
import ProductCard from "../components/Products/ProductCard";

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    paddingTop: '15px',
    paddingBottom: '15px', 
    paddingLeft: '15px',
    paddingRight: '15px',
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

const IndexPage: NextPage = () => {
  const [ session, loading ] = useSession();
  const classes = useStyles();
  const [ edit, setEdit ] = useState(false);


  if (session) {
    return (
      <div style={{backgroundColor: '#eeeeee'}}>
        <Header />
        <h1>Home page do usuário</h1>
          <Link href="/">
            <Button color="primary">
            Tabela de produtos
            </Button>
          </Link>
        <Grid container spacing={5} className={classes.root}>
          <Grid item xs={12} sm={6}>
            <ProductCard />
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