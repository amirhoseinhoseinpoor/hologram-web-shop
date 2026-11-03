"use client";

import React, { useState } from "react";
import LinkIcon from "@mui/icons-material/Link";
import CheckIcon from "@mui/icons-material/Check";

const CopyLinkButton = () => {
  const [status, setStatus] = useState("idle");

  const copyUrlToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    setTimeout(() => setStatus("idle"), 2500);
  };

  return (
    <button
      type="button"
      className="az-btn az-btn--outline az-btn--sm"
      onClick={copyUrlToClipboard}
      aria-live="polite"
    >
      {status === "copied" ? (
        <CheckIcon aria-hidden="true" />
      ) : (
        <LinkIcon aria-hidden="true" />
      )}
      {status === "copied"
        ? "پیوند کپی شد"
        : status === "failed"
          ? "کپی انجام نشد"
          : "کپی پیوند"}
    </button>
  );
};

export default CopyLinkButton;
