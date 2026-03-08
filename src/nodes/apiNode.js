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

export const APINode = ({ id, data, selected }) => {
  const [url, setUrl] = useState(data?.url || 'https://api.example.com');
  const [method, setMethod] = useState(data?.method || 'GET');

  return (
    <NodeContainer
      id={id}
      type="api"
      title="API Request"
      inputs={[{ id: `${id}-body` }]}
      outputs={[{ id: `${id}-response` }]}
      selected={selected}
    >
      <div className="flex flex-col gap-3">
        <div className="space-y-1">
          <Label htmlFor={`${id}-url`} className="text-[10px] font-bold uppercase text-muted-foreground/70">Endpoint URL</Label>
          <Input 
            id={`${id}-url`}
            type="text" 
            value={url} 
            onChange={(e) => setUrl(e.target.value)} 
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor={`${id}-method`} className="text-[10px] font-bold uppercase text-muted-foreground/70">Method</Label>
          <Select value={method} onValueChange={setMethod}>
            <SelectTrigger id={`${id}-method`} className="w-full">
              <SelectValue placeholder="GET" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GET">GET</SelectItem>
              <SelectItem value="POST">POST</SelectItem>
              <SelectItem value="PUT">PUT</SelectItem>
              <SelectItem value="DELETE">DELETE</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </NodeContainer>
  );
};
