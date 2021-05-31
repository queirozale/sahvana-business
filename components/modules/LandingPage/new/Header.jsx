import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { signIn, signOut, useSession } from 'next-auth/client';
import Link from '@material-ui/core/Link';

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
    height: '85px'
  },
  menuNavBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  funcLink: {
    textTransform: 'none',
    fontFamily: 'Poppins',
    fontWeight: '700',
    marginRight: '25px',
    '&:hover': {
      backgroundColor: 'transparent',
    }

  },
  funcCad: {
    textTransform: 'none',
    fontFamily: 'Poppins',
    fontWeight: '700',
    marginRight: '55px',
    '&:hover': {
      backgroundColor: 'transparent',
    }
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
    },
    marginLeft: theme.spacing(2)
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [ session, loading ] = useSession();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.containerContent}>
          <img className={classes.logo} src="./logo_nav.png"/>
          <div className={classes.menuNavBar}>
            <Button className={classes.funcLink}>Como funciona</Button>
            <Button className={classes.funcCad}>Cadastrar loja</Button>
            {!session &&
              <Button onClick={() => signIn("auth0")} color="inherit" className={classes.logButton}>Entrar</Button>
            }
            {session && 
              <div>
                <Link href="/perfil">
                  <Button className={classes.logButton}>Acessar</Button>
                </Link>
                <Button onClick={() => signOut()} color="inherit" className={classes.logButton}>Sair</Button>
              </div>
            }
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
