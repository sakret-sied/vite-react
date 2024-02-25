import { useEffect, useState } from 'react';
import { mapItems } from '../helpers/map.helper.js';

export function useLocalStorage(key) {
  const [data, setData] = useState();

  useEffect(() => {
    const res = JSON.parse(localStorage.getItem(key));
    setData(mapItems(res));
  }, [key]);

  const saveData = (newData) => {
    localStorage.setItem(key, JSON.stringify(newData));
    setData(newData);
  };

  return [data, saveData];
}
