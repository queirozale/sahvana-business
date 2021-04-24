import React, {useState} from "react";
import Header from '../modules/LandingPage/new/Header';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: 'auto',
    overflow: 'hidden',
    minHeight: '100vh',
    backgroundColor: 'rgb(64, 64, 64, 0.3)',
    backgroundImage: `url(${"clothes.jpg"})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
}));

const LadingPage = () => {
  const classes = useStyles();
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <React.Fragment>
      <Header />
      <Paper className={classes.paper}>
        <h1>Hello World</h1>
        <p>teste</p>
        <Button onClick={handleClick}>
          CLICK ME
        </Button>
        <h3>{count}</h3>
        </Paper>
    </React.Fragment>
  );
};

export default LadingPage;