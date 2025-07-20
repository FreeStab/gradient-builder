import { useState, useCallback, useMemo, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Icon } from "@iconify/react";
import {
  GradientCanvas,
  GradientControls,
  GradientStack,
} from "./features/gradient";
import {
  getStateFromUrl,
  updateUrlWithState,
  OfflineIndicator,
} from "./shared";
import "./App.css";

const App = () => {
  // Initialize state with default values
  const getInitialState = () => {
    // Try to load from URL first
    const urlState = getStateFromUrl();
    if (urlState) {
      return {
        backgroundColor: urlState.backgroundColor,
        gradients: urlState.gradients,
      };
    }

    // Default state if no URL config
    return {
      backgroundColor: "#ffffff",
      gradients: [
        {
          id: 1,
          type: "radial",
          colors: [
            { color: "rgba(0, 42, 255, 0.28)", stop: 0 },
            { color: "rgba(255, 255, 255, 0)", stop: 100 },
          ],
          angle: 0,
          size: "farthest-corner",
          customSize: { width: 50, height: 50, unit: "%" },
          position: { x: 100, y: 0 },
          opacity: 1,
        },
        {
          id: 2,
          type: "radial",
          colors: [
            { color: "rgba(117, 163, 255, 0.58)", stop: 0 },
            { color: "rgba(0, 0, 255, 0)", stop: 75 },
          ],
          angle: 0,
          size: "farthest-corner",
          customSize: { width: 50, height: 50, unit: "%" },
          position: { x: 0, y: 100 },
          opacity: 1,
        },
        {
          id: 3,
          type: "radial",
          colors: [
            { color: "rgba(255, 221, 97, 0.41)", stop: 0 },
            { color: "rgba(0, 0, 255, 0)", stop: 100 },
          ],
          angle: 0,
          size: "custom",
          customSize: { width: 31, height: 37, unit: "%" },
          position: { x: 19, y: 50 },
          opacity: 1,
        },
      ],
    };
  };

  const initialState = getInitialState();
  const [backgroundColor, setBackgroundColor] = useState(
    initialState.backgroundColor
  );
  const [gradients, setGradients] = useState(initialState.gradients);

  const [selectedGradientId, setSelectedGradientId] = useState(null);

  // Update URL when gradients or background color changes
  useEffect(() => {
    updateUrlWithState(gradients, backgroundColor);
  }, [gradients, backgroundColor]);

  // Derive the selected gradient from the gradients list
  const selectedGradient = useMemo(() => {
    if (selectedGradientId) {
      return gradients.find((g) => g.id === selectedGradientId) || null;
    }
    return null;
  }, [gradients, selectedGradientId]);

  const addGradient = useCallback((type) => {
    const newGradient = {
      id: Date.now(),
      type,
      colors: [
        { color: "rgba(255, 0, 0, 1)", stop: 0 },
        { color: "rgba(0, 0, 255, 1)", stop: 100 },
      ],
      angle: type === "linear" ? 45 : 0,
      size: type === "radial" ? "farthest-corner" : "cover",
      customSize: { width: 50, height: 50, unit: "%" },
      position: { x: 50, y: 50 },
      opacity: 1,
    };
    setGradients((prev) => [...prev, newGradient]);
  }, []);

  const updateGradient = useCallback((id, updates) => {
    setGradients((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...updates } : g))
    );
  }, []);

  const deleteGradient = useCallback(
    (id) => {
      setGradients((prev) => prev.filter((g) => g.id !== id));
      if (selectedGradient?.id === id) {
        setSelectedGradientId(null);
      }
    },
    [selectedGradient]
  );

  const handleSelectGradient = useCallback((gradient) => {
    setSelectedGradientId(gradient ? gradient.id : null);
  }, []);

  const moveGradient = useCallback((dragIndex, hoverIndex) => {
    setGradients((prev) => {
      const newGradients = [...prev];
      const draggedGradient = newGradients[dragIndex];
      newGradients.splice(dragIndex, 1);
      newGradients.splice(hoverIndex, 0, draggedGradient);
      return newGradients;
    });
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <div className="main-content">
          <GradientCanvas
            gradients={gradients}
            backgroundColor={backgroundColor}
          />
          <div className="sidebar">
            <div className="attribution">
              <p>Made with ❤️ by Charles Lavalard</p>
              <div className="social-icons">
                <a
                  href="https://github.com/FreeStab"
                  title="Github"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon icon="uil:github" width={16} height={16} />
                </a>
                <a
                  href="mailto:charles.lavalard.dev@gmail.com?subject=Prise de contact&body=Hello Charles,%0Atu vas bien ?"
                  title="Send me an email"
                >
                  <Icon icon="uil:envelope" width={16} height={16} />
                </a>
                <a
                  href="https://www.linkedin.com/in/charles-lavalard-427455165/"
                  title="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon icon="uil:linkedin-alt" width={16} height={16} />
                </a>
                <a
                  href="https://coff.ee/charleslavq"
                  title="Buy me a coffee"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon
                    icon="simple-icons:buymeacoffee"
                    width={16}
                    height={16}
                  />
                </a>
              </div>
            </div>
            <div className="controls-section">
              <h2>Gradient Builder</h2>

              <div className="add-gradient-buttons">
                <button
                  onClick={() => addGradient("linear")}
                  className="add-button linear"
                >
                  <Icon icon="uil:plus-circle" width="16" height="16" /> Linear
                  Gradient
                </button>
                <button
                  onClick={() => addGradient("radial")}
                  className="add-button radial"
                >
                  <Icon icon="uil:plus-circle" width="16" height="16" /> Radial
                  Gradient
                </button>
              </div>

              <div className="background-color-section">
                <label htmlFor="background-color-picker">
                  Background Color:
                </label>
                <input
                  id="background-color-picker"
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="background-color-picker"
                />
              </div>
            </div>

            <GradientStack
              gradients={gradients}
              selectedGradient={selectedGradient}
              onSelect={handleSelectGradient}
              onMove={moveGradient}
              onDelete={deleteGradient}
            />

            {selectedGradient && (
              <GradientControls
                gradient={selectedGradient}
                onUpdate={(updates) =>
                  updateGradient(selectedGradient.id, updates)
                }
              />
            )}
          </div>
        </div>
        <OfflineIndicator />
      </div>
    </DndProvider>
  );
};

export default App;
