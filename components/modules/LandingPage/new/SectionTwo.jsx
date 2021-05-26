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
  sectionTwo: {
    display: 'flex',
    justifyContent: 'center',
    height: '937px',
  },
  containerContent: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '1280px'
  },
  titleCircle: {
    height: '48px',
    width: '48px',
    backgroundColor: '#FD7600',
    borderRadius: '50%'
  },
  title: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: '60px',
    color: '#000000'
  },
  decorBar: {
    width:'559px',
    borderBottom: '4px solid #FD7600',
    marginBottom: '58px'
  },
  containerRecs: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '1280px',
    height: '533px',
  },
  rec: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    width: '576px',
    height: '246px',
    border: '2px solid #000000',
    marginLeft: '20px',
  },
  decorRec: {
    position: 'absolute',
    top: '5px',
    left: '5px',
    width: '576px',
    height: '246px',
    border: '2px solid #C7C7C7'
  },
  textRec: {
    alignSelf: 'center',
    paddingRight: '45px'
  },
  recTitle: {
    fontFamily: 'Poppins',
    fontSize: '36px',
    fontWeight: '800',
    color: '#FD7600'
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: '21px',
    marginTop: '10px',
    color: '#000000'
  },
  recIcon: {
    alignSelf: 'center'
  }

  }));

  const SectionTwo = () => {
    const classes = useStyles();

    return (
      <div className={classes.sectionTwo}>
        <div className={classes.containerContent}>
          <div className={classes.titleCircle}></div>
          <div className={classes.title}>Por que vender na<br></br>Sahvana?</div>
          <div className={classes.decorBar}></div>
          <div className={classes.containerRecs}>
            <div className={classes.rec}>
              <div className={classes.decorRec}></div>
              <div className={classes.textRec}>
                <div className={classes.recTitle}>Marketplace</div>
                <div className={classes.subtitle}>Um canal de venda <strong>a<br></br> mais</strong> para você expor os<br></br> seus produtos.</div>
              </div>
              <div className={classes.recIcon}>
                <img src="market_icon.png" widht="127" height="127"/>
              </div>
            </div>
            <div className={classes.rec}>
              <div className={classes.decorRec}></div>
              <div className={classes.textRec}>
                <div className={classes.recTitle}>Logística</div>
                <div className={classes.subtitle}>Cuidamos de toda logística<br></br> dos seus pedidos e o seu<br></br> frete fica <strong>mais barato.</strong></div>
              </div>
              <div className={classes.recIcon}>
                <img src="log_icon.png" widht="147" height="123" />
              </div>
            </div>
            <div className={classes.rec}>
              <div className={classes.decorRec}></div>
              <div className={classes.textRec}>
                <div className={classes.recTitle}>Loja virtual</div>
                <div className={classes.subtitle}>Fornecemos uma loja<br></br> virtual <strong>gratuíta</strong> para você<br></br> usar como site próprio.</div>
              </div>
              <div className={classes.recIcon}>
                <img src="shop_icon.png" widht="137" height="137"/>
              </div>
            </div>
            <div className={classes.rec}>
              <div className={classes.decorRec}></div>
              <div className={classes.textRec}>
                <div className={classes.recTitle}>Gestão simples</div>
                <div className={classes.subtitle}>Gerencie o seu negócio<br></br> na palma da mão com<br></br> <strong>eficiência e praticidade.</strong></div>
              </div>
              <div className={classes.recIcon}>
                <img src="gest_icon.png" widht="137" height="137"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default SectionTwo;