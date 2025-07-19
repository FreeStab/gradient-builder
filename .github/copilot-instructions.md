# Copilot Instructions - Gradient Builder

## Project Overview

This is a React-based gradient background builder application that allows users to create, configure, and manage multiple gradients (linear and radial) with drag-and-drop functionality, real-time preview, and CSS code generation.

## Tech Stack

- **React 18.2.0** - Main UI framework
- **React DnD 16.0.1** - Drag and drop functionality for gradient reordering
- **Shiki** - Syntax highlighting for CSS code generation
- **CSS3** - Styling with CSS Grid, Flexbox, and custom properties
- **HTML5 Backend** - For drag and drop operations

## Architecture Principles

This project follows a feature-based architecture that promotes maintainability and scalability:

### Feature-Based Structure

- **`src/features/`** - Domain-specific features (gradient management)
- **`src/shared/`** - Reusable components and utilities across features
- **Component co-location** - CSS files are placed next to their corresponding JS components

### Import Strategy

- **Feature exports** - Each feature has an `index.js` that exports all public components and utilities
- **Shared exports** - Shared components are exported through `src/shared/index.js`
- **Relative imports** - Internal feature components use relative imports
- **Clean imports** - External features import through the main feature export

Example import patterns:

```javascript
// External feature import (from App.js)
import { GradientCanvas, GradientControls } from "./features/gradient";

// Shared component import
import { SyntaxHighlighter } from "../../../shared";

// Internal feature import (within gradient feature)
import ColorPicker from "./ColorPicker";
```

## Project Structure

```
src/
├── features/
│   └── gradient/
│       ├── components/
│       │   ├── GradientCanvas.js      # Main preview canvas
│       │   ├── GradientCanvas.css     # Canvas-specific styles
│       │   ├── GradientStack.js       # Gradient list with drag-drop
│       │   ├── GradientStack.css      # Stack styles
│       │   ├── GradientStackItem.js   # Individual gradient item
│       │   ├── GradientStackItem.css  # Stack item styles
│       │   ├── GradientControls.js    # Gradient configuration panel
│       │   ├── GradientControls.css   # Controls panel styles
│       │   ├── ColorPicker.js         # Color picker with alpha support
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
├── index.js                           # Entry point
└── index.css                          # Global styles
```

## Core Features

### 1. Gradient Management

- **Add gradients**: Linear and radial types
- **Delete gradients**: Remove unwanted gradients
- **Reorder gradients**: Drag and drop to change stacking order
- **Select gradients**: Click to select and edit

### 2. Gradient Configuration

- **Type**: Linear or radial gradients
- **Colors**: Multiple color stops with RGBA support
- **Color Stops**: Adjustable positions (0-100%)
- **Angle**: Direction for linear gradients (0-360°)
- **Size**: Predefined or custom sizes with multiple units
- **Position**: Center point for radial gradients
- **Opacity**: Overall gradient transparency

### 3. Color System

- **RGBA Support**: Full alpha channel control
- **Color Formats**: Supports hex, rgb, rgba input/output
- **Alpha Control**: Separate slider for transparency (0-100%)
- **Visual Preview**: Checkered background to show transparency

### 4. Size System

- **Predefined Sizes**: closest-side, closest-corner, farthest-side, farthest-corner
- **Custom Sizes**: Width and height with multiple units
- **Supported Units**: %, px, em, rem, vw, vh
- **Smart CSS**: Generates circle (one value) or ellipse (two values)

### 5. CSS Generation

- **Individual CSS**: Copy CSS for selected gradient
- **Combined CSS**: Copy CSS for all gradients
- **Clipboard Support**: Automatic copy to clipboard with fallback
- **Real-time Preview**: Live background updates
- **Syntax Highlighting**: CSS code displayed with Shiki syntax highlighting
- **Theme Integration**: Uses VS Code dark-plus theme for consistency

## Data Structure

### Gradient Object

```javascript
{
  id: number,                    // Unique identifier
  type: 'linear' | 'radial',     // Gradient type
  colors: [                      // Array of color stops
    {
      color: 'rgba(r, g, b, a)',  // RGBA color string
      stop: number                // Position 0-100%
    }
  ],
  angle: number,                 // 0-360° for linear gradients
  size: string,                  // Predefined or 'custom'
  customSize: {                  // Custom size configuration
    width: number,               // 1-200
    height: number,              // 1-200
    unit: string                 // %, px, em, rem, vw, vh
  },
  position: {                    // Radial gradient center
    x: number,                   // 0-100%
    y: number                    // 0-100%
  },
  opacity: number                // 0-1 overall opacity
}
```

## Key Components

### App.js

- **State Management**: Manages gradients array and selection
- **Event Handlers**: Add, update, delete, move, select gradients
- **DnD Provider**: Wraps app with React DnD context

### GradientCanvas.js

- **Preview Display**: Shows combined gradient background
- **CSS Generation**: Combines all gradients into single background
- **Copy Functionality**: Copy all gradients CSS to clipboard

### GradientControls.js

