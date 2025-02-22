import { useEffect, useRef, useState } from 'react';
import { ActionButton } from './ActionButton';
import JsonLine from './JsonLines/JsonLine';
import { JsonObject } from './JsonObject';
import { JsonNodeValueEditor } from './JsonNodeValueEditor';

interface JsonNodeObjectEditorProps {
  level: number;
  value: JsonObject;
  onChange: (value: JsonObject) => void;
}

export function JsonNodeObjectEditor({
  level,
  value,
  onChange,
}: JsonNodeObjectEditorProps) {
  return (
    <>
      <JsonLine level={level}>
        {({ isHovered }) => (
          <>
            {'{ '}
            <ActionButton
              onClick={() => {
                onChange({ ...value, [getDefaultNewKey(value)]: null });
              }}
              visible={isHovered}
            >
              add property
            </ActionButton>
          </>
        )}
      </JsonLine>
      {Object.entries(value).map(([key, nodeValue]) => (
        <JsonObjectEntryEditor
          key={key}
          nodeKey={key}
          value={nodeValue}
          level={level + 1}
          onKeyChange={(newKey) => {
            const newValue = renameObjectKey(value, key, newKey);
            onChange(newValue);
          }}
          onChange={(newValue) => {
            onChange({ ...value, [key]: newValue });
          }}
          onRemove={() => {
            const newValue = { ...value };
            delete newValue[key];
            onChange(newValue);
          }}
        />
      ))}
      <JsonLine level={level}>{'}'}</JsonLine>
    </>
  );
}

interface JsonObjectEntryEditorProps {
  nodeKey: string;
  value: unknown;
  level: number;
  onChange: (value: unknown) => void;
  onKeyChange: (key: string) => void;
  onRemove: () => void;
}

function JsonObjectEntryEditor({
  nodeKey,
  value,
  level,
  onChange,
  onKeyChange,
  onRemove,
}: JsonObjectEntryEditorProps) {
  const isObjectOrArray = typeof value === 'object' && value !== null;

  return (
    <>
      {isObjectOrArray && (
        <>
          <JsonLine level={level}>
            {({ isHovered }) => (
              <>
                <JsonNodeKeyEditor nodeKey={nodeKey} onChange={onKeyChange} />
                <span>: </span>
                <ActionButton onClick={onRemove} visible={isHovered}>
                  remove property
                </ActionButton>
              </>
            )}
          </JsonLine>
          <JsonNodeValueEditor
            value={value}
            onChange={onChange}
            level={level + 1}
          />
        </>
      )}
      {!isObjectOrArray && (
        <JsonLine level={level}>
          {({ isHovered }) => (
            <>
              <JsonNodeKeyEditor nodeKey={nodeKey} onChange={onKeyChange} />
              <span>: </span>

              <JsonNodeValueEditor
                value={value}
                onChange={onChange}
                level={level}
              />

              <ActionButton onClick={onRemove} visible={isHovered}>
                remove property
              </ActionButton>
            </>
          )}
        </JsonLine>
      )}
    </>
  );
}

interface JsonNodeKeyEditorProps {
  nodeKey: string;
  onChange: (nodeKey: string) => void;
}

export function JsonNodeKeyEditor({
  nodeKey,
  onChange,
}: JsonNodeKeyEditorProps) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(nodeKey);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  if (!editing) {
    return (
      <span style={{ color: '#F88' }} onClick={() => setEditing(true)}>
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

function getDefaultNewKey(obj: JsonObject) {
  const keys = new Set(Object.keys(obj));
  let index = 1;
  while (keys.has(`newKey${index}`)) {
    index++;
  }
  return `newKey${index}`;
}
