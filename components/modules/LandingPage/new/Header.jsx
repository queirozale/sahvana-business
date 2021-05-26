import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar:{
    boxShadow: 'none',
    height: '100px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  containerContent: {
    width: '1280px',
    height: '100px',
    display: 'flex',
    justifyContent: 'space-between',
    color: 'black'
  },
  logo: {
    height: '45px'
  },
  menuNavBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins',
    fontSize: '15px',
    fontWeight: '700',
  },
  funcLink: {
    paddingRight: '50px',
    cursor: 'pointer',
    color: '#000000',
  },
  funcCad: {
    paddingRight: '50px',
    cursor: 'pointer',
    color: '#000000',
  },
  logButton: {
    height: '42px',
    widht: '107px',
    fontFamily: 'Poppins',
    fontSize: '18px',
    fontWeight: 'bold',
    border: '2px solid #000000',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: '#FD7600',
      border: '2px solid #FD7600',
      color: 'white'
    }
  }
  
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.containerContent}>
          <img className={classes.logo} src="./sahvana_logo.png"/>
          <div className={classes.menuNavBar}>
            <div className={classes.funcLink}>Como funciona</div>
            <div className={classes.funcCad}>Cadastrar loja</div>
          <Button className={classes.logButton}color="inherit">ENTRAR</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
