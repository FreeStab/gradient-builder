import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { copyToClipboard } from "../utils/clipboard";
import { getShareableUrl } from "../utils/urlState";
import "./ShareButton.css";

const ShareButton = ({ gradients, backgroundColor }) => {
  const [copyStatus, setCopyStatus] = useState(false);

  const handleShare = async () => {
    const shareUrl = getShareableUrl(gradients, backgroundColor);
    const success = await copyToClipboard(shareUrl);

    if (success) {
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 2000);
    }
  };

  return (
    <button
      className="share-button"
      onClick={handleShare}
      title="Copy shareable link"
    >
      <Icon
        icon={copyStatus ? "uil:check-circle" : "uil:share"}
        width={16}
        height={16}
      />
      {copyStatus ? "Copied!" : "Share"}
    </button>
  );
};

export default ShareButton;
