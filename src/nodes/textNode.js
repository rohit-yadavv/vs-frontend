import { useState, useMemo, useEffect, useRef } from 'react';
import { NodeContainer } from './nodeContainer';
import { Label } from '../components/ui/label';

export const TextNode = ({ id, data, selected }) => {
  const [text, setText] = useState(data?.text || '{{input}}');
  const textAreaRef = useRef(null);

  // Extract variables like {{name}}
  const variables = useMemo(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const found = new Set();
    let match;
    while ((match = regex.exec(text)) !== null) {
      found.add(match[1]);
    }
    return [...found];
  }, [text]);

  // Map variables to input handles
  const inputs = useMemo(() => {
    return variables.map(v => ({ id: `${id}-${v}`, label: v }));
  }, [id, variables]);

  // Auto-resize logic
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [text]);

  return (
    <NodeContainer
      id={id}
      type="text"
      title="Text"
      inputs={inputs}
      outputs={[{ id: `${id}-output` }]}
      selected={selected}
    >
      <div className="space-y-2">
        <Label htmlFor={`${id}-text`} className="text-[10px] font-bold uppercase text-muted-foreground/70">Content</Label>
        <textarea
          ref={textAreaRef}
          id={`${id}-text`}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex min-h-[40px] w-full rounded-md border border-input bg-muted/20 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none overflow-hidden"
          placeholder="Type here, use {{var}} for inputs"
        />
        <p className="text-[9px] text-muted-foreground italic">
          Detected variables: {variables.length > 0 ? variables.join(', ') : 'none'}
        </p>
      </div>
    </NodeContainer>
  );
};
