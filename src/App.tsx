import { useState } from "react";

import { JsonObject } from "./features/JsonEditor/models";
import { JsonNodeObjectEditor } from "./features/JsonEditor/JsonNodeEditor";

function App() {
  const [json, setJson] = useState<JsonObject>({
    text: "Hello",
    value: "World",
    arr: [
      { a: "a", b: "b" },
      { a: "c", b: "d" },
    ],
    nested: { text: "2nd level", value: "haha" },
    new: null,
  });

  return <JsonNodeObjectEditor level={0} value={json} onChange={setJson} />;
}

export default App;
