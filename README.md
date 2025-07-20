# Gradient Background Builder

A React application that allows users to create and configure beautiful gradient backgrounds with an intuitive drag-and-drop interface.

🚀 **[Live Demo](https://FreeStab.github.io/gradient-builder)** - Try it now!

## Features

- **Create Gradients**: Add linear and radial gradients to your canvas
- **Background Color Control**: Set a custom background color for transparent gradients
- **Drag and Drop**: Reorder gradients in the stack by dragging them
- **Color Configuration**: Multiple color pickers to create complex gradients
- **Real-time Preview**: See your gradient changes instantly
- **CSS Generation**: Copy CSS code for individual gradients or the complete background
- **URL Sharing**: Share gradient configurations via URL with automatic encoding
- **Offline Support**: Full Progressive Web App (PWA) functionality - works without internet
- **Syntax Highlighting**: Beautiful CSS code display with VS Code theme
- **Gradient Controls**:
  - Adjust angle for linear gradients
  - Control center position for radial gradients
  - Modify opacity for layering effects
  - Custom gradient sizes with multiple units (%, px, em, rem, vw, vh)
  - Add multiple color stops per gradient
- **Responsive Design**: Modern, dark-themed interface
- **Social Media Ready**: Open Graph meta tags for rich link previews

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in your browser

## File Structure

The project includes additional PWA and SEO files:

```
public/
├── index.html                 # Main HTML with Open Graph meta tags
├── site.webmanifest          # PWA manifest for app installation
├── sw.js                     # Service worker for offline functionality
├── browserconfig.xml         # Windows tile configuration
├── robots.txt                # Search engine crawling rules
├── sitemap.xml               # Site structure for SEO
├── offline.html              # Fallback page for offline navigation
└── [various icon files]      # Favicons and app icons for all platforms
```

## Usage

1. **Add a Gradient**: Click "Linear Gradient" or "Radial Gradient" to add a new gradient
2. **Set Background Color**: Use the background color picker to set a base color for transparent gradients
3. **Select a Gradient**: Click on any gradient in the stack to select and edit it
4. **Reorder Gradients**: Drag gradients up or down in the stack to change their layering
5. **Edit Colors**: Use the color pickers to change gradient colors and adjust transparency
6. **Adjust Properties**: Modify angle, position, size, and opacity using the controls
7. **Copy CSS**: Click the CSS button to copy the generated CSS code to your clipboard
8. **Share Configuration**: Click the "Share" button to copy a shareable URL with your gradient setup
9. **Work Offline**: The app works completely offline - create gradients anywhere!
10. **Delete Gradients**: Click the "×" button to remove unwanted gradients

## Project Structure

```
src/
├── features/
│   └── gradient/
│       ├── components/
│       │   ├── GradientCanvas.js      # Main canvas displaying the gradient
│       │   ├── GradientCanvas.css     # Canvas-specific styles
│       │   ├── GradientControls.js    # Control panel for editing gradients
│       │   ├── GradientControls.css   # Controls panel styles
│       │   ├── GradientStack.js       # Stack of gradients with drag-and-drop
│       │   ├── GradientStack.css      # Stack styles
│       │   ├── GradientStackItem.js   # Individual gradient item in the stack
│       │   ├── GradientStackItem.css  # Stack item styles
│       │   ├── ColorPicker.js         # Color input component with alpha support
│       │   └── ColorPicker.css        # Color picker styles
│       ├── utils/
│       │   └── cssGenerator.js        # CSS generation utilities
│       └── index.js                   # Gradient feature exports
├── shared/
│   ├── components/
│   │   ├── SyntaxHighlighter.js       # CSS syntax highlighter
│   │   ├── SyntaxHighlighter.css      # Syntax highlighter styles
│   │   ├── ShareButton.js             # URL sharing component
│   │   ├── ShareButton.css            # Share button styles
│   │   ├── OfflineIndicator.js        # Online/offline status indicator
│   │   └── OfflineIndicator.css       # Offline indicator styles
│   ├── utils/
│   │   ├── clipboard.js               # Clipboard utilities
│   │   ├── urlState.js                # URL state management for sharing
│   │   └── serviceWorker.js           # Service worker registration and management
│   └── index.js                       # Shared components exports
├── App.js                             # Main application component
├── App.css                            # Main app styles
├── index.js                           # React entry point
└── index.css                          # Global styles
```

## Technologies Used

- **React 18.2.0** - Main UI framework
- **React DnD 16.0.1** - Drag and drop functionality for gradient reordering
- **Shiki** - Syntax highlighting for CSS code generation
- **Service Worker** - Offline functionality and PWA capabilities
- **CSS3** - Styling with CSS Grid, Flexbox, and custom properties
- **HTML5 Backend** - For drag and drop operations
- **Iconify React** - Icon components for UI elements
- **Web APIs** - Clipboard API, URL API, Cache API for modern browser features

## PWA Features

This application is a **Progressive Web App (PWA)** with the following capabilities:

- **📱 Installable**: Can be installed on desktop and mobile devices
- **🔄 Offline Support**: Full functionality without internet connection
- **⚡ Fast Loading**: Service worker caching for instant app startup
- **🔄 Auto Updates**: Automatic updates when new versions are available
- **🌐 URL Sharing**: Share gradient configurations via compressed URLs
- **📊 Cache Management**: Efficient storage and automatic cleanup

## Offline Capabilities

When offline, you can still:

- ✅ Create and edit gradients (linear and radial)
- ✅ Adjust colors, positions, and all gradient properties
- ✅ Drag and drop to reorder gradients
- ✅ Generate and copy CSS code
- ✅ Use all UI features and controls
- ✅ Copy shareable URLs (when back online, they'll work perfectly)

## Sharing & URL Features

- **Compressed URLs**: Gradient configurations are encoded in compact, shareable URLs
- **Automatic Sync**: URLs update automatically as you create gradients
- **Cross-platform**: Share links work on any device with a modern browser
- **Bookmarkable**: Save your favorite gradient combinations as bookmarks

## Browser Support

This application supports all modern browsers:

- **Chrome/Chromium**: Full support including PWA installation
- **Firefox**: Full support with service worker caching
- **Safari**: Full support on macOS and iOS
- **Edge**: Full support with all PWA features

### Required Browser Features

- ES6+ JavaScript support
- CSS Grid and Flexbox
- Service Workers (for offline functionality)
- Clipboard API (with fallback for older browsers)
- HTML5 Canvas and input elements

## Performance

- **First Load**: ~2-3MB (includes all gradient creation tools)
- **Subsequent Loads**: ~100KB (cached assets)
- **Offline**: Instant loading from cache
- **Bundle Size**: Optimized with code splitting for fast initial load

## License

MIT License
