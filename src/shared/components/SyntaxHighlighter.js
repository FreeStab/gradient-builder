import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { codeToHtml } from "shiki";
import { copyToClipboard } from "../../shared";
import "./SyntaxHighlighter.css";

const SyntaxHighlighter = ({ code, language = "css" }) => {
  const [highlightedCode, setHighlightedCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [copyStatus, setCopyStatus] = useState(false);

  const handleCopyButtonClick = async () => {
    const success = await copyToClipboard(code);

    if (success) {
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 1500);
    }
  };

  useEffect(() => {
    const highlightCode = async () => {
      try {
        setIsLoading(true);
        const html = await codeToHtml(code, {
          lang: language,
          theme: "dark-plus",
        });
        setHighlightedCode(html);
      } catch (error) {
        console.error("Error during highlighting:", error);
        setHighlightedCode(`<pre><code>${code}</code></pre>`);
      } finally {
        setIsLoading(false);
      }
    };

    if (code) {
      highlightCode();
    }
  }, [code, language]);

  if (isLoading) {
    return (
      <div className="syntax-highlighter__code loading">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    );
  }

  return (
    <div className="syntax-highlighter">
      <div
        className="syntax-highlighter__code"
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
      <button
        className="copy-code-button"
        onClick={handleCopyButtonClick}
        title="Copy all gradients CSS"
      >
        <Icon
          icon={copyStatus ? "uil:check-circle" : "uil:copy"}
          width={24}
          height={24}
        ></Icon>
      </button>
    </div>
  );
};

export default SyntaxHighlighter;
