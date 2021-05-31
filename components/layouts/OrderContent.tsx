import React from 'react';
import Paper from '@material-ui/core/Paper';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { DataGrid, GridToolbarContainer, GridSortDirection } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';

import useSWR from 'swr';

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      maxWidth: 936,
      margin: 'auto',
      overflow: 'hidden',
      backgroundColor: '#eaeff1',
    },
    table: {
      minWidth: 800,
      minHeight: 500,
      backgroundColor: 'white'
    },
  });
  
  const columns = [
    { field: '_id', headerName: 'ID', width: 70, hide: true },
    { field: 'contact_email', headerName: 'Email', width: 180 },
    { field: 'updated_at', headerName: 'Data', width: 180 },
    { field: 'total_price', headerName: 'Preço Total', width: 180 },
  ];

  export interface ContentProps extends WithStyles<typeof styles> {};
  
  function OrderContent(props: ContentProps) {
    const { classes } = props;

    const fetcher = async () => {
      const res = await fetch('http://127.0.0.1:5000/api/last_orders', {
        body: JSON.stringify({
          n_last: 10,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST'
      });
      
      return await res.json();
    };
    
    const { data, error } = useSWR('http://127.0.0.1:5000/api/last_orders', fetcher);

    const handleTest = () => {
      console.log(data);
    };
  
    return (
      <Paper className={classes.paper} elevation={0}>
        {data && (
          <DataGrid 
            className={classes.table}
            rows={data} 
            columns={columns}
          />
        )}
      </Paper>
    );
  }
  
  export default withStyles(styles)(OrderContent);

