function throttleInterval(callback: (...args: any[]) => void, interval: number = 1000 / 60, trailing = true) {
  let allow = true
  let pending = false
  return function (...args) {
    const handle = () => {
      pending = allow = false
      callback(...args)
      setTimeout(() => {
        if (pending === true) {
          handle()
          return
        }
        allow = true
      }, interval)
    }
    if (allow) {
      handle()
      return
    }
    if (trailing) {
      pending = true
    }
  }
}

function throttleAnimationFrame(callback) {
  if (!window || !window.requestAnimationFrame) {
    console.warn('[throttle warn]: requestAnimationFrame is not supported, throttle will use fixed time')
    return throttleInterval(callback, 1000 / 60, true)
  }
  let running = false
  return function (...args) {
    if (!running) {
      running = true
      window.requestAnimationFrame(() => {
        running = false
        callback(...args)
      })
    }
  }
}

function throttle(callback: (...args: any[]) => void, interval: number, trailing?: boolean): (...args: any[]) => void
function throttle(callback: (...args: any[]) => void, useAnimationFrame: boolean): (...args: any[]) => void
function throttle(callback: (...args: any[]) => void, interval: number | boolean, trailing = true) {
  if (typeof interval === 'number' || interval === false) {
    return throttleInterval(callback, interval === false ? undefined : interval, trailing)
  }

  if (interval === true) {
    return throttleAnimationFrame(callback)
  }
}

export {throttle as default}
