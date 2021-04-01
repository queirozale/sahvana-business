import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Header from '../components/modules/LandingPage/Header';
import SignUp from '../components/modules/LandingPage/SignUp';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      margin: 'auto',
      overflow: 'hidden',
      height: '722px',
      backgroundImage: `url(${"savana.jpg"})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      opacity: 0.75,
      backgroundColor: '#D8D8D8',
    },
    root: {
      display: 'flex'
    },
    title: {
      fontFamily: 'GalanoGrotesqueDEMO-Bold',
      marginLeft: theme.spacing(30),
      marginTop: theme.spacing(10),
      color: '#000000'
    },
    description: {
      fontFamily: 'Poppins',
      marginLeft: theme.spacing(30),
      marginTop: theme.spacing(10),
      color: '#000000'
    },
    form: {
      marginTop: theme.spacing(10),
    }
  }),
);

const Home = () => {
  const classes = useStyles();

  return (
    <div>
    <Paper className={classes.paper}>
      <Header />
      <Grid container spacing={5} className={classes.root}>
        <Grid item xs={12} sm={6}>
        <Typography variant="h2" component="h3" className={classes.title}>
          Venda mais com sua loja na Sahvana
        </Typography>
        <Typography variant="h6" className={classes.description} gutterBottom>
          Profissionalizamos suas vendas de vestuário online e te apresentamos para novos clientes.
        </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className={classes.form}>
            <SignUp />  
          </div>
        </Grid>
      </Grid>
    </Paper>
    </div>
  );
};

export default Home;