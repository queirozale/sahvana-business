import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Header from '../modules/LandingPage/Header';
import SignUp from '../modules/LandingPage/SignUp';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      margin: 'auto',
      overflow: 'hidden',
      minHeight: '100vh',
      backgroundColor: 'rgb(64, 64, 64, 0.3)',
      backgroundImage: `url(${"savana3.png"})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
    root: {
      display: 'flex',
    },
    title: {
      fontFamily: 'Karla',
      color: '#004d40',
      paddingLeft: theme.spacing(20),
      paddingBottom: theme.spacing(5),
      [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(0),
      },
    },
    description: {
      fontFamily: 'Poppins',
      color: '#00251a',
      paddingLeft: theme.spacing(20),
      [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(0),
      },
    },
    form: {
      marginBottom: theme.spacing(10),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    descriptionText: {
      textAlign: "right",
      [theme.breakpoints.down('sm')]: {
        marginRight: theme.spacing(5),
      },
    }
  }),
);

const LandingPage = () => {
  const classes = useStyles();

  return (
    <div>
    <Paper className={classes.paper}>
      <Header />
      <Grid container spacing={5} className={classes.root}>
        <Grid item xs={12} sm={6} className={classes.descriptionText}>
          <Typography variant="h3" component="h4" className={classes.title}>
            Venda mais com sua loja na Sahvana
          </Typography>
          <Typography variant="h6" className={classes.description} gutterBottom>
            Profissionalizamos suas vendas de vestuário online e te apresentamos para novos clientes 
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

export default LandingPage;