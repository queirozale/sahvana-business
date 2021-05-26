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
    sectionFour: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        height: '512px',
        widht: '1280px'
      },
      containerContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      containerRecs: {
        position: 'relative',
      },
      recText: {
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        fontSize: '72px',
        color: '#F2790F',
        paddingRight: '72px'
      },
      recButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '38px',
        width: '228px',
        height: '50px',
        border: '2.5px solid #000000',
        borderRadius: '4px',
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: '22px',
        color: '#000000',
        transitionDuration: '0.3s',
        cursor: 'pointer',
        "&:hover": {
            transitionDuration: '0.3s',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            fontWeight: '500'
          },
      },
    }));
  
    const SectionSix = () => {
      const classes = useStyles();
  
      return (
        <div className={classes.sectionFour}>
            <div className={classes.containerContent}>
                <div className={classes.containerRecs}>
                    <div className={classes.recText}>Seja uma<br></br> loja parceira.</div>
                    <div className={classes.recButton}>Cadastrar loja</div>
                </div>
                <div className={classes.imgLogo}>
                    <img src="logo2.png" widht="290" height="290"/>
                 </div>
            </div>
        </div>
      );
    };
  
    export default SectionSix;