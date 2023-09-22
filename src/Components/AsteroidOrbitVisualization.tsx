import React from "react";
import ReactFlow, {
  Controls,
  MiniMap,
  Background,
  ReactFlowProvider,
} from "reactflow";
import { styled } from "@mui/material/styles";
import "reactflow/dist/style.css";
import ErrorComponent from "./ErrorComponent";
import { Typography } from "@mui/material";
import useAsteroidData from "../Hooks/useAsteroidData";

const StyledVisualizationContainer = styled("div")`
  width: 100wh;
  height: 90%;
`;

const AsteroidOrbitVisualization: React.FC = () => {
  const {
    nodes,
    edges,
    onEdgesChange,
    onNodesChange,
    onConnect,
    nodeTypes,
    error,
  } = useAsteroidData();

  return (
    <StyledVisualizationContainer>
      <Typography variant="h5" sx={{ backgroundColor: "lightblue" }}>
        Asteroid Orbit Visualization
      </Typography>
      <ErrorComponent error={error} />
      {!error && (
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            style={{ background: "#1A192B" }}
            nodeTypes={nodeTypes}
          >
            <Controls />
            <MiniMap nodeStrokeWidth={3} zoomable pannable />
            <Background variant={"dots" as any} gap={12} size={1} />
          </ReactFlow>
        </ReactFlowProvider>
      )}
    </StyledVisualizationContainer>
  );
};

export default AsteroidOrbitVisualization;
