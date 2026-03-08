import { NodeContainer } from './nodeContainer';

export const LLMNode = ({ id, data }) => {
  return (
    <NodeContainer
      id={id}
      title="LLM"
      inputs={[
        { id: `${id}-system` },
        { id: `${id}-prompt` },
      ]}
      outputs={[{ id: `${id}-response` }]}
    >
      <span>This is an LLM.</span>
    </NodeContainer>
  );
};
