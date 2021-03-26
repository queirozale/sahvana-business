import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PersonIcon from '@material-ui/icons/Person';
import HistoryIcon from '@material-ui/icons/History';

import { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/client';

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
  
  const [openSideBar, setOpenSideBar] = useState(false);

  const toggleDrawer = (event) => {
    setOpenSideBar(!openSideBar);
  };

  const list = () => (
    <div
      role="presentation"
    >
      <List>
        <ListItem button key={'Perfil'}>
          <ListItemIcon><PersonIcon /></ListItemIcon>
          <ListItemText primary={'Perfil'} />
        </ListItem>
        <Divider />
        <ListItem button key={'Produtos'}>
          <ListItemIcon><ListAltIcon /></ListItemIcon>
          <ListItemText primary={'Produtos'} />
        </ListItem>
  
        <ListItem button key={'Histórico de Alteração'}>
          <ListItemIcon><HistoryIcon /></ListItemIcon>
          <ListItemText primary={'Histórico de Alteração'} />
        </ListItem>
        <Divider />
        <ListItem button key={'Contato'}>
          <ListItemIcon><MailIcon /></ListItemIcon>
          <ListItemText primary={'Contato'} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton 
          edge="start" 
          className={classes.menuButton} 
          color="inherit" 
          aria-label="menu" 
          onClick={toggleDrawer}>
            <MenuIcon />
          <Drawer anchor={'left'} open={openSideBar} onClose={toggleDrawer}>
            {list('left')}
          </Drawer>
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
