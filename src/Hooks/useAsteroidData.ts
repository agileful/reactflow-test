// src/hooks/useAsteroidData.ts
import { map } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { addEdge, Edge, Node, useEdgesState, useNodesState } from "reactflow";
import AsteroidNode from "../Components/AsteroidNode";
import EarthNode from "../Components/EarthNode";
import NodeStyleForm from "../Components/NodeStyleForm";
import NasaApiService from "../Services/NasaApiService";
import positionNodes from "../Utils/positionNodes";

const centerX = 260; // X-coordinate of the Earth node
const centerY = 260; // Y-coordinate of the Earth node
const radius = 180; // Radius of the circular pattern

const useAsteroidData = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

  const [nodeStyle, setNodeStyle] = useState<any>();

  const [selectedNodeId, setSelectedNodeId] = useState<any>();

  const [error, setError] = useState<Error | null>(null);

  const onUpdateNodeStyle = (
    selectedNodeId: string,
    backgroundColor: string,
    color: string
  ) => {
    // const { nodeId, backgroundColor, color } = data;
    setNodeStyle({ selectedNodeId, backgroundColor, color });
  };

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const nodeTypes = useMemo(
    () => ({
      earthNode: EarthNode,
      asteroidNode: AsteroidNode,
      nodeStyleForm: NodeStyleForm,
    }),
    []
  );

  useEffect(() => {
    const fetchAsteroids = async () => {
      try {
        const nearEarthObjects = await NasaApiService.getNearEarthObjects();

        const asteroidPositions = positionNodes(
          centerX,
          centerY,
          radius,
          nearEarthObjects.length
        );

        const asteroidNodes: Node[] = nearEarthObjects.map(
          (asteroid: any, index: number) => ({
            id: asteroid.id,
            type: "asteroidNode",
            data: {
              label: asteroid.name,
              onSelectNode: (id: string) => {
                setSelectedNodeId(id);
              },
            },
            position: asteroidPositions[index],
          })
        );
        setNodes([
          {
            id: "styleSelector",
            type: "nodeStyleForm",
            data: {
              label: "styleSelector",
              nodes: asteroidNodes,
              color: "#974e4e",
              onUpdateNodeStyle,
              id: selectedNodeId ? selectedNodeId : "",
            },
            position: { x: -190, y: 100 },
          },
          {
            id: "earth",
            type: "earthNode",
            data: { label: "Earth" },
            position: { x: 240, y: 200 },
          },
          ...asteroidNodes,
        ]);

        const orbitConnections: Edge[] = asteroidNodes.map((asteroidNode) => ({
          id: `connection-earth-${asteroidNode.id}`,
          source: "earth",
          target: asteroidNode.id,
          animated: true,
        }));
        setEdges(orbitConnections);
      } catch (error) {
        setError(error as Error);
      }
    };

    fetchAsteroids();
  }, []);

  useEffect(() => {
    if (nodeStyle) {
      const newNodes: Node[] = map(nodes, (node: Node) => {
        if (node.id == nodeStyle.selectedNodeId) {
          const newNode = {
            ...node,
            data: {
              label: node.data.label,
              color: nodeStyle.color,
              backgroundColor: nodeStyle.backgroundColor,
            },
          };
          return newNode;
        } else return node;
      });
      setNodes(newNodes);
    }
  }, [nodeStyle]);

  useEffect(() => {
    if (selectedNodeId) {
      const newNodes = map(nodes, (node: Node) => {
        if (node.id == "styleSelector") {
          return {
            id: "styleSelector",
            type: "nodeStyleForm",
            data: {
              ...node.data,
              id: selectedNodeId ? selectedNodeId : "",
            },
            position: { x: -190, y: 100 },
          };
        } else {
          return node;
        }
      });
      setNodes(newNodes);
    }
  }, [selectedNodeId]);

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    nodeTypes,
    error,
  };
};

export default useAsteroidData;
