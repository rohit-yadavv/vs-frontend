import { useState } from 'react';
import { NodeContainer } from './nodeContainer';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

import { useStore } from '../store';

export const OutputNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const defaultName = id.replace('customOutput-', 'output_');
  const [name, setName] = useState(data?.inputName || defaultName);
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  // Sync default name to store on mount if not already there
  useState(() => {
    if (!data?.inputName) {
      updateNodeField(id, 'inputName', defaultName);
    }
  });

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    updateNodeField(id, 'inputName', newName);
  };


  return (
    <NodeContainer
      id={id}
      type="customOutput"
      title="Output"
      inputs={[{ id: `${id}-value` }]}
      outputs={[]}
      selected={selected}
      tooltip="The output node represents the final result of your pipeline execution."
    >


      <div className="flex flex-col gap-3">
        <div className="space-y-1.5">
          <Label htmlFor={`${id}-name`} className="text-[10px] font-bold uppercase text-muted-foreground/70">Name</Label>
          <Input 
            id={`${id}-name`}
            type="text" 
            value={name} 
            onChange={handleNameChange} 
          />

        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`${id}-type`} className="text-[10px] font-bold uppercase text-muted-foreground/70">Type</Label>
          <Select value={outputType} onValueChange={setOutputType}>
            <SelectTrigger id={`${id}-type`} className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Text">Text</SelectItem>
              <SelectItem value="Image">Image</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </NodeContainer>
  );
};
