import React, { useState }  from 'react';

import Paper from '@material-ui/core/Paper';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { signIn, signOut, useSession } from 'next-auth/client';
import useSWR from 'swr';

import CompleteProfile from '../modules/Profile/Checkout/CompleteProfile';
import Profile from '../modules/Profile/ViewProfile';

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      maxWidth: 936,
      margin: 'auto',
      overflow: 'hidden',
      backgroundColor: '#eaeff1'
    },
    searchBar: {
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    searchInput: {
      fontSize: theme.typography.fontSize,
    },
    block: {
      display: 'block',
    },
    addUser: {
      marginRight: theme.spacing(1),
    },
    contentWrapper: {
      margin: '40px 16px',
    },
  });

// const fetcher = params => url => post(url, params);

// const fetcher = (...args: [input: RequestInfo, init?: RequestInit | undefined]) => fetch(...args).then(res => res.json());

export interface ContentProps extends WithStyles<typeof styles> {
  email: string;
}

function ProfileContent(props: ContentProps) {
  const { classes } = props;
  const email = props.email;
  const fetcher = async () => {
      const res = await fetch('/api/findUser', {
          body: JSON.stringify({
              email: email,
            }),
            headers: {
                'Content-Type': 'application/json'
              },
              method: 'POST'
            });
          
      return await res.json();
  };

  const { data, error} = useSWR('/api/findUser', fetcher);

  const handleClick = () => {
    console.log(data);
  };

  return (
    <Paper className={classes.paper} elevation={0}>
      {data && (
        <Profile userData={data} />
      )}
      {!data && (
        <CompleteProfile />
      )}
    </Paper>
  );
}

export default withStyles(styles)(ProfileContent);