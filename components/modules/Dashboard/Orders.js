import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

import Title from './Title';

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

export default function Orders(props) {
  const classes = useStyles();
  const data = props.data;

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
            <TableCell>Cliente</TableCell>
            <TableCell>Produto</TableCell>
            <TableCell>Variante</TableCell>
            <TableCell align="right">Preço</TableCell>
          </TableRow>
        </TableHead>
        {data && (
          <TableBody>
            {data.last_sales.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.updated_at.slice(0, 10)}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.variant_title}</TableCell>
                <TableCell align="right">{formatter.format(row.price)}</TableCell>
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