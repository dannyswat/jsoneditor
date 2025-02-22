# @dannyswat/jsoneditor

This project targets to build a user-friendly react component to edit a JSON.

It is in a initial stage.

JsonNodeEditor (value, onChange)

- JsonNodeDefaultValueEditor
- JsonNodeStringEditor (customEditor)
- JsonNodeNumberEditor
- JsonNodeBooleanEditor
- JsonNodeObjectEditor
- JsonNodeArrayEditor

JsonNodeObjectEditor

- AddEntryButton
- JsonObjectEntryEditor
  - JsonObjectKeyEditor
  - JsonObjectValueEditor
    - JsonNodeEditor
    - RemoveEntryButton

JsonNodeArrayEditor

- AddElementButton
- JsonArrayElementEditor
  - JsonNodeEditor
  - RemoveElementButton

```json
{ add property
    "key1": "value1", remove property | reset value
    "key2": "value2",
    "key3": remove property
    { add property
        "sub1": true,
        "sub2": 0
    },
    "key4": remove property
    [ add item
        { add property
            "sub1": false,
            "sub2": "abc"
        }, remove item
        "element2", remove item
    ]
}
```
