[![npm](https://img.shields.io/npm/v/react-datetime-picker-component.svg)](https://www.npmjs.com/package/react-datetime-picker-component)

# React-Datetime-Picker-Component

## Quick Start

- Install by running `npm install react-datetime-picker-component` or `yarn add react-datetime-picker-component`.
- Import with `import DateTime from "react-datetime-picker-component";`.
- Add `<DateTime onClick={(value) => console.log(value)} />`
- If you need input,
  - import with
    - `import DateTime from "react-datetime-picker-component";` <b>OR</b>
    - `import { DateTimeInput } from "react-datetime-picker-component";`
  - Add
    - `DateTime.Input onClick={(value) => console.log(value)} />` <b>OR</b>
    - `<DateTimeInput onClick={(value) => console.log(value)} />`

## Getting started

### Usage

```js
import React, { useState } from "react";
import DateTime from "react-datetime-picker-component";

function MyApp() {
  const [value, onChange] = useState(new Date());

  return (
    <div className="App">
      <DateTime.Input onClick={console.log} />
      <DateTime notFixedPosition={true} onClick={console.log} />
    </div>
  );
}
```

### Example
#### DateTime: Date
![DateTime: Date](https://github.com/Bhardwaj-Raghav/react-datetime-picker-component/blob/main/examples/date.PNG?raw=true)
#### DateTime: Time
![DateTime: Time](https://github.com/Bhardwaj-Raghav/react-datetime-picker-component/blob/main/examples/time.PNG?raw=true)

## License

The MIT License.
