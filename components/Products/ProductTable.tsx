import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import useSWR from 'swr';
import api from '../../utils/api';

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

function createData(description, inventory, original_price, promotional_price) {
  return { description, inventory, original_price, promotional_price };
}

// async function queryProducts() {
//   const res = await fetch('/api/findProduct', {method: 'POST'});
//   const data = await res.json();

//   if (!data) {
//     return {
//       notFound: true,
//     };
//   };

//   return {
//     props: { data }, // will be passed to the page component as props
//   };
// };


// const rows = queryProducts();

// const rows = [
//   createData("teste", 10, 1, 2),
//   createData("teste2", 13, 3, 20)
// ];

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function BasicTable() {
  const classes = useStyles();
  const { data, error } = useSWR('/api/findProduct', fetcher);

  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }

  // const rows = data.data;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Descrição</TableCell>
            <TableCell align="right">Estoque</TableCell>
            <TableCell align="right">Preço Original</TableCell>
            <TableCell align="right">Preço Promocional</TableCell>
          </TableRow>
        </TableHead>
        {data && (
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.descripition}>
                <TableCell component="th" scope="row">
                  {row.description}
                </TableCell>
                <TableCell align="right">{row.inventory}</TableCell>
                <TableCell align="right">{row.original_price}</TableCell>
                <TableCell align="right">{row.promotional_price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
