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
        height: '1024px'
      },
      containerContent: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        width: '1280px',
        position: 'relative'
      },
      decorElem: {
        backgroundImage: `url(${"decorElem.png"})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '155px',
        width: '110px',
        position: 'absolute',
        right: '0'
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
        width:'620px',
        borderBottom: '4px solid #FD7600',
        marginBottom: '58px',
        paddingTop: '15px'
      },
      containerRecs: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        height: '550px',
      },
      recInfo: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height: '425px',
        width: '632px',
        border: '2px solid #000000',
      },
      decorRec: {
        position: 'absolute',
        left: '5px',
        top: '5px',
        height: '425px',
        width: '632px',
        border: '2px solid #C7C7C7',
        zIndex: '-1'
      },
      recText: {
        width: '537px',
        marginTop: '100px'
      },
      circleRec: {
        position: 'absolute',
        top: '0px',
        left: '300px',
        height: '254px',
        width: '254px',
        border: '2px solid #000000',
        borderRadius: '50%',
        backgroundImage: `url(${"ate_icon.png"})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      },
      titleRec: {
        fontFamily: 'Poppins',
        fontWeight: '800',
        fontSize: '42px',
        color: '#FD7600',
        paddingBottom: '10px'
      },
      subtitleRec: {
        fontFamily: 'Poppins',
        fontWeight: 'normal',
        fontSize: '23px',
        color: '#000000'
      },
      selectRecs: {
        display: 'flex',
        flexDirection: 'column',
        height: '425px',
      },
      select: {
        textAlign: 'center',
        lineHeight: '67px',
        width: '328px',
        height: '67px',
        backgroundColor: '#FD7600',
        borderRadius: '4px',
        fontFamily: 'Poppins',
        fontSize: '20px',
        fontWeight: '300',
        color: 'white',
        marginBottom: '23px',
        textTransform: 'none',
        "&:hover": {
          transitionDuration: '0.3s',
          backgroundColor: '#000000',
        },
      }
    }));
  
    const SectionFour = () => {
      const classes = useStyles();

      const [selected, setSelected] = useState('Atendimento');

      const explanationDict = {
        'Atendimento': {
          'text': 'Temos uma equipe pronta para dar o melhor atendimento ao seu cliente. Aqui, você só é acionado se for realmente necessário.',
          'img': 'ate_icon.png'
        },
        'Campanhas': {
          'text': 'Se beneficie das nossas campanhas e promoções. Além disso, você também pode criar as suas próprias campanhas.',
          'img': 'camp_img.png'
        },
        'Impulsionamento': {
          'text':'Entre em contato com a nossa equipe especializada em marketing digital para impulsionar a sua loja e seus produtos. Seja mais visto e venda mais!',
          'img': 'impuls_img.png'
        },
        'Pós-Venda': {
          'text': 'Conte com o nosso sistema de pós-venda para garantir a melhor experiência de seus clientes. Cuidamos da tudo, desde a recuperação de carrinhos até uma troca de produto.',
          'img': 'posvenda_img.png'
        },
        'Gestão': {
        'text': 'Aproveite da nossa plataforma para gerir a sua loja e seus pedidos de forma fácil. A nossa tecnologia é toda desenvolvida para facilitar a gestão do seu negócio de moda.',
        'img': 'gestao_img.png'
        }
      };

      const handleClickAtendimento = () => {
        setSelected('Atendimento');
      };

      const handleClickCampanhas = () => {
        setSelected('Campanhas');
      };

      const handleClickImpulsionamento = () => {
        setSelected('Impulsionamento');
      };

      const handleClickPosVenda = () => {
        setSelected('Pós-Venda');
      };

      const handleClickGestao = () => {
        setSelected('Gestão');
      };
  
      return (
        <div className={classes.sectionFour}>
          <div className={classes.containerContent}>
            <div className={classes.decorElem}></div>
            <div className={classes.titleCircle}></div>
            <div className={classes.title}>O que mais fazemos<br></br> por você?</div>
            <div className={classes.decorBar}></div>
            <div className={classes.containerRecs}>
              <div className={classes.recInfo}>
                <div className={classes.decorRec}></div>
                <div className={classes.recText}>
                  <div className={classes.titleRec}>{selected}</div>
                  <div className={classes.subtitleRec}>{explanationDict[selected].text}</div>
                </div>
              </div>
              <div className={classes.selectRecs}>
                <Button className={classes.select} onClick={handleClickAtendimento}>Atendimento</Button>
                <Button className={classes.select} onClick={handleClickCampanhas}>Campanhas</Button>
                <Button className={classes.select} onClick={handleClickImpulsionamento}>Impulsionamento</Button>
                <Button className={classes.select} onClick={handleClickPosVenda}>Pós-venda</Button>
                <Button className={classes.select} onClick={handleClickGestao}>Gestão</Button>
              </div>
              <img src={explanationDict[selected].img} className={classes.circleRec}></img>
            </div>
          </div>
        </div>
      );
    };
  
    export default SectionFour;