import React, {useState} from "react";
import Header from '../modules/LandingPage/new/Header';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import SectionOne from '../modules/LandingPage/new/SectionOne';
import SectionTwo from '../modules/LandingPage/new/SectionTwo';
import SectionThree from '../modules/LandingPage/new/SectionThree';
import SectionFour from '../modules/LandingPage/new/SectionFour';
import SectionFive from '../modules/LandingPage/new/SectionFive';
import SectionSix from '../modules/LandingPage/new/SectionSix';

const useStyles = makeStyles((theme) => ({
  
}));

const LadingPage = () => {
  const classes = useStyles();
  
   return (
    <React.Fragment>
      <Header />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
      <SectionSix />
    </React.Fragment>
  );
};

export default LadingPage;