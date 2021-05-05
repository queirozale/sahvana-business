import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';

import Title from './Title';
import useSWR from 'swr';
import { useSession } from 'next-auth/client';

// Generate Order Data
function createData(id, date, name, shipTo, product, amount) {
  return { id, date, name, shipTo, product, amount };
}


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const vendors = {
  'jdrumond96@gmail.com': 'Brida',
  'amandareblin@hotmail.com': 'Aroom e Venice',
  'usepampz@gmail.com': 'Pampz',
  'contato@usetimeless.com.br': 'Timeless',
  'Cesar.ferrari29@gmail.com': 'O P Ü S',
  'amanda_loss.v@hotmail.com': 'Feather Jeans',
  'queirozalessandro1@gmail.com': 'Brida'
}

export default function Orders() {
  const classes = useStyles();
  const [ session, loading ] = useSession();
  const fetcher = async () => {
    const res = await fetch('https://sahvana-admin.herokuapp.com/api/orders', {
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
  
  const { data, error} = useSWR('https://sahvana-admin.herokuapp.com/api/orders', fetcher);

  var formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <React.Fragment>
      <Title>Pedidos recentes</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Enviar para</TableCell>
            <TableCell>Produto</TableCell>
            <TableCell align="right">Total vendido</TableCell>
          </TableRow>
        </TableHead>
        {data && (
          <TableBody>
            {data.data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.shipTo}</TableCell>
                <TableCell>{row.product}</TableCell>
                <TableCell align="right">{formatter.format(row.amount)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
        {!data && (
          <CircularProgress />
        )}
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="/pedidos">
          Veja mais pedidos
        </Link>
      </div>
    </React.Fragment>
  );
}