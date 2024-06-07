import React from 'react';
import Header from './Header';
import Blog from './Blog';
import Exhibition from './Exhibition';
import Honors from './Honors';
import Footer from "./Footer"
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
