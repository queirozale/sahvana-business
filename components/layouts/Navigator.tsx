import React, { useState } from 'react';
import clsx from 'clsx';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer, { DrawerProps } from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import { Omit } from '@material-ui/types';
import MailIcon from '@material-ui/icons/Mail';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PersonIcon from '@material-ui/icons/Person';
import HistoryIcon from '@material-ui/icons/History';
import PresentToAllIcon from '@material-ui/icons/PresentToAll';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Link from '@material-ui/core/Link';
import { useSession } from 'next-auth/client';

import useSWR from 'swr';


const styles = (theme: Theme) =>
  createStyles({
    categoryHeader: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    categoryHeaderPrimary: {
      color: theme.palette.common.white,
    },
    item: {
      paddingTop: 1,
      paddingBottom: 1,
      color: 'rgba(255, 255, 255, 0.7)',
      '&:hover,&:focus': {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
      },
    },
    itemCategory: {
      backgroundColor: '#232f3e',
      boxShadow: '0 -1px 0 #404854 inset',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    firebase: {
      fontSize: 24,
      color: theme.palette.common.white,
    },
    itemActiveItem: {
      color: '#4fc3f7',
    },
    itemPrimary: {
      fontSize: 'inherit',
    },
    itemIcon: {
      minWidth: 'auto',
      marginRight: theme.spacing(2),
    },
    divider: {
      marginTop: theme.spacing(2),
    },
  });

export interface NavigatorProps extends Omit<DrawerProps, 'classes'>, WithStyles<typeof styles> {
  iconType: string;
  childId: string;
  activations: {
    Perfil: boolean;
    Contato: boolean;
    MeusProdutos: boolean;
    AdicionarProdutos: boolean;
    Histórico: boolean;
    Pedidos: boolean;
  };
};

interface ProductData {
  Perfil: boolean;
  Contato: boolean;
  MeusProdutos: boolean;
  AdicionarProdutos: boolean;
  Histórico: boolean;
  Pedidos: boolean;
};

interface Routes {
  [key: string]: string;
}

function Navigator(props: NavigatorProps) {
  const { classes, ...other } = props;
  const activations = props.activations;
  const [activeIcons, setActiveIcons] = useState<ProductData | any>(activations);
  const [ session, loading ] = useSession();


  const fetcher = async () => {
    const res = await fetch('/api/findUser', {
        body: JSON.stringify({
            email: session.user.email,
          }),
          headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST'
          });

    return await res.json();
  };

  const { data, error} = useSWR('/api/findUser', fetcher);

  const handleClickIcon = (_event: any, iconType: string) => {
    setActiveIcons({ ...setActiveIcons, [iconType]: true });
  };

  const categories = [
    {
      id: 'Sobre a loja',
      children: [
        { id: 'Perfil', icon: <PersonIcon />, active: activeIcons.Perfil },
        { id: 'Contato', icon: <MailIcon />, active: activeIcons.Contato  },
      ],
    },
    {
      id: 'Produtos',
      children: [
        { id: 'Meus produtos', icon: <ListAltIcon />, active: activeIcons.MeusProdutos  },
        { id: 'Adicionar produtos', icon: <AddCircleIcon />, active: activeIcons.AdicionarProdutos  },
        { id: 'Histórico', icon: <HistoryIcon />, active: activeIcons.Histórico  },
        { id: 'Pedidos', icon: <PresentToAllIcon />, active: activeIcons.Pedidos  },
      ],
    },
  ];

  const routes: Routes = {
    'Perfil': 'perfil',
    'Contato': 'contato',
    'Meus produtos': 'produtos',
    'Adicionar produtos': 'produtos_adicionar',
    'Histórico': 'historico',
    'Pedidos': 'pedidos'
  }


  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        {data && (
          <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
            {data.store}
          </ListItem>
        )}
        <Link color="inherit" href="/home">
          <ListItem className={clsx(classes.item, classes.itemCategory)}>
            <ListItemIcon className={classes.itemIcon}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText
              classes={{
                primary: classes.itemPrimary,
              }}
            >
              Início
            </ListItemText>
          </ListItem>
        </Link>
        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active }) => (
              <React.Fragment key={childId}>
                <Link color="inherit" href={"/" + routes[childId]}>
                  <ListItem
                    key={childId}
                    button
                    className={clsx(classes.item, active && classes.itemActiveItem)}
                    onClick={(e: any) => handleClickIcon(e, childId)}
                  >
                    <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                    <ListItemText
                      classes={{
                        primary: classes.itemPrimary,
                      }}
                    >
                      {childId}
                    </ListItemText>
                  </ListItem>
                </Link>
              </React.Fragment>
            ))}
            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

export default withStyles(styles)(Navigator);