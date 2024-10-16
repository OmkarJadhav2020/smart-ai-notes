"use client";
import { useState, useRef } from "react";
import {
  ReactSketchCanvas,
  type ReactSketchCanvasRef,
} from "react-sketch-canvas";
import { FaUndo, FaRedo } from "react-icons/fa"; // Importing icons

const PaintApp = () => {
  const [color, setColor] = useState("#ffffff"); // Default brush color
  const [brushSize, setBrushSize] = useState(4);
  const [isEraser, setIsEraser] = useState(false);
  const canvasRef = useRef<ReactSketchCanvasRef | null>(null); // Reference for the canvas, initialized with null

  const toggleEraser = () => {
    setIsEraser((prev) => !prev);
    setColor(isEraser ? "#00aaff" : "black"); // Use black as the eraser for the black canvas
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clearCanvas(); // Clear the canvas
    }
  };

  const undoLastAction = () => {
    if (canvasRef.current) {
      canvasRef.current.undo(); // Undo the last action
    }
  };

  const redoLastAction = () => {
    if (canvasRef.current) {
      canvasRef.current.redo(); // Redo the last undone action
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#121212",
        height: "100vh", // Full height
        width: "100vw", // Full width
        overflow: "hidden", // Prevent scrolling on both axes
        position: "relative", // Position relative for floating controls
      }}
    >
      {/* <h1 style={{ textAlign: "center", color: "#ffffff" }}>Paint App</h1> */}

      {/* Floating control panel */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 10, // Ensure it floats above the canvas
          display: "flex",
          backgroundColor: "#333",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          disabled={isEraser} // Disable color selection when eraser is active
          style={{ marginRight: "10px" }}
        />
        <input
          type="range"
          min="1"
          max="20"
          value={brushSize}
          onChange={(e) => setBrushSize(parseInt(e.target.value))}
          style={{ marginRight: "10px" }}
        />
        <button onClick={toggleEraser} style={{ marginRight: "10px" }}>
          {isEraser ? (
            <span role="img" aria-label="Eraser">🧽</span> // Eraser emoji
          ) : (
            <span role="img" aria-label="Pencil">✏️</span> // Pencil emoji
          )}
        </button>
        <button
          onClick={clearCanvas}
          style={{
            backgroundColor: "#ff4d4d",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            padding: "5px 10px",
          }}
        >
          Clear Canvas
        </button>
        {/* Undo Button */}
        <button
          onClick={undoLastAction}
          style={{
            backgroundColor: "#00aaff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            padding: "5px 10px",
            marginLeft: "10px",
          }}
        >
          <FaUndo /> {/* Undo Icon */}
        </button>
        {/* Redo Button */}
        <button
          onClick={redoLastAction}
          style={{
            backgroundColor: "#00aaff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            padding: "5px 10px",
            marginLeft: "10px",
          }}
        >
          <FaRedo /> {/* Redo Icon */}
        </button>
      </div>

      {/* Canvas area */}
      <div
        style={{
          width: "100%",
          height: "100%", // Fill the entire viewport
        }}
      >
        <ReactSketchCanvas
          ref={canvasRef}
          strokeColor={isEraser ? "black" : color} // Use black for eraser since the canvas is black
          strokeWidth={brushSize}
          canvasColor="black" // Canvas color set to black
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default PaintApp;
