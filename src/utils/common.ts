/**
 * Generate a random value betwen two numbers
 */
export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Clamp given value within given range
 */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Get value of given key from local storage
 */
export function getLocalStorage(key: string) {
  return JSON.parse(window.localStorage.getItem(key)!);
}

/**
 * Set value of given key to local storage
 */
export function setLocalStorage(key: string, value: number) {
  window.localStorage.setItem(key, JSON.stringify(value));
}
