import { useState } from "react";

const defaultValues: Record<string, () => unknown> = {
  null: () => null,
  boolean: () => false,
  number: () => 0,
  string: () => "",
  object: () => ({}),
  array: () => [],
};

interface JsonNodeDefaultValueEditorProps {
  onChange: (value: unknown) => void;
}

export function JsonNodeDefaultValueEditor({
  onChange,
}: JsonNodeDefaultValueEditorProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (!isEditing) {
    return (
      <span style={{ color: "#88F" }} onClick={() => setIsEditing(true)}>
        null
      </span>
    );
  }

  return (
    <select
      onChange={(e) => {
        onChange(defaultValues[e.target.value]());
        setIsEditing(false);
      }}
      onBlur={() => setIsEditing(false)}
    >
      {Object.keys(defaultValues).map((key) => (
        <option key={key} value={key}>
          {key}
        </option>
      ))}
    </select>
  );
}
