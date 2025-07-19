import React, { useState, useEffect } from "react";
import { codeToHtml } from "shiki";
import "./SyntaxHighlighter.css";

const SyntaxHighlighter = ({ code, language = "css" }) => {
  const [highlightedCode, setHighlightedCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const highlightCode = async () => {
      try {
        setIsLoading(true);
        const html = await codeToHtml(code, {
          lang: language,
          theme: "dark-plus", // VS Code dark theme
        });
        setHighlightedCode(html);
      } catch (error) {
        console.error("Erreur lors du highlighting:", error);
        // Fallback: afficher le code sans highlighting
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
      <div className="syntax-highlighter loading">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    );
  }

  return (
    <div
      className="syntax-highlighter"
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  );
};

export default SyntaxHighlighter;
