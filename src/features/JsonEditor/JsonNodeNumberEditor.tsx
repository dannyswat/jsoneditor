import { useEffect, useRef, useState } from "react";

interface JsonNodeNumberEditorProps {
  value: number;
  onChange: (value: number) => void;
}

export function JsonNodeNumberEditor({ value, onChange }: JsonNodeNumberEditorProps) {
  const [editing, setEditing] = useState(false);
  const [newValue, setNewValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  if (!editing) {
    return (
      <span style={{ color: "#F88" }} onClick={() => setEditing(true)}>
        {value}
      </span>
    );
  }

  return (
    <input
      ref={inputRef}
      type="number"
      value={newValue}
      onChange={(e) => setNewValue(parseFloat(e.target.value))}
      onBlur={() => {
        onChange(newValue);
        setEditing(false);
      }}
    />
  );
}
