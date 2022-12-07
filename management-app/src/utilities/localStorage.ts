export function getLocalStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function setLocalStorage(key: string, value: string): void | null {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    return null;
  }
}
