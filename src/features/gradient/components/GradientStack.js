import React from 'react';
import GradientStackItem from './GradientStackItem';
import './GradientStack.css';

const GradientStack = ({ gradients, selectedGradient, onSelect, onMove, onDelete }) => {
  return (
    <div className="gradient-stack">
      <h3>Gradient Stack</h3>
      <div className="stack-info">
        <p>Drag to reorder • Top gradients render on top</p>
      </div>
      
      <div className="stack-list">
        {gradients.map((gradient, index) => (
          <GradientStackItem
            key={gradient.id}
            gradient={gradient}
            index={index}
            isSelected={selectedGradient?.id === gradient.id}
            onSelect={onSelect}
            onMove={onMove}
            onDelete={onDelete}
          />
        ))}
        
        {gradients.length === 0 && (
          <div className="empty-stack">
            <p>No gradients yet</p>
            <p>Add a gradient to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GradientStack;
