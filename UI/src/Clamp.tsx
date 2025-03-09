const ClampText = ({ minSize, maxSize, scale = 2, children }) => {
  const fontSize = `clamp(${minSize}px, ${scale}vw, ${maxSize}px)`;

  return <p style={{ fontSize }}>{children}</p>;
};

export default ClampText;
