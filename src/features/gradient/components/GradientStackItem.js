import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import './GradientStackItem.css';

const ItemTypes = {
  GRADIENT: 'gradient'
};

const GradientStackItem = ({ gradient, index, isSelected, onSelect, onMove, onDelete }) => {
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.GRADIENT,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.GRADIENT,
    item: () => {
      return { id: gradient.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const getGradientPreview = () => {
    const colorStops = gradient.colors.map(colorStop => 
      `${colorStop.color} ${colorStop.stop}%`
    ).join(', ');
    
    if (gradient.type === 'linear') {
      return `linear-gradient(${gradient.angle}deg, ${colorStops})`;
    } else {
      let sizeDeclaration = '';
      
      if (gradient.size === 'custom') {
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
  };

  return (
    <div
      ref={ref}
      className={`stack-item ${isSelected ? 'selected' : ''} ${isDragging ? 'dragging' : ''}`}
      onClick={() => onSelect(gradient)}
      data-handler-id={handlerId}
    >
      <div className="drag-handle">
        <div className="drag-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      
      <div className="gradient-preview" style={{ background: getGradientPreview() }}>
        <div className="gradient-overlay"></div>
      </div>
      
      <div className="gradient-info">
        <div className="gradient-type">
          {gradient.type === 'linear' ? 'Linear' : 'Radial'}
        </div>
        <div className="gradient-details">
          {gradient.type === 'linear' ? `${gradient.angle}°` : `${gradient.position.x}%, ${gradient.position.y}%`}
        </div>
      </div>
      
      <button
        className="delete-button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(gradient.id);
        }}
      >
        ×
      </button>
    </div>
  );
};

export default GradientStackItem;
