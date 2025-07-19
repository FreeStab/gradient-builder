# Gradient Background Builder

A React application that allows users to create and configure beautiful gradient backgrounds with an intuitive drag-and-drop interface.

🚀 **[Live Demo](https://yourusername.github.io/gradient-builder)** - Try it now!

## Features

- **Create Gradients**: Add linear and radial gradients to your canvas
- **Background Color Control**: Set a custom background color for transparent gradients
- **Drag and Drop**: Reorder gradients in the stack by dragging them
- **Color Configuration**: Multiple color pickers to create complex gradients
- **Real-time Preview**: See your gradient changes instantly
- **CSS Generation**: Copy CSS code for individual gradients or the complete background
- **Syntax Highlighting**: Beautiful CSS code display with VS Code theme
- **Gradient Controls**:
  - Adjust angle for linear gradients
  - Control center position for radial gradients
  - Modify opacity for layering effects
  - Custom gradient sizes with multiple units (%, px, em, rem, vw, vh)
  - Add multiple color stops per gradient
- **Responsive Design**: Modern, dark-themed interface

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

## Deployment

### Deploy to GitHub Pages

1. **Fork or clone this repository**

2. **Update the homepage URL** in `package.json`:
   ```json
   "homepage": "https://your-username.github.io/gradient-builder"
   ```

3. **Deploy to GitHub Pages**:
   ```bash
   npm run deploy
   ```

4. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch
   - Your app will be available at the URL specified in the homepage field

### Build for Production

To create a production build:

```bash
npm run build
```

This creates a `build` folder with optimized files ready for deployment.

## Usage

1. **Add a Gradient**: Click "Linear Gradient" or "Radial Gradient" to add a new gradient
2. **Set Background Color**: Use the background color picker to set a base color for transparent gradients
3. **Select a Gradient**: Click on any gradient in the stack to select and edit it
4. **Reorder Gradients**: Drag gradients up or down in the stack to change their layering
5. **Edit Colors**: Use the color pickers to change gradient colors and adjust transparency
6. **Adjust Properties**: Modify angle, position, size, and opacity using the controls
7. **Copy CSS**: Click the CSS button to copy the generated CSS code to your clipboard
8. **Delete Gradients**: Click the "×" button to remove unwanted gradients

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
│   │   └── SyntaxHighlighter.css      # Syntax highlighter styles
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
- **CSS3** - Styling with CSS Grid, Flexbox, and custom properties
- **HTML5 Backend** - For drag and drop operations

## License

MIT License
