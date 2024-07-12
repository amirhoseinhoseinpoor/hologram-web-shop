"use client";

import React from "react";
import LinkIcon from "@mui/icons-material/Link";
import Tooltip from "@mui/material/Tooltip";

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
      <LinkIcon
        onClick={copyUrlToClipboard}
        style={{ color: "#333333", padding: "4px", fontSize: "35px" }}
      />
    </Tooltip>
  );
};


export default CopyLinkButton;
