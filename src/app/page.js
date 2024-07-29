import React from 'react';
import Banner from './eachPageComponent/HomeComponent/Banner'
import PurchaseProcessSteps from './eachPageComponent/HomeComponent/PurchaseProcessSteps'
import Blog from './eachPageComponent/HomeComponent/Blog';
import Exhibition from './eachPageComponent/HomeComponent/Exhibition';
import Advantages from './Components/Advantages';
import IntroSecure from './eachPageComponent/HomeComponent/Intro-Secure';
import IntroHologram from './eachPageComponent/HomeComponent/Intro-Hologram';
import Video from './eachPageComponent/HomeComponent/Video'
import Honors from './eachPageComponent/HomeComponent/Honors';
import FAQ from './Components/FAQ'
import Header from './Components/Header';
import Footer from './Components/Footer';


import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; 

export default function Home() {
  return (
    <main>
      <React.StrictMode>
       <ThemeProvider theme={theme}>
        <Header/>
         <Banner/>
         <PurchaseProcessSteps/>
         <IntroSecure/>
         <IntroHologram/>
         <Honors/>
         <Video/>
         <Exhibition/>
         <Advantages/>
         <FAQ/>
         <Blog/>
         <Footer/>
       </ThemeProvider>
      </React.StrictMode>
    </main>
  );
}


