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

export const LLMNode = ({ id, data, selected }) => {
  const [model, setModel] = useState(data?.model || 'gpt-4o');
  const [system, setSystem] = useState(data?.system || '');
  const [prompt, setPrompt] = useState(data?.prompt || '');

  return (
    <NodeContainer
      id={id}
      type="llm"
      title="LLM"
      inputs={[
        { id: `${id}-system`, label: 'System' },
        { id: `${id}-prompt`, label: 'Prompt' },
      ]}
      outputs={[{ id: `${id}-response`, label: 'Response' }]}
      selected={selected}
      tooltip="Large Language Model node for processing prompts using state-of-the-art AI models."
    >
      <div className="flex flex-col gap-4">
        {/* Model Selection */}
        <div className="space-y-1.5">
          <Label htmlFor={`${id}-model`} className="text-[10px] font-bold uppercase text-muted-foreground/70">Model</Label>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger id={`${id}-model`} className="w-full h-9 bg-muted/20">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4o">GPT-4o</SelectItem>
              <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
              <SelectItem value="claude-3-5-sonnet">Claude 3.5 Sonnet</SelectItem>
              <SelectItem value="llama-3-70b">Llama 3 70B</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* System Prompt */}
        <div className="space-y-1.5">
          <Label htmlFor={`${id}-system-input`} className="text-[10px] font-bold uppercase text-muted-foreground/70">System Message</Label>
          <textarea
            id={`${id}-system-input`}
            value={system}
            onChange={(e) => setSystem(e.target.value)}
            placeholder="You are a helpful assistant..."
            className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
          />
        </div>

        {/* User Prompt */}
        <div className="space-y-1.5">
          <Label htmlFor={`${id}-prompt-input`} className="text-[10px] font-bold uppercase text-muted-foreground/70">Prompt Template</Label>
          <textarea
            id={`${id}-prompt-input`}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Summarize the following text: {{text}}"
            className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
          />
        </div>
      </div>
    </NodeContainer>
  );
};
