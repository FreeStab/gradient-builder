export const generateGradientCSS = (gradient) => {
  const colorStops = gradient.colors
    .map((colorStop) => `${colorStop.color} ${colorStop.stop}%`)
    .join(", ");

  if (gradient.type === "linear") {
    return `background: linear-gradient(${gradient.angle}deg, ${colorStops});`;
  } else {
    let sizeDeclaration = "";

    if (gradient.size === "custom") {
      if (gradient.customSize.width === gradient.customSize.height) {
        // Circle with custom size
        sizeDeclaration = `${gradient.customSize.width}${gradient.customSize.unit}`;
      } else {
        // Ellipse with different width and height
        sizeDeclaration = `${gradient.customSize.width}${gradient.customSize.unit} ${gradient.customSize.height}${gradient.customSize.unit}`;
      }
    } else {
      sizeDeclaration = `${gradient.size}`;
    }

    return `background: radial-gradient(${sizeDeclaration} at ${gradient.position.x}% ${gradient.position.y}%, ${colorStops});`;
  }
};

export const generateAllGradientsCSS = (
  gradients,
  backgroundColor = "#ffffff"
) => {
  if (gradients.length === 0) {
    return `background: ${backgroundColor};`;
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

  // Combine gradients with background color
  const backgroundValue =
    gradientStrings.length > 0
      ? `${gradientStrings.join(", ")}, ${backgroundColor}`
      : backgroundColor;

  return `background: ${backgroundValue};`;
};
