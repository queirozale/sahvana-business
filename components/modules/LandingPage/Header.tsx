import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { signIn, signOut, useSession } from 'next-auth/client';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      // marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
      background: 'transparent', 
      boxShadow: 'none',
      paddingTop: theme.spacing(2),
      paddingRight: theme.spacing(5),
      paddingLeft: theme.spacing(5),
      marginBottom: theme.spacing(10),
    },
    logo: {
      maxHeight: '35px',
    },
    loginButton: {
      backgroundColor: 'white',
      color: '#596A23'
    },
    accessButton: {
      marginRight: theme.spacing(4),
      backgroundColor: 'white',
      color: '#596A23'
    }
  }),
);

export default function Header() {
  const classes = useStyles();
  const [ session, loading ] = useSession();

  return (
    <div className={classes.root}>
      <React.Fragment>
        <AppBar position="sticky" className={classes.appBar} elevation={0}>
          <Toolbar>
            <Link href="https://sahvana.com/">
              <img src="sahvana_logo.png" className={classes.logo} />
            </Link>
            <Typography variant="h6" className={classes.title}>
              
            </Typography>
            {!session &&
              <Button onClick={(): Promise<void> => signIn("auth0")} color="inherit" className={classes.loginButton}>Entrar</Button>
            }
            {session && 
              <div>
                <Link href="/perfil">
                  <Button className={classes.accessButton}>Acessar</Button>
                </Link>
                <Button onClick={(): Promise<void> => signOut()} color="inherit" className={classes.loginButton}>Sair</Button>
              </div>
            }
          </Toolbar>
        </AppBar>
      </React.Fragment>
    </div>
  );
};
