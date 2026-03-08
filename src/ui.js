// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  useViewport,
} from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { APINode } from './nodes/apiNode';
import { ConditionNode } from './nodes/conditionNode';
import { MergeNode } from './nodes/mergeNode';
import { TransformNode } from './nodes/transformNode';

import { DeletableEdge } from './edges/deletableEdge';

import 'reactflow/dist/style.css';
import { SubmitButton } from './submit';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  api: APINode,
  condition: ConditionNode,
  merge: MergeNode,
  transform: TransformNode,
};

const edgeTypes = {
  deletable: DeletableEdge,
};



const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const ZoomDisplayContent = () => {
  const { zoom } = useViewport();
  return <>{Math.round(zoom * 100)}%</>;
};


export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  }


  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div className="w-full h-full relative" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType='smoothstep'
        fitView
      >

        <Background color="hsl(var(--muted-foreground) / 0.1)" gap={gridSize} variant="dots" />

        {/* Custom Floating Bottom Bar */}
        <div className="absolute bottom-6 left-6 right-6 z-50 flex items-end justify-between pointer-events-none">
          <div className="flex items-end gap-3 pointer-events-auto">
            <div className="flex flex-col gap-2">
              <div className="bg-card/80 backdrop-blur-sm h-9 flex items-center justify-center rounded-xl border border-primary/20 shadow-xl text-[11px] font-muted-foreground text-primary w-full">
                <ZoomDisplayContent />
              </div>
              <div className="bg-card/80 backdrop-blur-sm p-1 rounded-xl border border-primary/20 shadow-xl overflow-hidden">
                <Controls
                  showInteractive={true}
                  className="!m-0 !relative !bg-transparent !border-none !shadow-none"
                />
              </div>
            </div>

            <div className="overflow-hidden h-[140px] w-[220px] relative">
              <MiniMap
                pannable
                className="!m-0 rounded-md"
                nodeColor={(n) => {
                  if (n.type === 'llm') return '#a855f7';
                  if (n.type === 'customInput') return '#22c55e';
                  if (n.type === 'customOutput') return '#3b82f6';
                  return '#94a3b8';
                }}
                maskColor="rgba(139, 92, 246, 0.05)"
                maskStrokeColor="rgba(139, 92, 246, 0.4)"
                maskStrokeWidth={1}
              />
            </div>
          </div>

          <div className="pointer-events-auto pb-1">
            <SubmitButton />
          </div>

        </div>


      </ReactFlow>
    </div>
  )
}
