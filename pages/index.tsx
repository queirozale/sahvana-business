import { NextPage } from 'next';
import { makeStyles } from '@material-ui/core/styles';

import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import { signIn, signOut, useSession } from 'next-auth/client';

import MediaCard from '../components/Products/AddProductCard';
import Header from "../components/Header/Header";
import ProductTable from "../components/Products/ProductTable";

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    paddingTop: '15px',
    paddingBottom: '15px', 
    paddingLeft: '15px',
    paddingRight: '15px',
  }
}));


const IndexPage: NextPage = () => {
  const [ session, loading ] = useSession();
  const classes = useStyles();

  if (session) {
    return (
      <div>
        <Header />
        <h1>Home page do usuário</h1>
        <Link href="/adicionar_produto">
          <Button color="primary">
            Adcionar produto
          </Button>
        </Link>
        <Grid container spacing={5} className={classes.root}>
          <Grid item xs={12} sm={6}>
            <ProductTable />
          </Grid>
          <Grid item xs={12} sm={6} style={{'backgroundColor': 'blue'}}>
            <Box display="flex" justifyContent="center">
              <MediaCard />
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