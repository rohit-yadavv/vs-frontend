import { Card, CardHeader, CardTitle, CardContent, CardAction } from '../components/ui/card';
import { Handle, Position } from 'reactflow';
import { cn } from "../lib/utils";
import {
  X,
  Info,
  Cpu,
  FileText,
  StickyNote,
  Globe,
  Layers,
  GitBranch,
  Code2,
  FolderInput,
  FolderOutput
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../components/ui/tooltip';
import { useStore } from '../store';

const icons = {
  customInput: FolderInput,
  customOutput: FolderOutput,
  llm: Cpu,
  text: FileText,
  note: StickyNote,
  api: Globe,
  merge: Layers,
  condition: GitBranch,
  transform: Code2,
};

const getHandleTop = (index, total) => {
  if (total === 1) return '50%';
  return `${((index + 1) / (total + 1)) * 100}%`;
};

export const NodeContainer = ({ id, type, title, inputs = [], outputs = [], children, style = {}, selected, tooltip }) => {
  const deleteNode = useStore((state) => state.deleteNode);
  const edges = useStore((state) => state.edges);
  const Icon = icons[type] || StickyNote;

  const isConnected = (handleId) => {
    return edges.some(edge => edge.sourceHandle === handleId || edge.targetHandle === handleId || edge.source === handleId || edge.target === handleId);
  };

  return (
    <Card
      className={cn(
        "relative min-w-[200px] transition-all bg-card shadow-sm hover:shadow-md overflow-visible",
        selected ? "border-primary ring-1 ring-primary" : "border-border"
      )}
      style={style}
    >
      {/* Input handles */}
      {inputs.map((handle, i) => {
          const connected = isConnected(handle.id);
          return (
            <Handle
              key={handle.id}
              type="target"
              position={Position.Left}
              id={handle.id}
              className={cn(
                "!w-3 !h-3 !border-2 !border-background !z-50 transition-colors duration-200",
                connected ? "!bg-primary" : "!bg-muted-foreground/30"
              )}
              style={{ top: getHandleTop(i, inputs.length), ...handle.style }}
            />
          );
      })}

      {/* Enhanced Header */}
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon size={14} className="text-primary" />
          <CardTitle className="text-[10px] font-bold uppercase text-muted-foreground tracking-tight">
            {title}
          </CardTitle>
        </div>

        <CardAction className="flex items-center gap-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size='icon' 
                variant='ghost' 
                className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors"
              >
                <Info size={14} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>{tooltip || title}</p>
            </TooltipContent>
          </Tooltip>

          <Button
            size='icon'
            variant='ghost'
            onClick={() => deleteNode(id)}
            className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors"
          >
            <X size={14} />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        {children}
      </CardContent>

      {/* Output handles */}
      {outputs.map((handle, i) => {
          const connected = isConnected(handle.id);
          return (
            <Handle
              key={handle.id}
              type="source"
              position={Position.Right}
              id={handle.id}
              className={cn(
                "!w-3 !h-3 !border-2 !border-background !z-50 transition-colors duration-200",
                connected ? "!bg-primary" : "!bg-muted-foreground/30"
              )}
              style={{ top: getHandleTop(i, outputs.length), ...handle.style }}
            />
          );
      })}
    </Card>
  );
};
