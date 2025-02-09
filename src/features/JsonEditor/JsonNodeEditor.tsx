import { JsonNodeStringEditor } from "./JsonNodeStringEditor";
import { JsonNodeNumberEditor } from "./JsonNodeNumberEditor";
import { JsonNodeBooleanEditor } from "./JsonNodeBooleanEditor";
import { JsonNodeDefaultValueEditor } from "./JsonNodeDefaultValueEditor";
import { JsonNodeKeyEditor } from "./JsonNodeKeyEditor";

interface JsonNodeEntryEditorProps {
  nodeKey: string;
  value: unknown;
  level: number;
  onChange: (value: unknown) => void;
  onKeyChange: (key: string) => void;
}

function JsonNodeEntryEditor({
  nodeKey,
  value,
  level,
  onChange,
  onKeyChange,
}: JsonNodeEntryEditorProps) {
  return (
    <div style={{ marginLeft: `${level * 10}px` }}>
      <JsonNodeKeyEditor nodeKey={nodeKey} onChange={onKeyChange} />
      <span>: </span>
      {value === null && <JsonNodeDefaultValueEditor onChange={onChange} />}
      {typeof value === "string" && (
        <JsonNodeStringEditor value={value} onChange={onChange} />
      )}
      {typeof value === "number" && (
        <JsonNodeNumberEditor value={value} onChange={onChange} />
      )}
      {typeof value === "boolean" && (
        <JsonNodeBooleanEditor value={value} onChange={onChange} />
      )}
      {isObject(value) && (
        <JsonNodeObjectEditor
          level={level}
          value={value as Record<string, unknown>}
          onChange={onChange}
        />
      )}
      {isArray(value) && (
        <JsonNodeArrayEditor level={level} value={value} onChange={onChange} />
      )}
    </div>
  );
}

function renameObjectKey(
  obj: Record<string, unknown>,
  oldKey: string,
  newKey: string
) {
  const newObj: Record<string, unknown> = {};
  for (const key in obj) {
    if (key === oldKey) {
      newObj[newKey] = obj[key];
    } else {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

interface JsonNodeObjectEditorProps {
  level: number;
  value: Record<string, unknown>;
  onChange: (value: Record<string, unknown>) => void;
}

export function JsonNodeObjectEditor({
  level,
  value,
  onChange,
}: JsonNodeObjectEditorProps) {
  return (
    <>
      <span>{"{"}</span>
      {Object.entries(value).map(([key, nodeValue]) => (
        <JsonNodeEntryEditor
          key={key}
          nodeKey={key}
          value={nodeValue}
          level={level + 1}
          onKeyChange={(newKey) => {
            const newValue = renameObjectKey(value, key, newKey);
            onChange(newValue);
          }}
          onChange={(newValue) => onChange({ ...value, [key]: newValue })}
        />
      ))}
      <span>{"}"}</span>
    </>
  );
}

function isObject(value: unknown): value is Record<string, unknown> {
  return (
    !Array.isArray(value) &&
    typeof value === "object" &&
    value !== null &&
    value !== undefined
  );
}

interface JsonNodeArrayEditorProps {
  value: unknown[];
  level: number;
  onChange: (value: unknown[]) => void;
}

export function JsonNodeArrayEditor({
  level,
  value,
  onChange,
}: JsonNodeArrayEditorProps) {
  return (
    <>
      <span>{"["}</span>
      {value.map((nodeValue, index) => (
        <>
          {index > 0 && <span>, </span>}
          {isObject(nodeValue) && (
            <JsonNodeObjectEditor
              key={index}
              level={level + 1}
              value={nodeValue}
              onChange={(newValue) =>
                onChange(value.map((v, i) => (i === index ? newValue : v)))
              }
            />
          )}
        </>
      ))}
      <span>{"]"}</span>
    </>
  );
}

function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}
