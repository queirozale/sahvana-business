import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import connect from '../../utils/database';

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

function createData(description, inventory, original_price, promotional_price) {
  return { description, inventory, original_price, promotional_price };
}

const rows = [
  response
];

export default function BasicTable() {
  const classes = useStyles();

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
        <TableBody>
          {rows.map((row) => (
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
      </Table>
    </TableContainer>
  );
}
