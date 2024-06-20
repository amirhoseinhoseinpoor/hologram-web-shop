import React from 'react';
import Header from './Components/Header';
import Banner from './HomeComponent/Banner'
import PurchaseProcessSteps from './HomeComponent/PurchaseProcessSteps'
import Blog from './HomeComponent/Blog';
import Exhibition from './HomeComponent/Exhibition';
import IntroSecure from './HomeComponent/Intro-Secure';
import Video from './HomeComponent/Video'
import Honors from './HomeComponent/Honors';
import FAQ from './HomeComponent/FAQ'
import Footer from "./Components/Footer"




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
         <Honors/>
         <Video/>
         <Exhibition/>
         <FAQ/>
         <Blog/>
         <Footer/>
       </ThemeProvider>
      </React.StrictMode>
    </main>
  );
}
