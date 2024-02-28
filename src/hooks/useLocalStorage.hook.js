import { useEffect, useState } from 'react';
import { mapItems } from '../helpers/map.helper.js';

export function useLocalStorage(key, parseMap = true) {
  const [data, setData] = useState();

  useEffect(() => {
    const res = JSON.parse(localStorage.getItem(key));
    const data = parseMap ? mapItems(res) : res;
    setData(data);
  }, [key, parseMap]);

  const saveData = (newData) => {
    localStorage.setItem(key, JSON.stringify(newData));
    setData(newData);
  };

  return [data, saveData];
}
