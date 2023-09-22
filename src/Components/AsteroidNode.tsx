import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Handle, Position } from "reactflow";

interface StyledAsteroidProps {
  backgroundColor?: string;
  color?: string;
}

const StyledAsteroid = styled(Box)<StyledAsteroidProps>(
  ({ backgroundColor, color }) => ({
    borderRadius: "100%",
    width: "50px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "5px",
    backgroundColor: backgroundColor || "lightgray",
    color: color || "",
  })
);

interface AsteroidNodeProps {
  id: string;
  data: {
    label: string;
    backgroundColor: string;
    color: string;
    onSelectNode?: (id: string) => void;
  };
}

const AsteroidNode: React.FC<AsteroidNodeProps> = ({ data, id }) => {
  const { backgroundColor, color, onSelectNode } = data;

  return (
    <StyledAsteroid
      backgroundColor={backgroundColor}
      color={color}
      onClick={() => onSelectNode && onSelectNode(id)}
    >
      <Handle type="target" position={Position.Bottom} />
      {data.label}
    </StyledAsteroid>
  );
};

export default AsteroidNode;
