import React, { useCallback, useMemo } from "react";
import "./ColorPicker.css";

const ColorPicker = ({ color, onChange }) => {
  // Convert color to RGBA format if necessary
  const parseColor = useCallback((colorValue) => {
    if (colorValue.startsWith("rgba(")) {
      const matches = colorValue.match(
        /rgba\((\d+),\s*(\d+),\s*(\d+),\s*([0-9.]+)\)/
      );
      if (matches) {
        return {
          r: parseInt(matches[1]),
          g: parseInt(matches[2]),
          b: parseInt(matches[3]),
          a: parseFloat(matches[4]),
        };
      }
    } else if (colorValue.startsWith("rgb(")) {
      const matches = colorValue.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (matches) {
        return {
          r: parseInt(matches[1]),
          g: parseInt(matches[2]),
          b: parseInt(matches[3]),
          a: 1,
        };
      }
    } else if (colorValue.startsWith("#")) {
      const hex = colorValue.slice(1);
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      return { r, g, b, a: 1 };
    }
    return { r: 255, g: 255, b: 255, a: 1 };
  }, []);

  const rgba = useMemo(() => parseColor(color), [color, parseColor]);

  const hexColor = useMemo(() => {
    const toHex = (n) => n.toString(16).padStart(2, "0");
    return `#${toHex(rgba.r)}${toHex(rgba.g)}${toHex(rgba.b)}`;
  }, [rgba]);

  const handleColorChange = useCallback(
    (e) => {
      const hex = e.target.value;
      const r = parseInt(hex.substr(1, 2), 16);
      const g = parseInt(hex.substr(3, 2), 16);
      const b = parseInt(hex.substr(5, 2), 16);
      onChange(`rgba(${r}, ${g}, ${b}, ${rgba.a})`);
    },
    [rgba.a, onChange]
  );

  const handleAlphaChange = useCallback(
    (e) => {
      const alpha = parseFloat(e.target.value);
      onChange(`rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${alpha})`);
    },
    [rgba.r, rgba.g, rgba.b, onChange]
  );

  return (
    <div className="color-picker">
      <div className="color-picker-main">
        <input
          type="color"
          value={hexColor}
          onChange={handleColorChange}
          className="color-input"
        />
        <div className="color-preview" style={{ backgroundColor: color }} />
      </div>
      <div className="alpha-control">
        <label>Alpha: {Math.round(rgba.a * 100)}%</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={rgba.a}
          onChange={handleAlphaChange}
          className="alpha-slider"
        />
      </div>
    </div>
  );
};

export default ColorPicker;
