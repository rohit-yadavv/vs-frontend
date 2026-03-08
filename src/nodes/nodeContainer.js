import { Handle, Position } from 'reactflow';

const getHandleTop = (index, total) => {
  if (total === 1) return '50%';
  return `${((index + 1) / (total + 1)) * 100}%`;
};

export const NodeContainer = ({ id, title, inputs = [], outputs = [], children, style = {} }) => {
  return (
    <div style={{ width: 200, minHeight: 80, border: '1px solid black', borderRadius: '4px', ...style }}>

      {inputs.map((handle, i) => (
        <Handle
          key={handle.id}
          type="target"
          position={Position.Left}
          id={handle.id}
          style={{ top: getHandleTop(i, inputs.length), ...handle.style }}
        />
      ))}

      <div style={{ padding: '4px 8px', borderBottom: '1px solid black', fontWeight: 'bold' }}>
        {title}
      </div>

      <div style={{ padding: '8px' }}>
        {children}
      </div>

      {outputs.map((handle, i) => (
        <Handle
          key={handle.id}
          type="source"
          position={Position.Right}
          id={handle.id}
          style={{ top: getHandleTop(i, outputs.length), ...handle.style }}
        />
      ))}

    </div>
  );
};