- **Configuration Panel**: Controls for selected gradient
- **Form Inputs**: Sliders, selects, color pickers
- **Real-time Updates**: Immediate preview of changes
- **CSS Copy**: Individual gradient CSS generation

### ColorPicker.js

- **Color Selection**: HTML5 color input
- **Alpha Control**: Separate transparency slider
- **RGBA Parsing**: Converts between color formats
- **Visual Preview**: Shows color with transparency

### GradientStack.js & GradientStackItem.js

- **Drag and Drop**: Reorder gradients by dragging
- **Selection**: Click to select gradient for editing
- **Visual Feedback**: Hover and selected states
- **Delete Button**: Remove gradient from stack

### SyntaxHighlighter.js (Shared Component)

- **CSS Highlighting**: Syntax highlighting for generated CSS code
- **Shiki Integration**: Uses Shiki library with VS Code dark-plus theme
- **Async Loading**: Handles highlighting with loading states
- **Error Fallback**: Displays plain code if highlighting fails
- **Copy Integration**: Works with CSS generation features

## Styling Guidelines

### CSS Architecture

- **Component-based**: Each component has its own CSS file
- **BEM-like naming**: Descriptive class names
- **CSS Custom Properties**: For consistent theming
- **Responsive Design**: Flexbox and Grid for layouts

### Color Scheme

- **Primary**: #007bff (blue)
- **Success**: #28a745 (green)
- **Danger**: #dc3545 (red)
- **Secondary**: #6c757d (gray)
- **Dark**: #343a40
- **Light**: #f8f9fa

### Component States

- **Hover Effects**: Subtle transitions and highlights
- **Selected State**: Clear visual indication
- **Disabled State**: Reduced opacity and no interaction
- **Loading State**: Feedback for async operations

## Development Guidelines

### Code Style

- **Functional Components**: Use hooks over class components
- **Custom Hooks**: Extract reusable logic
- **useCallback**: Optimize re-renders for event handlers
- **useMemo**: Optimize expensive calculations
- **PropTypes**: Type checking for component props

### State Management

- **Local State**: useState for component-specific state
- **Derived State**: useMemo for computed values
- **Event Handlers**: useCallback for stable references
- **State Updates**: Immutable updates with spread operator

### Performance

- **Memoization**: Prevent unnecessary re-renders
- **Debouncing**: Consider for expensive operations
- **Lazy Loading**: Split code where beneficial
- **Bundle Size**: Monitor and optimize dependencies

## Error Handling

### User Input Validation

- **Color Parsing**: Fallback to default on invalid colors
- **Range Validation**: Ensure sliders stay within bounds
- **Type Checking**: Validate gradient properties

### Graceful Degradation

- **Clipboard API**: Fallback for older browsers
- **CSS Support**: Basic gradients if advanced features fail
- **Error Boundaries**: Catch and display component errors

## Browser Support

### Modern Browsers

- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions

### CSS Features

- **CSS Grid**: Main layout system
- **Flexbox**: Component layouts
- **CSS Custom Properties**: Theming
- **CSS Gradients**: Core functionality

## Testing Strategy

### Unit Tests

- **Component Rendering**: Ensure components render correctly
- **Event Handlers**: Test user interactions
- **State Updates**: Verify state changes
- **Utility Functions**: Test CSS generation

### Integration Tests

- **User Flows**: Complete gradient creation workflow
- **Drag and Drop**: Test reordering functionality
- **CSS Generation**: Verify output matches expected

## Deployment

### Build Process

- **npm run build**: Creates optimized production build
- **Static Files**: Output in build/ directory
- **Asset Optimization**: Minification and bundling

### Environment Variables

- **REACT*APP*\***: Prefix for custom environment variables
- **NODE_ENV**: Controls development/production mode

## Future Enhancements

### Potential Features

- **Gradient Presets**: Pre-built gradient collections
- **Animation Support**: CSS animation generation
- **Export Options**: PNG/SVG export functionality
- **Undo/Redo**: History management
- **Keyboard Shortcuts**: Power user features
- **Mobile Optimization**: Touch-friendly interface

### Code Improvements

- **TypeScript**: Add type safety
- **Testing**: Increase test coverage
- **Performance**: Profile and optimize
- **Accessibility**: ARIA labels and keyboard navigation

## Troubleshooting

### Common Issues

- **Drag and Drop**: Ensure HTML5Backend is properly configured
- **CSS Generation**: Check color format parsing
- **State Updates**: Verify immutable state updates
- **Performance**: Check for unnecessary re-renders

### Debug Tools

- **React DevTools**: Component inspection
- **Console Logging**: State and prop debugging
- **Browser DevTools**: CSS and network inspection
- **Performance Profiler**: Identify bottlenecks

## Contributing

### Code Standards

- **ESLint**: Follow configured linting rules
- **Prettier**: Consistent code formatting
- **Git Commits**: Descriptive commit messages
- **PR Reviews**: Code review before merging

### Documentation

- **Code Comments**: Explain complex logic
- **README Updates**: Keep documentation current
- **Changelog**: Track significant changes
- **API Documentation**: Document component interfaces
