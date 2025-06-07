const StickerButton = ({ src, onClick }) => {
  return (
    <button onClick={() => onClick(src)} style={{ border: 'none', background: 'none' }}>
      <img src={src} alt="sticker" width="60" height="60" />
    </button>
  );
};

export default StickerButton;
