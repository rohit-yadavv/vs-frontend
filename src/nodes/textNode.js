import { useState } from 'react';
import { NodeContainer } from './nodeContainer';

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '{{input}}');

  return (
    <NodeContainer
      id={id}
      title="Text"
      outputs={[{ id: `${id}-output` }]}
    >
      <label>
        Text:
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      </label>
    </NodeContainer>
  );
};
