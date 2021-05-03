import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import useSWR from 'swr';
import { useSession } from 'next-auth/client';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

const vendors = {
  'jdrumond96@gmail.com': 'Brida',
  'amandareblin@hotmail.com': 'Aroom e Venice',
  'usepampz@gmail.com': 'Pampz',
  'contato@usetimeless.com.br': 'Timeless',
  'Cesar.ferrari29@gmail.com': 'O P Ü S',
  'amanda_loss.v@hotmail.com': 'Feather Jeans',
  'queirozalessandro1@gmail.com': 'Brida'
}

export default function Deposits() {
  const classes = useStyles();
  const [ session, loading ] = useSession();
  const fetcher = async () => {
    const res = await fetch('https://sahvana-admin.herokuapp.com/api/total_sales', {
        body: JSON.stringify({
            Vendor: vendors[session.user.email],
          }),
          headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST'
          });
  
    return await res.json();
  };
  
  const { data, error} = useSWR('https://sahvana-admin.herokuapp.com/api/total_sales', fetcher);

  var formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <React.Fragment>
      <Title>Vendas totais</Title>
      <Typography component="p" variant="h4">
        {data && (
          formatter.format(data.total_sales)
        )}
      </Typography>
      {/* <Typography color="textSecondary" className={classes.depositContext}>
        22/03/2021 - 29/03/2021
      </Typography> */}
    </React.Fragment>
  );
}