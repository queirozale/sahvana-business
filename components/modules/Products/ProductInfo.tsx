import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import CreateIcon from '@material-ui/icons/Create';

import SimpleAddDialog from "./AddDialog";
import SimpleRemoveDialog from "./RemoveDialog";
import SimpleEditDialog from "./EditDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    marginTop: '45px'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '30%',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  attribute : {
    paddingBottom: theme.spacing(1),
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
  smallEditIcon: {
    width: 18,
    height: 18
  },
  mediumDeleteIcon: {
    width: 20,
    height: 20,
    color: '#f74545'
  },
}));

export default function ProductInfo(props) {
  const classes = useStyles();
  const theme = useTheme();
  const data = props.data;
  const [openAdd, setOpenAdd] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const dialog_title = data.description;

  const handleClickAddOpen = (event) => {
    setOpenAdd(true);
  };

  const handleAddClose = () => {
    setOpenAdd(false);
  };

  const handleClickRemoveOpen = (event) => {
    setOpenRemove(true);
  };

  const handleRemoveClose = () => {
    setOpenRemove(false);
  };

  const handleClickEditOpen = (event) => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image="clothes.jpg"
        title="Image1"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5"  className={classes.attribute}>
            {data.description}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" className={classes.attribute}>
            Gênero: {data.gender}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" className={classes.attribute}>
            Tamanho: {data.size}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" className={classes.attribute}>
            Cor: {data.color}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" className={classes.attribute}>
            Estoque: 
            <IconButton onClick={e => handleClickRemoveOpen(e)}>
                <RemoveCircleOutlineIcon className={classes.smallRemoveIcon} />
            </IconButton>
            {data.inventory} 
            <IconButton onClick={e => handleClickAddOpen(e)}>
              <AddCircleOutlineIcon className={classes.smallAddIcon} />
            </IconButton>
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" className={classes.attribute}>
            Preço Original: {data.original_price}
            <IconButton onClick={e => handleClickEditOpen(e)}>
              <CreateIcon className={classes.smallEditIcon} />
            </IconButton>
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" className={classes.attribute}>
            Preço Promocional: {data.promotional_price}
            <IconButton onClick={e => handleClickEditOpen(e)}>
              <CreateIcon className={classes.smallEditIcon} />
            </IconButton>
          </Typography>
        </CardContent>
        <SimpleAddDialog title={dialog_title} open={openAdd} onClose={handleAddClose} />
        <SimpleRemoveDialog title={dialog_title} open={openRemove} onClose={handleRemoveClose} />
        <SimpleEditDialog title={dialog_title} open={openEdit} onClose={handleEditClose} />
      </div>
    </Card>
  );
}
