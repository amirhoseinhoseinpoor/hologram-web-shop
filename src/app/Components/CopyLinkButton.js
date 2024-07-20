"use client";

import React from "react";
import LinkIcon from "@mui/icons-material/Link";
import Tooltip from "@mui/material/Tooltip";
import { Box } from "@mui/material";

// This component is explicitly for client-side usage
const CopyLinkButton = () => {
  const copyUrlToClipboard = async () => {
    try {
      const url = window.location.href; // Get the current URL
      await navigator.clipboard.writeText(url); // Use the Clipboard API to copy the URL
      alert("URL copied to clipboard!");
    } catch (err) {
      alert("Failed to copy URL: " + err);
    }
  };

  return (
    <Tooltip title="کپی پیوند">
      <Box
        sx={{
          width: 37,
          height: 37,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 1,
        }}
        onClick={copyUrlToClipboard}
        style={{ color: "#333333", padding: "4px", fontSize: "35px" }}
      >
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19.334 22H21.0572C24.5037 22 27.334 19.3055 27.334 16C27.334 12.7055 24.5152 10 21.0572 10H19.334"
            stroke="#333333"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.666 10H10.9517C7.48887 10 4.66602 12.6945 4.66602 16C4.66602 19.2945 7.48887 22 10.9517 22H12.666"
            stroke="#333333"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.334 16H20.6673"
            stroke="#333333"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Box>
    </Tooltip>
  );
};

export default CopyLinkButton;
