import { ReactNode, useState } from 'react';

import './JsonLine.css';

interface JsonLineProps {
  level: number;
  children: ReactNode | ((props: { isHovered: boolean }) => ReactNode);
}

export default function JsonLine({ level, children }: JsonLineProps) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      style={{
        counterIncrement: 'json-line',
      }}
      className="json-line"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={{ whiteSpace: 'pre' }}>{space(level * 2)}</span>
      {typeof children === 'function' ? children({ isHovered }) : children}
    </div>
  );
}

const space = (length: number) => ' '.repeat(length);
