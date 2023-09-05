import { useState } from "react";

export const useLocalStorage = (
  keyName: string,
  defaultValue: null | Record<string, unknown> | string
) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });
  const setValue = (newValue: Record<string, unknown>) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      console.log("unable to store data");
      /* empty */
    }
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};
