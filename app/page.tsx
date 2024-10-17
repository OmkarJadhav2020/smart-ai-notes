"use client";
import { useEffect, useState, useRef } from "react";
import {
  ReactSketchCanvas,
  type ReactSketchCanvasRef,
} from "react-sketch-canvas";
import { FaUndo, FaRedo } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import axios from "axios";
import Draggable from "react-draggable";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import WelcomeModal from "@/components/WelcomeModal";

const loadMathJax = () => {
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-MML-AM_CHTML";
  script.async = true;
  document.head.appendChild(script);

  script.onload = () => {
    window.MathJax.Hub.Config({
      tex2jax: {
        inlineMath: [
          ["$", "$"],
          ["\\(", "\\)"],
        ],
      },
    });
  };
};

const PaintApp = () => {
  const [color, setColor] = useState("#ffffff");
  const [brushSize, setBrushSize] = useState(4);
  const [isEraser, setIsEraser] = useState(false);
  const [latexPosition, setLatexPosition] = useState({ x: 10, y: 200 });
  const [latexExpression, setLatexExpression] = useState<string[]>([]);
  const [dictOfVars, setDictOfVars] = useState<{ [key: string]: unknown }>({});
  const canvasRef = useRef<ReactSketchCanvasRef | null>(null);

  useEffect(() => {
    loadMathJax();
  }, []);

  useEffect(() => {
    if (latexExpression.length > 0 && window.MathJax) {
      setTimeout(() => {
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
      }, 0);
    }
  }, [latexExpression]);

  const toggleEraser = () => {
    setIsEraser((prev) => !prev);
    setColor(isEraser ? "#00aaff" : "black");
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clearCanvas();
    }
    setLatexExpression([]);
    setDictOfVars({});
  };

  const undoLastAction = () => {
    if (canvasRef.current) {
      canvasRef.current.undo();
    }
  };

  const redoLastAction = () => {
    if (canvasRef.current) {
      canvasRef.current.redo();
    }
  };

  const runRoute = async () => {
    if (canvasRef.current) {
      const canvasData = await canvasRef.current.exportImage("png");

      const response = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/calculate`,
        data: {
          image: canvasData,
          dict_of_vars: dictOfVars, // Send the dict_of_vars to the backend
        },
      });

      const resp = response.data;
      resp.data.forEach((data: { expr: string; result: unknown }) => {
        const latex = `\\(\\LARGE{${data.expr} = ${data.result}}\\)`;
        setLatexPosition({
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
        });
        setLatexExpression((prev) => [...prev, latex]);

        setDictOfVars((prev) => ({
          ...prev,
          [data.expr]: data.result,
        }));
      });
      canvasRef.current.clearCanvas();
    }
  };

  return (
    <div className="relative w-full h-screen bg-gray-900 text-white overflow-hidden">
      {/* Floating control panel */}
      <div
        style={{ backgroundColor: "#333" }}
        className="absolute top-2 left-2 z-10 p-3 rounded-md hidden sm:flex"
      >
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          disabled={isEraser}
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
            <span role="img" aria-label="Eraser">
              🧽
            </span>
          ) : (
            <span role="img" aria-label="Pencil">
              ✏️
            </span>
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
            margin: "0px 5px",
          }}
        >
          Clear Canvas
        </button>
        <button
          onClick={runRoute}
          style={{
            backgroundColor: "#ff4d4d",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            margin: "0px 5px",
            padding: "5px 10px",
          }}
        >
          Run
        </button>
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
          <FaUndo />
        </button>
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
          <FaRedo />
        </button>
      </div>

      <div className="sm:hidden absolute top-2 left-2 ">
        <Sheet>
          <SheetTrigger>
            <HiMenu className="text-4xl" />
          </SheetTrigger>
          <SheetContent
            side={"left"}
            style={{ backgroundColor: "black", color: "white" }}
          >
            <div className="flex flex-col gap-5 items-start justify-items-start">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                disabled={isEraser}
                style={{ marginRight: "10px" }}
              />

              <div className="flex flex-row gap-4 justify-items-center items-center">
                <p className="text-white ">Size : </p>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={brushSize}
                  onChange={(e) => setBrushSize(parseInt(e.target.value))}
                  style={{ marginRight: "10px" }}
                />
              </div>
              <div className="flex flex-row">
                <button onClick={toggleEraser} style={{ marginRight: "10px" }}>
                  {isEraser ? (
                    <span role="img" aria-label="Eraser">
                      🧽
                    </span>
                  ) : (
                    <span role="img" aria-label="Pencil">
                      ✏️
                    </span>
                  )}
                </button>
                <p className="text-white">{isEraser ? "Eraser" : "Pencil"}</p>
              </div>
              <div>
                <SheetClose asChild>
                  <button
                    onClick={clearCanvas}
                    style={{
                      backgroundColor: "#ff4d4d",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      padding: "5px 10px",
                      margin: "0px 5px",
                    }}
                  >
                    Clear Canvas
                  </button>
                </SheetClose>
                <SheetClose asChild>
                  <button
                    onClick={runRoute}
                    style={{
                      backgroundColor: "#ff4d4d",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      margin: "0px 5px",
                      padding: "5px 10px",
                    }}
                  >
                    Run
                  </button>
                </SheetClose>
              </div>
              <div>
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
                  <FaUndo />
                </button>
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
                  <FaRedo />
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <WelcomeModal />
      <button
        onClick={runRoute}
        // style={{
        //   backgroundColor: "#ff4d4d",
        //   color: "#fff",
        //   border: "none",
        //   borderRadius: "5px",

        // }}
        style={{backgroundColor:"#ff4d4d",margin: "0px 5px",
          padding: "5px 10px",}}
        className="absolute top-3 right-1 sm:hidden block text-white border-none rounded-md "
      >
        Run
      </button>

      {latexExpression.map((latex, index) => (
        <Draggable
          key={index}
          defaultPosition={latexPosition}
          onStop={(e, data) => setLatexPosition({ x: data.x, y: data.y })}
        >
          <div className="absolute p-2 text-white rounded shadow-md">
            <div className="latex-content">{latex}</div>
          </div>
        </Draggable>
      ))}
      <ReactSketchCanvas
        ref={canvasRef}
        strokeColor={isEraser ? "black" : color}
        strokeWidth={brushSize}
        canvasColor="black"
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default PaintApp;
