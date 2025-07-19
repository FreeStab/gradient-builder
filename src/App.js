import React, { useState, useCallback, useMemo } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  GradientCanvas,
  GradientControls,
  GradientStack,
  generateAllGradientsCSS,
  copyToClipboard,
} from "./features/gradient";
import "./App.css";

const App = () => {
  const [copyStatus, setCopyStatus] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  const [gradients, setGradients] = useState([
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
  ]);

  const [selectedGradientId, setSelectedGradientId] = useState(null);

  // Dériver le gradient sélectionné à partir de la liste des gradients
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

  const handleCopyAllCSS = async () => {
    const cssCode = generateAllGradientsCSS(gradients, backgroundColor);
    const success = await copyToClipboard(cssCode);

    if (success) {
      setCopyStatus("Copié !");
      setTimeout(() => setCopyStatus(""), 2000);
    } else {
      setCopyStatus("Erreur");
      setTimeout(() => setCopyStatus(""), 2000);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <div className="main-content">
          <GradientCanvas
            gradients={gradients}
            backgroundColor={backgroundColor}
          />
          <div className="sidebar">
            <div className="controls-section">
              <div className="section-header">
                <h2>Gradient Builder</h2>
                <button
                  className="copy-all-css-btn"
                  onClick={handleCopyAllCSS}
                  title="Copier le CSS de tous les gradients"
                >
                  {copyStatus || "📋 CSS"}
                </button>
              </div>
              <div className="add-gradient-buttons">
                <button
                  onClick={() => addGradient("linear")}
                  className="add-button linear"
                >
                  + Linear Gradient
                </button>
                <button
                  onClick={() => addGradient("radial")}
                  className="add-button radial"
                >
                  + Radial Gradient
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
            <div className="attribution">
              <p>
                Icons made by{" "}
                <a
                  href="https://www.flaticon.com/authors/freepik"
                  title="Freepik"
                >
                  Freepik
                </a>{" "}
                from{" "}
                <a href="https://www.flaticon.com/" title="Flaticon">
                  www.flaticon.com
                </a>
              </p>
              <p>
                Gradient Builder by{" "}
                <a href="https://github.com/FreeStab" title="Gradient Builder">
                  Charles Lavalard
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
