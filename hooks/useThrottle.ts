import { useState, useEffect, useRef } from "react";

function throttle<T extends (...args: any[]) => any>(func: T, delay: number) {
  let lastCall = 0;
  return function (...args: Parameters<T>) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  } as T;
}

export function useThrottle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T {
  // 使用 useRef 存储节流函数，以便在组件重新渲染时保持引用不变
  const throttledFunc = useRef(throttle(func, delay)).current;

  return throttledFunc;
}
