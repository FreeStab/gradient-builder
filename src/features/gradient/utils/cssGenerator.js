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
        // Cercle avec taille personnalisée
        sizeDeclaration = `${gradient.customSize.width}${gradient.customSize.unit}`;
      } else {
        // Ellipse avec largeur et hauteur différentes
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

  // Combiner les gradients avec la couleur de fond
  const backgroundValue =
    gradientStrings.length > 0
      ? `${gradientStrings.join(", ")}, ${backgroundColor}`
      : backgroundColor;

  return `background: ${backgroundValue};`;
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback pour les navigateurs plus anciens
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand("copy");
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
};
