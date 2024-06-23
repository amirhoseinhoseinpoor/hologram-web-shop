"use client";
import Hoc from "../Components/HOCcomponent";
import style from "./Adminstyle.module.scss";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { banner } from "../Store/slice";
import { updateBannerContent } from "../Store/thunks.js";
const AdminPanel = () => {
  const dispatch = useDispatch();
  const bannerV = useSelector(banner); // Access banner data from Redux store
  const [bannerImage, setBannerImage] = useState(bannerV?.image || ""); // Set initial image state
  const [bannerText, setBannerText] = useState(bannerV?.text || ""); // Set initial text state

  // image change
  const handleImageChange = (event) => {
    const newImage = event.target.files[0];
    setBannerImage(newImage);
  };

  // text change
  const handleTextChange = (event) => {
    setBannerText(event.target.value);
  };

  // form submit
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", bannerImage); // Append image file
    formData.append("text", bannerText); // Append banner text
    await dispatch(updateBannerContent(formData)); // Dispatch update thunk
  };

  return (
    
    <section className="h-100">
      <aside className={`${style.sidebar}`}>
       
        
          
             <Tabs
                  defaultActiveKey="Doshbord"
                  id="uncontrolled-tab-example"
                   className={`${style.sidebarMain}`}
                >
                
                 <Tab eventKey="Doshbord" title="بنر"> 
                   Tab content for Profile
                 </Tab>
              
               <Tab eventKey="home" title="تنظیمات">
                     Tab content for Home
               </Tab>
           
            </Tabs>
          
       
       
          {/* <div className="banner">
            <h2>Banner</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="bannerImage">Image:</label>
              <input
                type="file"
                id="bannerImage"
                onChange={handleImageChange}
              />
              <label htmlFor="bannerText">Text:</label>
              <textarea
                id="bannerText"
                value={bannerText}
                onChange={handleTextChange}
              />
              <button type="submit">Update Banner</button>
            </form>
          </div> */}
      </aside>
    </section>
  );
};
AdminPanel.displayName = 'AdminPanel';
export default Hoc(AdminPanel);
