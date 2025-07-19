import React, { useState } from 'react';
import ColorPicker from './ColorPicker';
import { generateGradientCSS, copyToClipboard } from '../utils/cssGenerator';
import './GradientControls.css';

const GradientControls = ({ gradient, onUpdate }) => {
  const [copyStatus, setCopyStatus] = useState('');

  const updateColor = (index, color) => {
    const newColors = [...gradient.colors];
    newColors[index] = { ...newColors[index], color };
    onUpdate({ colors: newColors });
  };

  const updateColorStop = (index, stop) => {
    const newColors = [...gradient.colors];
    newColors[index] = { ...newColors[index], stop: Math.max(0, Math.min(100, stop)) };
    onUpdate({ colors: newColors });
  };

  const addColor = () => {
    const newColors = [...gradient.colors];
    // Find a good position for the new color
    const lastStop = newColors[newColors.length - 1].stop;
    const newStop = Math.min(100, lastStop + 20);
    newColors.push({ color: 'rgba(255, 255, 255, 1)', stop: newStop });
    onUpdate({ colors: newColors });
  };

  const removeColor = (index) => {
    if (gradient.colors.length > 2) {
      const newColors = gradient.colors.filter((_, i) => i !== index);
      onUpdate({ colors: newColors });
    }
  };

  const sortColors = () => {
    const sortedColors = [...gradient.colors].sort((a, b) => a.stop - b.stop);
    onUpdate({ colors: sortedColors });
  };

  const handleCopyCSS = async () => {
    const cssCode = generateGradientCSS(gradient);
    const success = await copyToClipboard(cssCode);
    
    if (success) {
      setCopyStatus('Copié !');
      setTimeout(() => setCopyStatus(''), 2000);
    } else {
      setCopyStatus('Erreur');
      setTimeout(() => setCopyStatus(''), 2000);
    }
  };

  const getSizeOptions = () => {
    if (gradient.type === 'radial') {
      return [
        { value: 'closest-side', label: 'Closest Side' },
        { value: 'closest-corner', label: 'Closest Corner' },
        { value: 'farthest-side', label: 'Farthest Side' },
        { value: 'farthest-corner', label: 'Farthest Corner' },
        { value: 'custom', label: 'Custom Size' }
      ];
    } else {
      return [
        { value: 'cover', label: 'Cover' },
        { value: 'contain', label: 'Contain' },
        { value: 'auto', label: 'Auto' },
        { value: 'custom', label: 'Custom Size' }
      ];
    }
  };

  const handleCustomSizeChange = (property, value) => {
    const newCustomSize = { ...gradient.customSize, [property]: value };
    onUpdate({ customSize: newCustomSize });
  };

  return (
    <div className="gradient-controls">
      <div className="controls-header">
        <h3>Gradient Controls</h3>
        <button 
          className="copy-css-btn"
          onClick={handleCopyCSS}
          title="Copier le CSS du gradient"
        >
          {copyStatus || '📋 CSS'}
        </button>
      </div>
      
      <div className="control-group">
        <label>Type</label>
        <select 
          value={gradient.type} 
          onChange={(e) => onUpdate({ type: e.target.value })}
        >
          <option value="linear">Linear</option>
          <option value="radial">Radial</option>
        </select>
      </div>

      <div className="control-group">
        <label>Size</label>
        <select 
          value={gradient.size} 
          onChange={(e) => onUpdate({ size: e.target.value })}
        >
          {getSizeOptions().map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {gradient.size === 'custom' && (
        <div className="custom-size-controls">
          <div className="size-row">
            <div className="size-input-group">
              <label>Width: {gradient.customSize.width}</label>
              <input
                type="range"
                min="1"
                max="200"
                value={gradient.customSize.width}
                onChange={(e) => handleCustomSizeChange('width', parseInt(e.target.value))}
              />
            </div>
            <div className="size-input-group">
              <label>Height: {gradient.customSize.height}</label>
              <input
                type="range"
                min="1"
                max="200"
                value={gradient.customSize.height}
                onChange={(e) => handleCustomSizeChange('height', parseInt(e.target.value))}
              />
            </div>
          </div>
          <div className="unit-control">
            <label>Unit</label>
            <select 
              value={gradient.customSize.unit} 
              onChange={(e) => handleCustomSizeChange('unit', e.target.value)}
            >
              <option value="%">Percentage (%)</option>
              <option value="px">Pixels (px)</option>
              <option value="em">Em (em)</option>
              <option value="rem">Rem (rem)</option>
              <option value="vw">Viewport Width (vw)</option>
              <option value="vh">Viewport Height (vh)</option>
            </select>
          </div>
        </div>
      )}

      {gradient.type === 'linear' && (
        <div className="control-group">
          <label>Angle: {gradient.angle}°</label>
          <input
            type="range"
            min="0"
            max="360"
            value={gradient.angle}
            onChange={(e) => onUpdate({ angle: parseInt(e.target.value) })}
          />
        </div>
      )}

      {gradient.type === 'radial' && (
        <>
          <div className="control-group">
            <label>Center X: {gradient.position.x}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={gradient.position.x}
              onChange={(e) => onUpdate({ 
                position: { ...gradient.position, x: parseInt(e.target.value) } 
              })}
            />
          </div>
          <div className="control-group">
            <label>Center Y: {gradient.position.y}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={gradient.position.y}
              onChange={(e) => onUpdate({ 
                position: { ...gradient.position, y: parseInt(e.target.value) } 
              })}
            />
          </div>
        </>
      )}

      <div className="control-group">
        <label>Opacity: {Math.round(gradient.opacity * 100)}%</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={gradient.opacity}
          onChange={(e) => onUpdate({ opacity: parseFloat(e.target.value) })}
        />
      </div>

      <div className="color-section">
        <div className="color-header">
          <label>Color Stops</label>
          <div className="color-actions">
            <button 
              className="sort-colors-btn"
              onClick={sortColors}
              title="Sort colors by position"
            >
              ↕ Sort
            </button>
            <button 
              className="add-color-btn"
              onClick={addColor}
              disabled={gradient.colors.length >= 5}
            >
              + Add Color
            </button>
          </div>
        </div>
        
        <div className="color-list">
          {gradient.colors.map((colorStop, index) => (
            <div key={index} className="color-stop-item">
              <ColorPicker
                color={colorStop.color}
                onChange={(newColor) => updateColor(index, newColor)}
              />
              <div className="color-stop-info">
                <span className="color-value">{colorStop.color}</span>
                <div className="stop-control">
                  <label>Position: {colorStop.stop}%</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={colorStop.stop}
                    onChange={(e) => updateColorStop(index, parseInt(e.target.value))}
                    className="stop-slider"
                  />
                </div>
              </div>
              {gradient.colors.length > 2 && (
                <button
                  className="remove-color-btn"
                  onClick={() => removeColor(index)}
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradientControls;
