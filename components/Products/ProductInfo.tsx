import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

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
  }
}));

export default function ProductInfo(props) {
  const classes = useStyles();
  const theme = useTheme();
  const data = props.data;

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
            Tamanho: {data.color}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" className={classes.attribute}>
            Tamanho: {data.inventory}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" className={classes.attribute}>
            Tamanho: {data.original_price}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" className={classes.attribute}>
            Tamanho: {data.promotional_price}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}
