import { useMemo, useState, useEffect } from "react";
import { generateAllGradientsCSS } from "../utils/cssGenerator";
import { SyntaxHighlighter } from "../../../shared";
import "./GradientCanvas.css";

const GradientCanvas = ({ gradients, backgroundColor = "#ffffff" }) => {
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
          let isSquare =
            gradient.customSize.width === gradient.customSize.height;
          if (isSquare) {
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

    // Combine gradients with background color
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

  return (
    <div className="gradient-canvas" style={backgroundStyle}>
      <div className="canvas-overlay">
        <div className="canvas-info">
          <SyntaxHighlighter code={gradientCssCode} language="css" />
        </div>
      </div>
    </div>
  );
};

export default GradientCanvas;
