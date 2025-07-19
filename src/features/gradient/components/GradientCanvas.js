import { useMemo, useState, useEffect } from "react";
import {
  generateAllGradientsCSS,
  copyToClipboard,
} from "../utils/cssGenerator";
import { Icon } from "@iconify/react";
import { SyntaxHighlighter } from "../../../shared";
import "./GradientCanvas.css";

const GradientCanvas = ({ gradients, backgroundColor = "#ffffff" }) => {
  const [copyStatus, setCopyStatus] = useState("");
  const [gradientCssCode, setGradientCssCode] = useState("");

  const backgroundStyle = useMemo(() => {
    if (gradients.length === 0) {
      return { backgroundColor: backgroundColor };
    }

    const gradientStrings = gradients.map((gradient) => {
      const colorStops = gradient.colors
        .map((colorStop) => `${colorStop.color} ${colorStop.stop}%`)
        .join(", ");

      if (gradient.type === "linear") {
        return `linear-gradient(${gradient.angle}deg, ${colorStops})`;
      } else {
        let sizeDeclaration = "";

        if (gradient.size === "custom") {
          if (gradient.customSize.width === gradient.customSize.height) {
            sizeDeclaration = `${gradient.customSize.width}${gradient.customSize.unit}`;
          } else {
            sizeDeclaration = `${gradient.customSize.width}${gradient.customSize.unit} ${gradient.customSize.height}${gradient.customSize.unit}`;
          }
        } else {
          sizeDeclaration = `${gradient.size}`;
        }

        return `radial-gradient(${sizeDeclaration} at ${gradient.position.x}% ${gradient.position.y}%, ${colorStops})`;
      }
    });

    // Combiner les gradients avec la couleur de fond
    const backgroundValue =
      gradientStrings.length > 0
        ? `${gradientStrings.join(", ")}, ${backgroundColor}`
        : backgroundColor;

    return {
      background: backgroundValue,
    };
  }, [gradients, backgroundColor]);

  useEffect(() => {
    setGradientCssCode(generateAllGradientsCSS(gradients, backgroundColor));
  }, [gradients, backgroundColor]);

  const handleCopyAllCSS = async () => {
    const cssCode = gradientCssCode;
    const success = await copyToClipboard(cssCode);

    if (success) {
      setCopyStatus("Copié !");
      setTimeout(() => setCopyStatus(""), 2000);
    } else {
      setCopyStatus("Erreur");
      setTimeout(() => setCopyStatus(""), 2000);
    }
  };

  return (
    <div className="gradient-canvas" style={backgroundStyle}>
      <div className="canvas-overlay">
        <div className="canvas-info">
          <h3>Gradient Preview</h3>
          <SyntaxHighlighter code={gradientCssCode} language="css" />
          <button
            className="copy-all-css-btn"
            onClick={handleCopyAllCSS}
            title="Copier le CSS de tous les gradients"
          >
            <Icon icon="uil:copy"></Icon>
            {copyStatus || "CSS"}
          </button>
          <p>
            {gradients.length} gradient{gradients.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GradientCanvas;
