"use client";
import Hoc from "../Components/HOCcomponent";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {banner} from '../Store/slice'
// import { updateBannerContent } from './thunks'; // Import your updateBannerContent thunk
const AdminPanel = () => {
  const dispatch = useDispatch();
  const bannerV = useSelector(banner); // Access banner data from Redux store
  const [bannerImage, setBannerImage] = useState(bannerV?.image || ""); // Set initial image state
  const [bannerText, setBannerText] = useState(bannerV?.text || ""); // Set initial text state

  const handleImageChange = (event) => {
    const newImage = event.target.files[0];
    setBannerImage(newImage);
  };

  const handleTextChange = (event) => {
    setBannerText(event.target.value);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", bannerImage); // Append image file
    formData.append("text", bannerText); // Append banner text
    await dispatch(updateBannerContent(formData)); // Dispatch update thunk
  };
  return (
    <section>
      <div className="admin-panel">
        <div className="main-content">
          {/* Your main admin panel content goes here */}
        </div>
        <div className="sidebar">
          <div className="settings">
            <h2>Settings</h2>
            <button onClick={() => console.log("Settings Clicked")}>
              {/* Add functionality for specific settings */}
            </button>
          </div>
          <div className="banner">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hoc(AdminPanel);
