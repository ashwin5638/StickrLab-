import { useState } from 'react';
import StickerButton from './components/StickerButton.js';
import Canvas from './components/Canva/Canvas.js'; 
import './App.css';

function App() {
  const [stickers, setStickers] = useState([]);

  const handleAddSticker = (src) => {
    const newSticker = {
      id: Date.now(),
      src: src,
      x: 100,
      y: 100
    };
    setStickers((prev) => [...prev, newSticker]);
  };

  return (
    <div className="container">
      <h1 className='head'>StickrLab</h1>
      <div className="sidebar">
        <StickerButton src="/Assets/emoji1.png" onClick={handleAddSticker} />
        <StickerButton src="/Assets/emoji2.png" onClick={handleAddSticker} />
        <StickerButton src="/Assets/emoji3.png" onClick={handleAddSticker} />
      </div>

      <Canvas stickers={stickers} setStickers={setStickers} />
    </div>
  );
}

export default App;
