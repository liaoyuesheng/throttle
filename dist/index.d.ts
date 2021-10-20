declare function throttle(callback: (...args: any[]) => void, interval: number, trailing?: boolean): (...args: any[]) => void;
declare function throttle(callback: (...args: any[]) => void, useAnimationFrame: boolean): (...args: any[]) => void;
export { throttle as default };
