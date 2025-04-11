import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import * as fabric from "fabric";
const Edit = () => {
  const location = useLocation();
  const url = location.state?.data || "";
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [imageDataUrl, setImageDataUrl] = useState(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    if (canvas) {
      canvas.dispose();
    }
    const initCanvas = new fabric.Canvas(canvasRef.current, {
      width: 700,
      height: 500,
      backgroundColor: "#f0f0f0",
    });

    if (url) {
      const img = new Image();
      img.crossOrigin = "anonymous";

      img.onload = () => {
        const imgObj = new fabric.Image(img, {
          centeredRotation: true,
          centeredScaling: true,
          scaleX: 1,
          scaleY: 1,
          left: initCanvas.width / 2,
          top: initCanvas.height / 2,
          originX: "center",
          originY: "center",
          selectable: false,
        });
        initCanvas.add(imgObj);
        initCanvas.renderAll();
      };

      img.src = url;
    }

    const updateImageDataUrl = () => {
      const dataURL = initCanvas.toDataURL({
        format: "png",
        quality: 0.8,
      });
      setImageDataUrl(dataURL);
    };
    initCanvas.on("object:added", updateImageDataUrl);
    initCanvas.on("object:modified", updateImageDataUrl);
    initCanvas.on("object:removed", updateImageDataUrl);
    initCanvas.renderAll();
    setCanvas(initCanvas);

    return () => {
      initCanvas.off("object:added", updateImageDataUrl);
      initCanvas.off("object:modified", updateImageDataUrl);
      initCanvas.off("object:removed", updateImageDataUrl);
      initCanvas.dispose();
    };
  }, [url]);

  const addText = () => {
    const text = new fabric.Textbox("Your Text", {
      left: 100,
      top: 100,
      fontSize: 18,
      backgroundColor: "yellow",
      padding: 4,
      editable: true,
    });
    canvas.add(text);
  };

  const addShape = (type) => {
    let shape;
    switch (type) {
      case "circle":
        shape = new fabric.Circle({
          radius: 50,
          fill: "red",
          left: 200,
          top: 200,
        });
        break;
      case "rect":
        shape = new fabric.Rect({
          width: 100,
          height: 75,
          fill: "blue",
          left: 300,
          top: 300,
        });
        break;
      case "triangle":
        shape = new fabric.Triangle({
          width: 100,
          height: 100,
          fill: "purple",
          left: 350,
          top: 350,
        });
        break;
      case 'polygon':
        const points = [
          { x: 50, y: 0 },
          { x: 100, y: 50 },
          { x: 75, y: 100 },
          { x: 25, y: 100 },
          { x: 0, y: 50 },
        ];
        shape = new fabric.Polygon(points, {
          left: 200,
          top: 200,
          fill: 'green',
          stroke: 'black',
          strokeWidth: 2,
          objectCaching: false,
        });
    }
    if (shape) {
      canvas.add(shape);
      canvas.renderAll();
    }
  };

  
  const downloadImage = (e) => {
    if (!canvas) return;
    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 0.8,
    });
    const link = document.createElement("a");
    link.download = "canvas.png";
    link.href = dataURL;
    link.click();
  };

  const logCanvasObjects = () => {
    if (!canvas) return;
    const objects = canvas.getObjects().map(obj => obj.toObject());
    console.log(objects);
  };
  logCanvasObjects()

  return (
    <div style={{ display: "flex", padding: "2%" ,boxShadow:'rgba(0, 0, 0, 0.4) 0px 3px 8px',gap:'10px'}}>
      <div style={{ width: "70%" ,padding:'1%',boxShadow:'rgba(0, 0, 0, 0.4) 0px 3px 8px'}}>
        <div style={{display:'flex',gap:'2px',marginBottom:'5px'}}>
          <button onClick={addText} className="btnStyle">Add Text</button>
          <button onClick={() => addShape("circle")} className="btnStyle">Add Circle</button>
          <button onClick={() => addShape("rect")} className="btnStyle">Add Rectangle</button>
          <button onClick={() => addShape("triangle")} className="btnStyle">Add Triangle</button>
          <button onClick={() => addShape("polygon")} className="btnStyle">Add polygon</button>
        </div>
        <canvas ref={canvasRef} style={{ width: "100%" }} />
      </div>
      <div
        style={{ boxShadow:'rgba(0, 0, 0, 0.4) 0px 3px 8px', width: "50%", textAlign: "center" }}
      >
        <button onClick={(e) => downloadImage(e)} className="btnStyle">
          Download Image
        </button>
        {imageDataUrl && (
          <div style={{ marginTop: "10px" }}>
            <img
              src={imageDataUrl}
              alt="Canvas Preview"
              style={{ maxWidth: "100%", border: "1px solid #ccc" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Edit;
