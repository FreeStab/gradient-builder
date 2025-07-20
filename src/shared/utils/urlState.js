// URL state management utilities for gradient configuration sharing

// Compress gradient data by removing unnecessary properties and using shorter keys
const compressGradientData = (gradients, backgroundColor) => {
  const compressed = {
    bg: backgroundColor,
    g: gradients.map(gradient => ({
      i: gradient.id,
      t: gradient.type === 'linear' ? 'l' : 'r',
      c: gradient.colors.map(color => ({
        c: color.color,
        s: color.stop
      })),
      a: gradient.angle,
      sz: gradient.size,
      cs: gradient.customSize ? {
        w: gradient.customSize.width,
        h: gradient.customSize.height,
        u: gradient.customSize.unit
      } : undefined,
      p: gradient.position ? {
        x: gradient.position.x,
        y: gradient.position.y
      } : undefined,
      o: gradient.opacity
    }))
  };
  return compressed;
};

// Decompress gradient data back to full format
const decompressGradientData = (compressed) => {
  const backgroundColor = compressed.bg || '#ffffff';
  const gradients = (compressed.g || []).map(g => ({
    id: g.i,
    type: g.t === 'l' ? 'linear' : 'radial',
    colors: g.c.map(color => ({
      color: color.c,
      stop: color.s
    })),
    angle: g.a || 0,
    size: g.sz || 'farthest-corner',
    customSize: g.cs ? {
      width: g.cs.w,
      height: g.cs.h,
      unit: g.cs.u
    } : { width: 50, height: 50, unit: '%' },
    position: g.p ? {
      x: g.p.x,
      y: g.p.y
    } : { x: 50, y: 50 },
    opacity: g.o !== undefined ? g.o : 1
  }));
  
  return { gradients, backgroundColor };
};

// Encode gradient configuration to URL-safe string
export const encodeGradientState = (gradients, backgroundColor) => {
  try {
    const compressed = compressGradientData(gradients, backgroundColor);
    const jsonString = JSON.stringify(compressed);
    
    // Use base64 encoding for URL safety
    const encoded = btoa(encodeURIComponent(jsonString));
    return encoded;
  } catch (error) {
    console.error('Error encoding gradient state:', error);
    return null;
  }
};

// Decode gradient configuration from URL string
export const decodeGradientState = (encodedString) => {
  try {
    if (!encodedString) return null;
    
    const jsonString = decodeURIComponent(atob(encodedString));
    const compressed = JSON.parse(jsonString);
    
    return decompressGradientData(compressed);
  } catch (error) {
    console.error('Error decoding gradient state:', error);
    return null;
  }
};

// Get current URL with gradient state
export const getShareableUrl = (gradients, backgroundColor) => {
  const encoded = encodeGradientState(gradients, backgroundColor);
  if (!encoded) return window.location.origin + window.location.pathname;
  
  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.set('config', encoded);
  return url.toString();
};

// Get gradient state from current URL
export const getStateFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const config = urlParams.get('config');
  return decodeGradientState(config);
};

// Update URL without page reload
export const updateUrlWithState = (gradients, backgroundColor) => {
  const encoded = encodeGradientState(gradients, backgroundColor);
  const url = new URL(window.location);
  
  if (encoded) {
    url.searchParams.set('config', encoded);
  } else {
    url.searchParams.delete('config');
  }
  
  // Update URL without reloading the page
  window.history.replaceState({}, '', url.toString());
};
