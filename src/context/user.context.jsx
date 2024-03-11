import { createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.hook.js';
import { defaultOne } from '../helpers/data.helper.js';

export const UserContext = createContext({
  userId: 1
});

export const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useLocalStorage('userId', defaultOne);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
