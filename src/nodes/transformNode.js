import { useState } from 'react';
import { NodeContainer } from './nodeContainer';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

export const TransformNode = ({ id, data, selected }) => {
  const [lang, setLang] = useState(data?.language || 'javascript');
  const [code, setCode] = useState(data?.code || 'return input;');

  return (
    <NodeContainer
      id={id}
      type="transform"
      title="Transform"
      inputs={[{ id: `${id}-input` }]}
      outputs={[{ id: `${id}-output` }]}
      selected={selected}
    >
      <div className="flex flex-col gap-3">
        <div className="space-y-1">
          <Label htmlFor={`${id}-lang`} className="text-[10px] font-bold uppercase text-muted-foreground/70">Language</Label>
          <Select value={lang} onValueChange={setLang}>
            <SelectTrigger id={`${id}-lang`} className="w-full">
              <SelectValue placeholder="JavaScript" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label htmlFor={`${id}-code`} className="text-[10px] font-bold uppercase text-muted-foreground/70">Code</Label>
          <textarea
            id={`${id}-code`}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex min-h-[80px] w-full rounded-md border border-input bg-muted/20 px-3 py-2 text-[11px] font-mono shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
          />
        </div>
      </div>
    </NodeContainer>
  );
};
