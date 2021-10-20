# @liaoys/throttle

A throttle function base on interval time or browser's animation frame.

See [example](https://liaoyuesheng.github.io/throttle/)

## Installation
```
npm install @liaoys/throttle
```
## Usage

Use interval time

```javascript
import throttle from '@liaoys/throttle'

const throttleHandler = throttle((e) => {
  console.log(e.target.scrollTop)
}, 200)

window.addEventListener('scroll', throttleHandler);
```

Use animationFrame

```javascript
import throttle from '@liaoys/throttle'

const throttleHandler = throttle((e) => {
  console.log(e.target.scrollTop)
}, true)

window.addEventListener('scroll', throttleHandler);
```

## API

### throttle(callback: (...args: any[]) => void, interval: number, trailing?: boolean)
### throttle(callback: (...args: any[]) => void, useAnimationFrame: boolean)

Returns `Function`

Throttle execution of a function.

#### callback

Type: `Function`

The original function executed at intervals.

#### interval

Type: `number`

Default: `1000 / 60`

Interval between function executions. Unit: ms.

#### trailing

Type: `boolean`

Default: `true`

The original function will be executed one final time after the last of throttle function execution. 

#### useAnimationFrame

Type: `boolean`

Original function will be executed at the browser's animation frames. Source codes use `window.requestAnimationFrame()` to execute original function.
