import { getSmoothStepPath, BaseEdge, EdgeLabelRenderer } from 'reactflow';
import { X } from 'lucide-react';
import { useStore } from '../store';

export const DeletableEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });


  const deleteEdge = useStore((state) => state.deleteEdge);

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} className="stroke-[2px] stroke-primary/30" />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <button
            className="flex h-5 w-5 items-center justify-center rounded-full bg-background border border-border shadow-sm text-muted-foreground hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-all duration-200"
            onClick={(event) => {
              event.stopPropagation();
              deleteEdge(id);
            }}
          >
            <X size={10} strokeWidth={3} />
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
