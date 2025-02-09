import { useRef, useState } from "react";

interface JsonNodeBooleanEditorProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export function JsonNodeBooleanEditor({ value, onChange }: JsonNodeBooleanEditorProps) {
  const [editing, setEditing] = useState(false);
  const [newValue, setNewValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!editing) {
    return (
      <span style={{ color: "#F88" }} onClick={() => setEditing(true)}>
        {value.toString()}
      </span>
    );
  }

  return (
    <input
      ref={inputRef}
      type="checkbox"
      checked={newValue}
      onChange={(e) => setNewValue(e.target.checked)}
      onBlur={() => {
        onChange(newValue);
        setEditing(false);
      }}
    />
  );
}
