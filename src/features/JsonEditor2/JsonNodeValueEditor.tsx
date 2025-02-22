import { JsonNodeStringEditor } from './JsonNodeStringEditor';
import { JsonNodeNumberEditor } from './JsonNodeNumberEditor';
import { JsonNodeBooleanEditor } from './JsonNodeBooleanEditor';
import { JsonNodeDefaultValueEditor } from './JsonNodeDefaultValueEditor';
import { JsonNodeObjectEditor } from './JsonNodeObjectEditor';
import { isObject } from './JsonObject';
import { isArray } from './JsonArray';
import { JsonNodeArrayEditor } from './JsonNodeArrayEditor';

interface JsonNodeEditorProps {
  value: unknown;
  onChange: (value: unknown) => void;
  onDelete?: () => void;
  level: number;
}

export function JsonNodeValueEditor({
  value,
  level,
  onChange,
}: JsonNodeEditorProps) {
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
        <JsonNodeArrayEditor level={level} value={value} onChange={onChange} />
      )}
    </>
  );
}
