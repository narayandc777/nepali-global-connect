// src/hooks/useDebounce.ts (or wherever you keep your hooks)
import { useState, useEffect } from 'react';

/**
 * Hook to debounce a value, updating only after a specified delay.
 * Defaults to 500ms delay if none is provided.
 * @param value The value to debounce (e.g., search text).
 * @param delay The delay in milliseconds. Defaults to 500.
 * @returns The debounced value.
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timer to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function: If the value or delay changes before the timeout fires,
    // clear the previous timer. This is the core of debouncing.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Rerun effect if value or delay changes

  return debouncedValue;
}
