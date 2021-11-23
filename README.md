# trilat

Trilateration using 'ml-levenberg-marquardt' library.

## Common usage

```javascript
var trilat = require('trilat');

var input = [
  // [x, y, distance]
  [0.0, 0.0, 10.0],
  [10.0, 10.0, 10.0],
  [10.0, 0.0, 14.142135],
];

var output = trilat(input);
// [ 0, 10 ]
```
