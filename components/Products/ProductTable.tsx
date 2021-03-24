import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import { DataGrid } from '@material-ui/data-grid';

import SimpleAddDialog from "./AddDialog";
import SimpleRemoveDialog from "./RemoveDialog";
import DeleteRowDialog from "./DeleteRowDialog";
import useSWR from 'swr';
import { DeleteForeverTwoTone } from '@material-ui/icons';

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
  smallAddIcon: {
    width: 18,
    height: 18,
    color: '#36bf58'
  },
  smallRemoveIcon: {
    width: 18,
    height: 18,
    color: '#f74545'
  },
  mediumDeleteIcon: {
    width: 20,
    height: 20,
    color: '#f74545'
  },
  paginationLinks: {
    marginTop: '10px',
    marginLeft: '10px'
  }
});

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function BasicTable(props) {
  const classes = useStyles();
  const editMode = props.editMode;
  const { data, error } = useSWR('/api/findProduct', fetcher);
  const [openAdd, setOpenAdd] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [openDeleteRow, setOpenDeleteRow] = useState(false);
  const [dialog_title, setDialog_title] = useState('Produto');

  const handleClickAddOpen = (event, title) => {
    setOpenAdd(true);
  };

  const handleAddClose = () => {
    setOpenAdd(false);
  };

  const handleClickRemoveOpen = (event, title) => {
    setOpenRemove(true);
  };

  const handleRemoveClose = () => {
    setOpenRemove(false);
  };

  const handleDeleteRow = (event) => {
    setOpenDeleteRow(true);
  };

  const handleDeleteRowClose = (event) => {
    setOpenDeleteRow(false);
  };

  const [rows, setRows] = useState(data);
  const [deletedRows, setDeletedRows] = useState([]);
  const [showInfo, setShowInfo] = useState();

  const handleRowSelection = (e) => {
    if (editMode) {
      if (!deletedRows.includes(e.data.id)) {
        setDeletedRows(deletedRows => [...deletedRows, e.data.id]);
      } else {
        setDeletedRows(deletedRows.filter(item => item !== e.data.id));
      }
    } else {
      setShowInfo(e.data.id)
    }
 };

 const handlePurge = () => {
  console.log(deletedRows);
 }

 const handleDelete = async () => {
  const res = await fetch('/api/deleteProduct', {
    body: JSON.stringify({
      _id: deletedRows[0]
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  });
 };

  const columns = [
    { field: '_id', headerName: 'ID', width: 70, hide: true },
    { field: 'description', headerName: 'Descrição', width: 180 },
    { field: 'inventory', headerName: 'Estoque', width: 130, type: 'number' },
    { field: 'original_price', headerName: 'Preço Original', width: 180, type: 'number' },
    { field: 'promotional_price', headerName: 'Preço Promocional', width: 180, type: 'number' },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      {data && (
        <DataGrid 
        rows={data} 
        columns={columns} 
        pageSize={5} 
        getRowId={(data) => data._id} 
        checkboxSelection={editMode}
        onRowSelected={e => handleRowSelection(e)}
        />
      )}
      <Button variant="contained" color="primary" onClick={handlePurge}>
        Purge
      </Button>
      <Button variant="contained" color="primary">
        Delete
      </Button>
    </div>
  )
}

//   return (
//     <div>
//       <TableContainer component={Paper}>
//         <Pagination className={classes.paginationLinks} count={2} variant="outlined" shape="rounded" />
//         <Table className={classes.table} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Descrição</TableCell>
//               <TableCell align="right">Estoque</TableCell>
//               <TableCell align="right">Preço Original</TableCell>
//               <TableCell align="right">Preço Promocional</TableCell>
//               <TableCell align="right"></TableCell>
//             </TableRow>
//           </TableHead>
//           {data && (
//             <TableBody>
//               {data.map((row) => (
//                 <TableRow key={row.descripition}>
//                   <TableCell component="th" scope="row">
//                     <Button>
//                       {row.description}
//                     </Button>
//                   </TableCell>
//                   <TableCell align="right">
//                     {editMode && (
                    // <IconButton onClick={e => handleClickRemoveOpen(e, row.descripition)}>
                    //     <RemoveCircleOutlineIcon className={classes.smallRemoveIcon} />
                    // </IconButton>
//                     )}
//                     {row.inventory}
//                     {editMode && (
                    // <IconButton onClick={e => handleClickAddOpen(e, row.descripition)}>
                    //   <AddCircleOutlineIcon className={classes.smallAddIcon} />
                    // </IconButton>
//                     )}
//                   </TableCell>
//                   <TableCell align="right">{row.original_price}</TableCell>
//                   <TableCell align="right">{row.promotional_price}</TableCell>
//                   <TableCell>
//                     {editMode && (
//                     <IconButton onClick={e => handleDeleteRow(e)}>
//                       <HighlightOffIcon className={classes.mediumDeleteIcon}/>
//                     </IconButton>
//                     )}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           )}
//         </Table>
//       </TableContainer>
//       <SimpleAddDialog title={dialog_title} open={openAdd} onClose={handleAddClose} />
//       <SimpleRemoveDialog title={dialog_title} open={openRemove} onClose={handleRemoveClose} />
//       <DeleteRowDialog title={dialog_title} open={openDeleteRow} onClose={handleDeleteRowClose} />
//     </div>
//   );
// };
