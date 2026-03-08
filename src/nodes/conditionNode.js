import { useState } from 'react';
import { NodeContainer } from './nodeContainer';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';

export const ConditionNode = ({ id, data, selected }) => {
  const [condition, setCondition] = useState(data?.condition || '');

  return (
    <NodeContainer
      id={id}
      type="condition"
      title="Condition"
      inputs={[{ id: `${id}-input` }]}
      outputs={[
        { id: `${id}-true`, label: 'True' },
        { id: `${id}-false`, label: 'False' },
      ]}
      selected={selected}
    >
      <div className="space-y-1">
        <Label htmlFor={`${id}-expr`} className="text-[10px] font-bold uppercase text-muted-foreground/70">Expression</Label>
        <Input 
          id={`${id}-expr`}
          type="text" 
          value={condition} 
          onChange={(e) => setCondition(e.target.value)} 
          placeholder="e.g. value > 10"
        />
        <p className="text-[9px] text-muted-foreground italic">JavaScript expression for branching.</p>
      </div>
    </NodeContainer>
  );
};
