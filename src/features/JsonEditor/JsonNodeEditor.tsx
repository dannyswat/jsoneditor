import { JsonNodeStringEditor } from './JsonNodeStringEditor';
import { JsonNodeNumberEditor } from './JsonNodeNumberEditor';
import { JsonNodeBooleanEditor } from './JsonNodeBooleanEditor';
import { JsonNodeDefaultValueEditor } from './JsonNodeDefaultValueEditor';
import { JsonNodeKeyEditor } from './JsonNodeKeyEditor';

interface JsonNodeEditorProps {
  value: unknown;
  onChange: (value: unknown) => void;
  level: number;
}

function JsonNodeEditor({ value, level, onChange }: JsonNodeEditorProps) {
  return (
    <>
      {value === null && <JsonNodeDefaultValueEditor onChange={onChange} />}
      {typeof value === 'string' && (
        <JsonNodeStringEditor value={value} onChange={onChange} />
      )}
      {typeof value === 'number' && (
        <JsonNodeNumberEditor value={value} onChange={onChange} />
      )}
      {typeof value === 'boolean' && (
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
        <JsonNodeArrayEditor
          level={level}
          value={value}
          onChange={onChange}
          onDelete={(i) => onChange(value.filter((_, idx) => idx !== i))}
        />
      )}
    </>
  );
}

interface JsonNodeEntryEditorProps {
  nodeKey: string;
  value: unknown;
  level: number;
  onChange: (value: unknown) => void;
  onKeyChange: (key: string) => void;
  onDelete: () => void;
}

function JsonNodeEntryEditor({
  nodeKey,
  value,
  level,
  onChange,
  onKeyChange,
  onDelete,
}: JsonNodeEntryEditorProps) {
  return (
    <div style={{ marginLeft: `${level * 10}px` }}>
      <JsonNodeKeyEditor nodeKey={nodeKey} onChange={onKeyChange} />
      <span>: </span>
      <JsonNodeEditor value={value} onChange={onChange} level={level} />
      <a
        href="javascript:void(0)"
        onClick={(e) => {
          e.preventDefault();
          if (confirm('Are you sure you want to delete this entry?'))
            onDelete();
        }}
      >
        -
      </a>
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
      <span>{'{'}</span>
      <a
        href="javascript:void(0)"
        onClick={(e) => {
          e.preventDefault();
          const newKey = getDefaultNewKey(value);
          onChange({ ...value, [newKey]: null });
        }}
      >
        +
      </a>
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
          onDelete={() => {
            const { ...newObj } = value;
            delete newObj[key];
            onChange(newObj);
          }}
        />
      ))}
      <span>{'}'}</span>
    </>
  );
}

function getDefaultNewKey(obj: Record<string, unknown>) {
  const keys = new Set(Object.keys(obj));
  let index = 1;
  while (keys.has(`newKey${index}`)) {
    index++;
  }
  return `newKey${index}`;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return (
    !Array.isArray(value) &&
    typeof value === 'object' &&
    value !== null &&
    value !== undefined
  );
}

interface JsonNodeArrayEditorProps {
  value: unknown[];
  level: number;
  onChange: (value: unknown[]) => void;
  onDelete: (index: number) => void;
}

export function JsonNodeArrayEditor({
  level,
  value,
  onChange,
  onDelete,
}: JsonNodeArrayEditorProps) {
  return (
    <>
      <span>{'['}</span>
      <a
        href="javascript:void(0)"
        onClick={(e) => {
          e.preventDefault();
          onChange([...value, null]);
        }}
      >
        +
      </a>
      {value.map((nodeValue, index) => (
        <>
          {index > 0 && <span>, </span>}
          <JsonNodeEditor
            value={nodeValue}
            level={level + 1}
            onChange={(newValue) =>
              onChange(value.map((v, i) => (i === index ? newValue : v)))
            }
          />
          <a
            href="javascript:void(0)"
            onClick={(e) => {
              e.preventDefault();
              if (confirm('Are you sure you want to delete this entry?'))
                onDelete(index);
            }}
          >
            -
          </a>
        </>
      ))}
      <span>{']'}</span>
    </>
  );
}

function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}
