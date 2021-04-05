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

interface ProductInfoProps {
  data: {
    title: string;
    description: string;
    gender: string;
    size: string;
    color: string;
    inventory: number;
    original_price: number;
    promotional_price: number;
    category: string;
    subcategory: string;
    variantType1: string;
    variantType2: string;
    variantType3: string;
    inputOption1: string;
    inputOption2: string;
    inputOption3: string;
    total_inventory: number;
  };
}

export default function ProductInfo(props: ProductInfoProps) {
  const classes = useStyles();
  const data = props.data;
  const [openAdd, setOpenAdd] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const dialog_title = data.title;

  const handleClickAddOpen = (_event: any) => {
    setOpenAdd(true);
  };

  const handleAddClose = (_event: any) => {
    setOpenAdd(false);
  };

  const handleClickRemoveOpen = (_event: any) => {
    setOpenRemove(true);
  };

  const handleRemoveClose = (_event: any) => {
    setOpenRemove(false);
  };

  const handleClickEditOpen = (_event: any) => {
    setOpenEdit(true);
  };

  const handleEditClose = (_event: any) => {
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
            {data.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" className={classes.attribute}>
            Gênero: {data.gender}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" className={classes.attribute}>
            Categoria: {data.category}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" className={classes.attribute}>
            Sub-categoria: {data.subcategory}
          </Typography>
          {data.variantType1 && (
            <Typography variant="subtitle1" color="textSecondary" className={classes.attribute}>
              {data.variantType1}: {data.inputOption1}
            </Typography>
          )}
          {data.variantType2 && (
            <Typography variant="subtitle1" color="textSecondary" className={classes.attribute}>
              {data.variantType2}: {data.inputOption2}
            </Typography>
          )}
          {data.variantType3 && (
            <Typography variant="subtitle1" color="textSecondary" className={classes.attribute}>
              {data.variantType3}: {data.inputOption3}
            </Typography>
          )}
          <Typography variant="subtitle1" color="textSecondary" className={classes.attribute}>
            Estoque total: 
            <IconButton onClick={e => handleClickRemoveOpen(e)}>
                <RemoveCircleOutlineIcon className={classes.smallRemoveIcon} />
            </IconButton>
            {data.total_inventory} 
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
