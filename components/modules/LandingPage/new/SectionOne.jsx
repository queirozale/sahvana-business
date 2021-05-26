import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from '@material-ui/core/Link';
import { flexbox } from '@material-ui/system';


const useStyles = makeStyles((theme) => ({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '89vh',
      backgroundImage: `url(${"clothes2.png"})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      filter: 'contrast(1)',
  },
    title: {
      width: '700px',
      textAlign: 'center',
      fontSize: '72px',
      color: '#FFFFFF',
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      textShadow: '4px 4px 4px rgba(0, 0, 0, 0.25);'
    },
    decorBar: {
      width:'204px',
      borderBottom: '2px solid #FFFFFF',
      marginTop: '40px',
      marginBottom: '40px'
    },
    subTittle: {
      width: '500px',
      textAlign: 'center',
      fontSize: '25px',
      color: '#FFFFFF',
      fontFamily: 'Poppins',
      fontWeight: '300',
      textShadow: '4px 4px 4px rgba(0, 0, 0, 0.25);'
    },
    buttonMore: {
    height: '46px',
    widht: '152px',
    backgroundColor: '#F2790F',
    border: 'none',
    borderRadius:'4px',
    color: 'white',
    textAlign: 'center',
    textDecoration: 'none',
    marginTop: '40px',
    fontSize: '18px',
    fontFamily: 'Poppins',
    fontWeight: '300',
    paddingLeft: '15px', 
    paddingRight: '15px',
    cursor: 'pointer',
    transitionDuration: '0.3s',
    "&:hover": {
      transitionDuration: '0.3s',
      backgroundColor: 'white',
      color: '#000000',
      fontWeight: '500'
    },
    },
    decorCircle: {
      overflow: 'hidden',
      height: '500px',
      width: '500px',
      backgroundColor: 'trasparent',
      border: '2.5px solid #F2790F',
      borderRadius: '50%',
      position: 'absolute',
      right: '0',
      bottom: '0',
      transform: 'translate(25%, 60%)'
    },
  }));

  const SectionOne = () => {
    const classes = useStyles();

    return (
      <div className={classes.paper} >
        <div className={classes.title} >
          Venda mais com a <br></br>Sahvana
        </div>
        <div className={classes.decorBar}></div>
        <div className={classes.subTittle}>
          Sua loja vendendo como nunca em um shopping de moda online.
        </div>
        <button className={classes.buttonMore}>Saiba mais</button>
        <div className={classes.decorCircle}></div>
      </div>
    );
  };

  export default SectionOne;