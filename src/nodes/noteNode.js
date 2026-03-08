import { useState } from 'react';
import { NodeContainer } from './nodeContainer';
import { Label } from '../components/ui/label';

export const NoteNode = ({ id, data, selected }) => {
  const [note, setNote] = useState(data?.note || '');

  return (
    <NodeContainer
      id={id}
      type="note"
      title="Note"
      inputs={[{ id: `${id}-input` }]}
      outputs={[{ id: `${id}-output` }]}
      selected={selected}
      tooltip="A sticky note for annotations or passing text data."
      style={{ minWidth: '250px' }}
    >
      <div className="space-y-2">
        <Label htmlFor={`${id}-note`} className="text-[10px] font-bold uppercase text-muted-foreground/70">Note Content</Label>
        <textarea
          id={`${id}-note`}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Type a note..."
          className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
        />
      </div>
    </NodeContainer>
  );
};
