import React, { useState, useEffect } from 'react';

const useLocalStorage = (defaultValue, key) => {
    const [value, setValue] = useState(() => {
      const localValue = window.localStorage.getItem(key);
      return localValue !== null
        ? JSON.parse(localValue)
        : defaultValue;
    });
    useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
  }

  export default useLocalStorage;