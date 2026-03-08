import { 
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

export const DraggableNode = ({ type, label }) => {
    const Icon = icons[type] || StickyNote;

    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={`${type} flex flex-col items-center justify-center gap-1.5 size-20 cursor-grab rounded-xl border bg-card/40 p-2 shadow-sm transition-all hover:border-primary hover:shadow-md active:scale-95 group backdrop-blur-sm`}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        draggable
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300 shadow-sm border border-border/10">
            <Icon size={18} strokeWidth={2} className="text-muted-foreground group-hover:text-primary"/>
        </div>
        <span className="text-[10px] font-bold tracking-widest text-center line-clamp-1 transition-colors duration-200 text-muted-foreground group-hover:text-foreground">
          {label}
        </span>
      </div>
    );
  };
