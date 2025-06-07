import { Stage, Layer, Image as KonvaImage } from 'react-konva';

import useImage from "use-image";
import { useRef } from "react";

import "./index.css"

const DraggableSticker = ({ id, src, x, y, onDragEnd, onDelete }) => {
  const [image] = useImage(src);

  return (
    <KonvaImage
      image={image}
      x={x}
      y={y}
      draggable
      width={70}
      height={70}
      onDragEnd={(e) => {
        const snap = (val) => Math.round(val / 40) * 40;
        onDragEnd(id, snap(e.target.x()), snap(e.target.y()));
      }}
      onDblClick={() => onDelete(id)}
    />
  );
};

const Canvas = ({ stickers, setStickers }) => {
  const stageRef = useRef();

  const handleDragEnd = (id, newX, newY) => {
    const updated = stickers.map((s) =>
      s.id === id ? { ...s, x: newX, y: newY } : s
    );
    setStickers(updated);
  };

  const handleDelete = (id) => {
    setStickers((prev) => prev.filter((s) => s.id !== id));
  };

  const downloadCanvas = () => {
    const uri = stageRef.current.toDataURL();
    const link = document.createElement("a");
    link.download = "my-sticker-art.png";
    link.href = uri;
    link.click();
  };

  return (
    <div className='text-area'>
      <Stage
        width={600}
        height={400}
        ref={stageRef}
        style={{ border: "2px solid #aaa", background: "#fff" }}
      >
        <Layer>
          {stickers.map((sticker) => (
            <DraggableSticker
              key={sticker.id}
              {...sticker}
              onDragEnd={handleDragEnd}
              onDelete={handleDelete}
            />
          ))}
        </Layer>
      </Stage>
      <button onClick={downloadCanvas} className='buttn'>Download PNG</button>
    </div>
  );
};

export default Canvas;  