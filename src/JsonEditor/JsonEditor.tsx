import { JsonArray } from './JsonArray';
import { JsonNodeArrayEditor } from './JsonNodeArrayEditor';
import { JsonNodeObjectEditor } from './JsonNodeObjectEditor';
import { JsonObject } from './JsonObject';

export interface JsonEditorProps {
  value: JsonObject | JsonArray;
  onChange: (value: JsonObject | JsonArray) => void;
}

export default function JsonEditor({ value, onChange }: JsonEditorProps) {
  return (
    <div className="json-editor" style={{ counterReset: 'json-line' }}>
      {Array.isArray(value) ? (
        <JsonNodeArrayEditor value={value} onChange={onChange} level={0} />
      ) : (
        <JsonNodeObjectEditor value={value} onChange={onChange} level={0} />
      )}
    </div>
  );
}
