import { useEffect, useState } from 'react';

export function useLocalStorage(key, func = false) {
  const [data, setData] = useState();

  useEffect(() => {
    const res = JSON.parse(localStorage.getItem(key));
    const data = func ? func(res) : res;
    setData(data);
  }, [key, func]);

  const saveData = (newData) => {
    localStorage.setItem(key, JSON.stringify(newData));
    setData(newData);
  };

  return [data, saveData];
}
