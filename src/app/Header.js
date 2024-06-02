'use client'
import "./Styles/Header.scss";

import Box from '@mui/material/Box';
import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CallIcon from '@mui/icons-material/Call';




export default function Header() {

  const mainItems = [
    {   title: 'خانه', subItems: [] },
    {   title: 'محصولات', subItems: ['Product A', 'Product B', 'Product C'] },
    {   title: 'معرفی هولگرام‌ها', subItems: [] },
    {   title: 'ثبت سفارش', subItems: [] },
    {   title: 'مقالات', subItems: [] },
    {   title: 'ارتباط با ما', subItems: [] },
    {   title: 'درباره‌ی ما', subItems: [] },

  ];
   
  const mainItemObject = mainItems.map((item , i)=> ({
    id : i,
    title : item.title ,
    subItems: item.subItems.map((item , i)=>({
      id : i,
      sub : item
    }))
    
  }))

    return(
        <section className="header-main-background  section-header-fix">
     
            <Navbar expand="lg" className="bg-body-tertiary">
            <Container className="header-responsive-main">
              <div className="d-flex flex-row justify-content-between">
               <Navbar.Brand href="#"><p className="m-0">لوگو</p></Navbar.Brand>
               <div className="d-none phone-number-call-header-icon d-flex flex-row align-items-center">
                 <p><span>۰۲۱-</span>۶۶۹۷۱۴۰۲-۵</p>
                 
                    <div className="phone-call-header-icon ">
                      <CallIcon></CallIcon>
                    </div>
                  
               </div>
              </div>
              
              <div className="d-flex flex-row justify-content-between">
                   <div>
                     <Navbar.Toggle className="basic-navbar-nav" aria-controls="basic-navbar-nav" />

                   </div>
                   <div className="d-lg-none">
                     <NavDropdown  title={
                         <>
                             <Box className="f-c-b"
                             component="img"
                             sx={{
                                 
                                 maxHeight: 16, // Set a maximum height (optional)
                                 objectFit: 'cover',
                                 aspectRatio : 1.7
                             }}
                             alt="iran"
                             src="/HomeImages/iran-logo.png"
                             />
                             <KeyboardArrowDownIcon className="mb-2"></KeyboardArrowDownIcon>
                         </>
                        
                       }
                        id="basic-nav-dropdown">
                         
                    </NavDropdown>
                   </div>
                  </div>
                  
                  <Navbar.Collapse className="justify-content-between me-5 navbar-item-header" id="basic-navbar-nav">
                    <Nav className="align-items-center">
    
                      
                      {mainItemObject.map((item) => (<React.Fragment key={item.id}>
    
                        {item.subItems.length == 0 && (<React.Fragment key={item.id}>
                          <Nav.Link key={item.id} href="#home">{item.title}</Nav.Link>
                        </React.Fragment>)}
                        
                        
                        {item.subItems.length > 0 && (<React.Fragment key={item.id}>
                          
                            <NavDropdown key={item.id} title={
                              <React.Fragment key={item.id}>
                                {item.title}
                                <KeyboardArrowDownIcon key={item.id}></KeyboardArrowDownIcon> 
                              </React.Fragment>
                              
                              } id="basic-nav-dropdown">
                          
                              {item.subItems.map((subItem)=>(<React.Fragment key={subItem.id}>
                                
                               
                               <NavDropdown.Item  key={subItem.id} href="#action/3.1">{subItem.sub}</NavDropdown.Item>
                              </React.Fragment>))}         
                                                
                            </NavDropdown> 
                           
                         
                        </React.Fragment>)}
                  
                      </React.Fragment>))}
                    </Nav>
                  </Navbar.Collapse>
                
                  <div className="d-lg-block d-none">
                     <NavDropdown  title={
                         <>
                             <Box className="f-c-b"
                             component="img"
                             sx={{
                                 
                                 maxHeight: 16, // Set a maximum height (optional)
                                 objectFit: 'cover',
                                 aspectRatio : 1.7
                             }}
                             alt="iran"
                             src="/HomeImages/iran-logo.png"
                             />
                             <KeyboardArrowDownIcon className="mb-2"></KeyboardArrowDownIcon>
                         </>
                        
                       }
                        id="basic-nav-dropdown">
                         
                    </NavDropdown>
                   </div>
                 
                           
   
                  
              
              
             
              
            </Container>
          </Navbar>
    
        </section>
    )
}