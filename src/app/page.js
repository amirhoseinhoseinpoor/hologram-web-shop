import React from 'react';
import Header from './Components/Header';
import Blog from './HomeComponent/Blog';
import Exhibition from './HomeComponent/Exhibition';
import Honors from './HomeComponent/Honors';
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
         <Blog/>
         <Honors/>
         <Footer/>
       </ThemeProvider>
      </React.StrictMode>
    </main>
  );
}
