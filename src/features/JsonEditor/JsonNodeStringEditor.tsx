import { useEffect, useRef, useState } from "react";

interface JsonNodeStringEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function JsonNodeStringEditor({
  value,
  onChange,
}: JsonNodeStringEditorProps) {
  const [editing, setEditing] = useState(false);
  const [newValue, setNewValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  if (!editing) {
    return (
      <span style={{ color: "#88F" }} onClick={() => setEditing(true)}>
        "{value}"
      </span>
    );
  }

  return (
    <input
      ref={inputRef}
      type="text"
      value={newValue}
      onChange={(e) => setNewValue(e.target.value)}
      onBlur={() => {
        onChange(newValue);
        setEditing(false);
      }}
    />
  );
}
