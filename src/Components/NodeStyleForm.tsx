import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Card, FormLabel } from "@mui/material";
import { Node } from "reactflow";

interface ColorPickerNodeProps {
  data: {
    nodes: Node[];
    onUpdateNodeStyle: (
      nodeId: string,
      backgroundColor: string,
      color: string
    ) => void;
    id: string;
  };
  isConnectable: boolean;
}

const NodeStyleForm: React.FC<ColorPickerNodeProps> = ({ data }) => {
  const { nodes, onUpdateNodeStyle } = data;

  const [selectedNodeId, setSelectedNodeId] = useState<string>("");
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  const [color, setColor] = useState<string>("");

  useEffect(() => {
    if (data.id) {
      setSelectedNodeId(data.id);
    }
  }, [data.id]);

  const handleNodeSelectChange = (e: any) => {
    setSelectedNodeId(e.target.value);
  };

  const handleBackgroundColorChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBackgroundColor(e.target.value);
  };

  const handleTextColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const handleUpdateStyleClick = () => {
    onUpdateNodeStyle(selectedNodeId, backgroundColor, color);
  };

  return (
    <>
      <Card sx={{ width: "170px", p: 2 }} className="nodrag">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <select
              value={selectedNodeId}
              onChange={handleNodeSelectChange}
              style={{
                width: "100%",
                height: "20px",
                fontSize: 12,
                paddingLeft: 3,
              }}
            >
              <option value="">Select a Node</option>
              {nodes.map((node) => {
                return (
                  <option key={node.id} value={node.id}>
                    {node.data.label}
                  </option>
                );
              })}
            </select>
          </Grid>
          <Grid item xs={12}>
            <FormLabel
              component="div"
              sx={{
                fontSize: 8,
              }}
            >
              Background Color
            </FormLabel>
            <TextField
              fullWidth
              variant="outlined"
              value={backgroundColor}
              type="color"
              onChange={handleBackgroundColorChange}
              size="small"
              InputProps={{ style: { height: "20px" } }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormLabel
              component="div"
              sx={{
                fontSize: 8,
              }}
            >
              Text Color
            </FormLabel>
            <TextField
              fullWidth
              type="color"
              variant="outlined"
              value={color}
              onChange={handleTextColorChange}
              InputProps={{ style: { height: "20px" } }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              size="small"
              color="inherit"
              onClick={handleUpdateStyleClick}
              sx={{ fontSize: "8px" }}
            >
              Update Style
            </Button>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default NodeStyleForm;
