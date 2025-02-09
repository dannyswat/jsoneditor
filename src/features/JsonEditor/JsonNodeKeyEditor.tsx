import { useEffect, useRef, useState } from "react";

interface JsonNodeKeyEditorProps {
  nodeKey: string;
  onChange: (nodeKey: string) => void;
}

export function JsonNodeKeyEditor({ nodeKey, onChange }: JsonNodeKeyEditorProps) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(nodeKey);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  if (!editing) {
    return (
      <span style={{ color: "#F88" }} onClick={() => setEditing(true)}>
        "{nodeKey}"
      </span>
    );
  }
  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {
        onChange(value);
        setEditing(false);
      }}
    />
  );
}
