import { createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.hook.js';

export const UserContext = createContext({
  userId: 1
});

export const UserContextProvidev = ({ children }) => {
  const [userId, setUserId] = useLocalStorage('userId', false);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
