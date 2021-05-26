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
    sectionThree: {
      display: 'flex',
      justifyContent: 'center',
      height: '937px',
      backgroundColor: '#F7F7F7',
      position: 'relative'
    },
    containerContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: '1280px',
        height: '740px',
      },
      textContainer: {
        position: 'relative'
      },
      titleCircle: {
        height: '48px',
        width: '48px',
        backgroundColor: '#FD7600',
        borderRadius: '50%'
      },
      title: {
        width: '609px',
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        fontSize: '60px',
        color: '#000000',
      },
      decorBar: {
        width:'786px',
        borderBottom: '4px solid #FD7600',
        marginBottom: '39px'
      },
      subText: {
        fontFamily: 'Poppins',
        fontWeight: 'normal',
        fontSize: '28px',
        color: '#000000',
      },
      buttonMore: {
        height: '49px',
        width: '217px',
        marginTop: '39px',
        backgroundColor: '#F2790F',
        border: 'none',
        borderRadius:'4px',
        color: 'white',
        textDecoration: 'none',
        fontSize: '18px',
        fontFamily: 'Poppins',
        fontWeight: '300',
        cursor: 'pointer',
        transitionDuration: '0.3s',
        "&:hover": {
          transitionDuration: '0.3s',
          backgroundColor: '#000000',
          color: '#FFFFFF',
          fontWeight: '400'
        },
        },
        decorRec: {
          width: '490px',
          height: '740px',
          backgroundColor: '#F2790F',
          opacity: '0.14',
          position: 'absolute',
          top: '8px',
          right: '-500px'

        },
        decorCircle: {
          height: '400px',
          width: '400px',
          backgroundColor: 'trasparent',
          border: '2.5px solid #F2790F',
          borderRadius: '50%',
          position: 'absolute',
          bottom: '0',
          left: '0',
          transform: 'translate(-25%, 10%)'
        },
    }));
  
    const SectionThree = () => {
      const classes = useStyles();
  
      return (
        <div className={classes.sectionThree}>
          <div className={classes.containerContent}>
            <div className={classes.textContainer}>
              <div className={classes.titleCircle}></div>
              <div className={classes.title}>Venda mais para<br></br> novos clientes</div>
              <div className={classes.decorBar}></div>
              <div className={classes.subText}>Se destaque em nosso shopping e<br></br> conquiste clientes <strong>de todo o Brasil.</strong></div>
              <button className={classes.buttonMore}>Cadastre sua loja</button>
              <div className={classes.decorRec}></div>
            </div>
            <div className={classes.recIcon}>
              <img src="sell_img.jpg" widht="553" height="740"/>  
            </div>
          </div>
          <div className={classes.decorCircle}></div>
        </div>
      );
    };
  
    export default SectionThree;