import React, { memo } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Handle, Position } from "reactflow";

const StyledEarth = styled(Box)`
  border-radius: 100%;
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  background: linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 43%,
    rgba(45, 253, 51, 1) 100%
  );
`;

const EarthNode: React.FC = () => {
  return (
    <StyledEarth>
      <div>Earth</div>
      <Handle type="source" position={Position.Bottom} />
    </StyledEarth>
  );
};
export default EarthNode;
