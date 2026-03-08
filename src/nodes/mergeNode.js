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

export const MergeNode = ({ id, data, selected }) => {
  const [mode, setMode] = useState(data?.mode || 'concat');

  return (
    <NodeContainer
      id={id}
      type="merge"
      title="Merge"
      inputs={[
        { id: `${id}-a`, label: 'A' },
        { id: `${id}-b`, label: 'B' },
      ]}
      outputs={[{ id: `${id}-result` }]}
      selected={selected}
    >
      <div className="space-y-1">
        <Label htmlFor={`${id}-mode`} className="text-[10px] font-bold uppercase text-muted-foreground/70">Merge Mode</Label>
        <Select value={mode} onValueChange={setMode}>
          <SelectTrigger id={`${id}-mode`} className="w-full">
            <SelectValue placeholder="Concat" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="concat">Concatenate</SelectItem>
            <SelectItem value="zip">Zip (Alternating)</SelectItem>
            <SelectItem value="override">Override (B wins)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </NodeContainer>
  );
};
