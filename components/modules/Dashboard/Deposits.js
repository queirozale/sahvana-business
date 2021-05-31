import React from 'react';
import useSWR from 'swr';
import { useSession } from 'next-auth/client';

import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits(props) {
  const classes = useStyles();
  const data = props.data;

  var formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <React.Fragment>
      <Title>Vendas totais</Title>
      <Typography component="p" variant="h4">
        {data && (
          formatter.format(data.sum_sales)
        )}
        {!data && (
          <CircularProgress />
        )}
      </Typography>
      {/* <Typography color="textSecondary" className={classes.depositContext}>
        22/03/2021 - 29/03/2021
      </Typography> */}
    </React.Fragment>
  );
}