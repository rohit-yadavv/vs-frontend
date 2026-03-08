import { useState, useMemo, useEffect, useRef } from 'react';
import { NodeContainer } from './nodeContainer';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { useStore } from '../store';

export const TextNode = ({ id, data, selected }) => {
  const [text, setText] = useState(data?.text || '');
  const textAreaRef = useRef(null);
  const [nodeSize, setNodeSize] = useState({ width: 240, height: 110 });
  
  const [showMenu, setShowMenu] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const nodes = useStore((state) => state.nodes);

  const variables = useMemo(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$-]*)\s*\}\}/g;
    const found = new Set();
    let match;
    while ((match = regex.exec(text)) !== null) {
      found.add(match[1]);
    }
    return [...found];
  }, [text]);

  const inputs = useMemo(() => {
    return variables.map(v => ({ id: `${id}-${v}`, label: v }));
  }, [id, variables]);

  useEffect(() => {
    if (textAreaRef.current) {
      const lines = text.split('\n');
      const maxChars = Math.max(...lines.map(l => l.length));
      const targetWidth = Math.max(240, Math.min(600, 160 + maxChars * 8.5));

      textAreaRef.current.style.height = '0px';
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = `${scrollHeight}px`;
      
      setNodeSize({
        width: targetWidth,
        height: Math.max(110, scrollHeight + 110)
      });
    }
  }, [text]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);

    const cursor = e.target.selectionStart;
    const lastChars = newText.slice(0, cursor);
    if (lastChars.endsWith('{{')) {
        setMenuPos({ top: 40, left: 20 }); 
        setShowMenu(true);
    } else {
        setShowMenu(false);
    }
  };

  const insertVariable = (varName) => {
      const cursor = textAreaRef.current.selectionStart;
      const before = text.slice(0, cursor);
      const after = text.slice(cursor);
      setText(`${before}${varName}}} ${after}`);
      setShowMenu(false);
      textAreaRef.current.focus();
  };

  return (
    <NodeContainer
      id={id}
      type="text"
      title="Text"
      inputs={inputs}
      outputs={[{ id: `${id}-output` }]}
      selected={selected}
      style={{ width: nodeSize.width, minHeight: nodeSize.height }}
      tooltip="Create reusable templates. Use {{variable}} to add input ports dynamically."
    >
      <div className="flex-1 flex flex-col space-y-2 relative">
        <Label htmlFor={`${id}-text`} className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-wider">
          Template content
        </Label>
        
        <div className="relative flex-1">
            <Textarea
              ref={textAreaRef}
              id={`${id}-text`}
              value={text}
              onChange={handleTextChange}
              className="w-full px-3 py-2 text-sm text-foreground overflow-hidden leading-relaxed"
              placeholder="e.g. Hello {{user_name}}, welcome back!"
            />

            {showMenu && (
                <div 
                    className="absolute z-[100] bg-popover border rounded-lg shadow-2xl p-1 min-w-[150px] animate-in fade-in slide-in-from-top-1"
                    style={{ top: menuPos.top, left: menuPos.left }}
                >
                    <div className="px-2 py-1 text-[9px] font-bold text-muted-foreground uppercase border-b mb-1">Select Input</div>
                    <div className="max-h-[150px] overflow-y-auto no-scrollbar">
                        {nodes.filter(n => n.id !== id).map(n => {
                            const displayName = n.data?.inputName || n.id;
                            return (
                                <button
                                    key={n.id}
                                    onClick={() => insertVariable(displayName)}
                                    className="w-full text-left px-2 py-1.5 text-xs hover:bg-primary/10 hover:text-primary rounded-md transition-colors flex items-center gap-2"
                                >
                                    <div className="w-1 h-1 rounded-full bg-primary" />
                                    {displayName}
                                </button>
                            );
                        })}
                        {nodes.length <= 1 && (
                            <div className="px-2 py-3 text-[10px] text-center text-muted-foreground italic">No other nodes found</div>
                        )}
                    </div>
                </div>
            )}
        </div>

        {variables.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-2 border-t border-border/10">
            {variables.map(v => (
              <span key={v} className="px-1.5 py-0.5 bg-primary/5 text-primary/70 border border-primary/20 rounded-md text-[8px] font-black tracking-tight uppercase">
                {v}
              </span>
            ))}
          </div>
        )}
      </div>
    </NodeContainer>
  );
};



