import React from 'react';
import Header from './Components/Header';
import Blog from './HomeComponent/Blog';
import Exhibition from './HomeComponent/Exhibition';
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
          <Exhibition/>
          <Video/>
          <Blog/>
          <Honors/>
          <FAQ/>
         <Footer/>
       </ThemeProvider>
      </React.StrictMode>
    </main>
  );
}
