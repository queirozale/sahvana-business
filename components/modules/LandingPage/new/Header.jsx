import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(10),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    maxHeight: '35px',
  },
  appBar: {
    background: '#ffffff',
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="fixed" elevation={0}>
        <Toolbar>
            <Link href="https://sahvana.com/">
              <img src="sahvana_logo.png" className={classes.logo} />
            </Link>
            <Typography variant="h6" className={classes.title}>
              
            </Typography>
            <div>
              <Link href="#">
                <Button className={classes.menuButton}>Como funciona</Button>
              </Link>
              <Link href="#">
                <Button className={classes.menuButton}>Cadastrar Loja</Button>
              </Link>
              <Link href="#">
                <Button variant="outlined" className={classes.menuButton}>ENTRAR</Button>
              </Link> 
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
