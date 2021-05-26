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
        height: '819px',
        backgroundColor: '#F7F7F7'
      },
      containerContent: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        width: '1280px',
        position: 'relative'
      },
      decorCircle: {
        height: '500px',
        width: '500px',
        backgroundColor: 'trasparent',
        border: '2.5px solid #F2790F',
        borderRadius: '50%',
        position: 'absolute',
        right: '-400px',
        top: '-200px'
      },
      titleCircle: {
        height: '48px',
        width: '48px',
        backgroundColor: '#FD7600',
        borderRadius: '50%',
      },
      title: {
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        fontSize: '60px',
        color: '#000000'
      },
      decorBar: {
        width:'413px',
        borderBottom: '4px solid #FD7600',
        marginBottom: '58px',
        paddingTop: '10px'
      },
      containerDepo: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '334px',
      },
      depoInfo: {
        display: 'flex',
        height: '215px',
        flexDirection: 'Column',
      },
      depoText: {
        fontFamily: 'Poppins',
        fontStyle: 'italic',
        fontWeight: '300',
        fontSize: '28px',
        color: '#000000'
      },
      depoPerson: {
        fontFamily: 'Poppins',
        fontWeight: '900px',
        fontSize: '25px',
        color: '#000000',
        paddingTop: '20px'
      }

    }));
  
    const SectionFive = () => {
      const classes = useStyles();
  
      return (
        <div className={classes.sectionFour}>
          <div className={classes.containerContent}>
            <div className={classes.decorCircle}></div>
            <div className={classes.titleCircle}></div>
            <spam className={classes.title}>Depoimentos</spam>
            <div className={classes.decorBar}></div>
            <div className={classes.containerDepo}>
                <div><img src="client-icon1.png" widht="300" height="300"/></div>
                <div className={classes.depoInfo}>
                    <div className={classes.depoText}>"A <strong>Sahvana</strong> me ajudou a captar novos clientes<br></br> 
                        para a Brida, automatizar minhas vendas e me<br></br> 
                        dar mais tempo para cuidar da minha loja, por<br></br> 
                        que eles cuidam de tudo”.</div>
                    <div className={classes.depoPerson}><strong>Julia Drumond - Brida</strong></div>
                </div>
            </div>
          </div>
        </div>
      );
    };
  
    export default SectionFive;