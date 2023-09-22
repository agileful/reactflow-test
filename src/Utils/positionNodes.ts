const positionNodes = (
  centerX: number,
  centerY: number,
  radius: number,
  count: number
) => {
  const angleIncrement = (2 * Math.PI) / count;
  const positions = [];

  for (let i = 0; i < count; i++) {
    const angle = i * angleIncrement;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    positions.push({ x, y });
  }

  return positions;
};

export default positionNodes;
