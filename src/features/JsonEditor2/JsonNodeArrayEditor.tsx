import { ActionButton } from './ActionButton';
import JsonLine from './JsonLines/JsonLine';
import { JsonNodeValueEditor } from './JsonNodeValueEditor';
import { JsonArray } from './JsonArray';

interface JsonNodeArrayEditorProps {
  level: number;
  value: JsonArray;
  onChange: (value: JsonArray) => void;
}

export function JsonNodeArrayEditor({
  level,
  value,
  onChange,
}: JsonNodeArrayEditorProps) {
  return (
    <>
      <JsonLine level={level}>
        {({ isHovered }) => (
          <>
            {'[ '}
            <ActionButton
              onClick={() => {
                onChange([...value, null]);
              }}
              visible={isHovered}
            >
              add item
            </ActionButton>
          </>
        )}
      </JsonLine>
      {(value as unknown[]).map((nodeValue, index) => (
        <JsonArrayElementEditor
          key={index}
          nodeKey={index.toString()}
          value={nodeValue}
          level={level + 1}
          onChange={(newValue) => {
            const newArray = [...value];
            newArray[index] = newValue;
            onChange(newArray);
          }}
          onRemove={() => {
            const newArray = [...value];
            newArray.splice(index, 1);
            onChange(newArray);
          }}
        />
      ))}
      <JsonLine level={level}>{']'}</JsonLine>
    </>
  );
}

interface JsonArrayElementEditorProps {
  nodeKey: string;
  value: unknown;
  level: number;
  onChange: (value: unknown) => void;
  onRemove: () => void;
}

function JsonArrayElementEditor({
  nodeKey,
  value,
  level,
  onChange,
  onRemove,
}: JsonArrayElementEditorProps) {
  const isObjectOrArray = typeof value === 'object' && value !== null;

  return (
    <>
      {isObjectOrArray && (
        <>
          <JsonLine level={level}>
            {({ isHovered }) => (
              <>
                <span style={{ color: '#F88' }}>{nodeKey}</span>
                <span>: </span>
                <ActionButton onClick={onRemove} visible={isHovered}>
                  remove item
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
              <span style={{ color: '#F88' }}>{nodeKey}</span>
              <span>: </span>

              <JsonNodeValueEditor
                value={value}
                onChange={onChange}
                level={level}
              />
              <ActionButton onClick={onRemove} visible={isHovered}>
                remove item
              </ActionButton>
            </>
          )}
        </JsonLine>
      )}
    </>
  );
}
