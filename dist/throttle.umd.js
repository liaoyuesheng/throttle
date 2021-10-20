(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.throttle = factory());
})(this, (function () { 'use strict';

    function throttleInterval(callback, interval = 1000 / 60, trailing = true) {
        let allow = true;
        let pending = false;
        return function (...args) {
            const handle = () => {
                pending = allow = false;
                callback(...args);
                setTimeout(() => {
                    if (pending === true) {
                        handle();
                        return;
                    }
                    allow = true;
                }, interval);
            };
            if (allow) {
                handle();
                return;
            }
            if (trailing) {
                pending = true;
            }
        };
    }
    function throttleAnimationFrame(callback) {
        if (!window || !window.requestAnimationFrame) {
            console.warn('[throttle warn]: requestAnimationFrame is not supported, throttle will use fixed time');
            return throttleInterval(callback, 1000 / 60, true);
        }
        let running = false;
        return function (...args) {
            if (!running) {
                running = true;
                window.requestAnimationFrame(() => {
                    running = false;
                    callback(...args);
                });
            }
        };
    }
    function throttle(callback, interval, trailing = true) {
        if (typeof interval === 'number' || interval === false) {
            return throttleInterval(callback, interval === false ? undefined : interval, trailing);
        }
        if (interval === true) {
            return throttleAnimationFrame(callback);
        }
    }

    return throttle;

}));
//# sourceMappingURL=throttle.umd.js.map
