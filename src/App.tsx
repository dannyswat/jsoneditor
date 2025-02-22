import { useState } from 'react';

import JsonEditor from './features/JsonEditor2/JsonEditor';
import { isObject, JsonObject } from './features/JsonEditor2/JsonObject';

function App() {
  const [json, setJson] = useState<JsonObject>({
    text: 'Hello',
    value: 'World',
    arr: [
      { a: 'a', b: 'b' },
      { a: 'c', b: 'd' },
    ],
    nested: { text: '2nd level', value: 'haha' },
    new: null,
  });

  return (
    <JsonEditor
      value={json}
      onChange={(value) => {
        if (isObject(value)) setJson(value);
      }}
    />
  );
}

export default App;
