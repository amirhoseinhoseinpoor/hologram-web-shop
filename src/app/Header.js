'use client'
import style from "./Styles/Header.module.scss";

import Box from '@mui/material/Box';
import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CallIcon from '@mui/icons-material/Call';
import CloseIcon from '@mui/icons-material/Close';
import Fade from '@mui/material/Fade';


export default function Header() {
  const [activeLink, setActiveLink] = useState('خانه'); 
  const [isVisible, setIsVisible] = useState(true);
  const handleLinkClick = (linkTitle) => {
    setActiveLink(linkTitle);
    setIsVisible(false); 
    setTimeout(() => setIsVisible(true), 250); 
  };

  const mainItems = [
    {  link:'#home', title: 'خانه', subItems: [] },
    {  link:'#test2', title: 'محصولات', subItems: ['Product A', 'Product B', 'Product C'] },
    {  link:'#test3', title: 'معرفی هولگرام‌ها', subItems: [] },
    {  link:'#test4', title: 'ثبت سفارش', subItems: [] },
    {  link:'#test5', title: 'مقالات', subItems: [] },
    {  link:'#test6', title: 'ارتباط با ما', subItems: [] },
    {  link:'#test7', title: 'درباره‌ی ما', subItems: [] },

  ];
   
  const mainItemObject = mainItems.map((item , i)=> ({
    id : i,
    title : item.title ,
    link: item.link,
    subItems: item.subItems.map((item , i)=>({
      id : i,
      sub : item
    }))
    
  }))

  

    return(
        <section className={`${style.headermainbackground}  ${style.sectionheaderfix}`}>
     
            <Navbar expand="lg" collapseOnSelect className="bg-body-tertiary">
            <Container className={style.headerresponsivemain}>
              <div className="d-flex flex-row justify-content-between">
                   <Navbar.Brand href="#"><p className="ms-4">لوگو</p></Navbar.Brand>
                   {/* phone number descktop div */}
                   <div className={`d-none ${style.phonenumbercall} d-flex flex-row align-items-center`}>
                     <p><span>۰۲۱-</span>۶۶۹۷۱۴۰۲-۵</p>         
                        <div className={style.phonecallheadericon}>
                          <CallIcon></CallIcon>
                        </div>      
                   </div>
                    {/* navbar descktop */}
                    <div className={`d-lg-block d-none justify-content-between ${style.navbaritemheader}`}>
                     <Nav className="align-items-center ">
                       {mainItemObject.map((item) => (
                         <React.Fragment key={item.id}>
                           {item.subItems.length === 0 && (
                            <Fade key={item.title} in={isVisible} timeout={250}>
                              <Nav.Link               
                                className={`${activeLink === item.title ? style.active : style.noneactive}`}       
                                key={item.id} 
                                href={item.link}
                                onClick={() => handleLinkClick(item.title)}
                              >
                                {item.title}
                              </Nav.Link>
                            </Fade>
                             

                           )}
                           {item.subItems.length > 0 && (
                             <NavDropdown
                               className={`${activeLink === item.title ? style.active : style.noneactive}`}
                               key={item.id}
                               title={
                                 <React.Fragment key={item.id}>
                                   {item.title}
                                   <KeyboardArrowDownIcon key={item.id} />
                                 </React.Fragment>
                               }
                               id={`basic-nav-dropdown-${item.id}`} 
                             >
                               {item.subItems.map((subItem) => (
                                 <NavDropdown.Item key={subItem.id} href="#action/3.1">
                                   {subItem.sub}
                                 </NavDropdown.Item>
                               ))}
                             </NavDropdown>
                           )}
                         </React.Fragment>
                       ))}
                     </Nav>
                   </div>
              </div>

                  {/* iran logo */}
                 <div className="d-flex flex-row justify-content-between d-block d-lg-none">
                   <div className="d-lg-none">
                     <Navbar.Toggle className="basic-navbar-nav" aria-controls="basic-navbar-nav" />
                   </div>
                   <div className="d-lg-none">
                     <NavDropdown  title={
                         <>
                             <Box 
                             component="img"
                             sx={{
                                 
                                 maxHeight: 16, 
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



                     {/* navbar responsive */}
                  <div className="d-lg-none d-block">
                     <Navbar.Collapse className={`justify-content-between me-5 ${style.navbaritemheader}`} id="basic-navbar-nav">
                      <div className="d-flex flex-row justify-content-between">
                        <p className="mb-4">لوگو</p>
                        <Navbar.Toggle className="basic-navbar-nav" aria-controls="basic-navbar-nav" ><CloseIcon /></Navbar.Toggle>              
                      </div>
                        
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
                         {/* phone number */}
                         <div className={`d-none ${style.phonenumbercall} d-flex flex-row align-items-center mt-3`}>
                            <p><span>۰۲۱-</span>۶۶۹۷۱۴۰۲-۵</p>         
                               <div className={style.phonecallheadericon}>
                                 <CallIcon></CallIcon>
                               </div>      
                          </div>
                       </Nav>
                     </Navbar.Collapse>
                  </div>
                  
                
                  <div className="d-lg-block d-none">
                     <NavDropdown  title={
                         <>
                             <Box
                             component="img"
                             sx={{
                                 
                                 maxHeight: 16, 
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