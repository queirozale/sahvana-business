import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/client'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    background: "#DAC48E"
  }
}));

const Header: NextPage = () => {
  const classes = useStyles();
  const [ session, loading ] = useSession();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Sahvana
          </Typography>
          {!session &&
            <Button onClick={(): Promise<void> => signIn("auth0")} color="inherit">Login</Button>
          }
          {session && 
            // Signed in as {session.user.email} <br/>
            <Button onClick={(): Promise<void> => signOut()} color="inherit">Log out</Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
