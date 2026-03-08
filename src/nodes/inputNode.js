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

export const InputNode = ({ id, data, selected }) => {
  const [name, setName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  return (
    <NodeContainer
      id={id}
      type="customInput"
      title="Input"
      outputs={[{ id: `${id}-value` }]}
      selected={selected}
      tooltip="An input node serves as an entry point for your pipeline data. Supports text and file streams."
    >
      <div className="flex flex-col gap-3">
        <div className="space-y-1.5">
          <Label htmlFor={`${id}-name`} className="text-[10px] font-bold uppercase text-muted-foreground/70">Name</Label>
          <Input 
            id={`${id}-name`}
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`${id}-type`} className="text-[10px] font-bold uppercase text-muted-foreground/70">Type</Label>
          <Select value={inputType} onValueChange={setInputType}>
            <SelectTrigger id={`${id}-type`} className="w-full h-9">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Text">Text</SelectItem>
              <SelectItem value="File">File</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Dynamic input based on type */}
        <div className="space-y-1.5 pt-1 border-t border-border/50">
            <Label className="text-[10px] font-bold uppercase text-muted-foreground/70">
                {inputType === 'File' ? 'Upload File' : 'Input Value'}
            </Label>
            {inputType === 'File' ? (
                <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/40 border-border transition-colors">
                        <div className="flex flex-col items-center justify-center pt-2 pb-3">
                            <svg className="w-6 h-6 mb-2 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p className="text-[10px] text-muted-foreground">Select File</p>
                        </div>
                        <input type="file" className="hidden" />
                    </label>
                </div>
            ) : (
                <Input type="text" placeholder="Enter text..." />
            )}
        </div>
      </div>
    </NodeContainer>
  );
};
