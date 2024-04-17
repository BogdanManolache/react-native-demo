import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../lib/appwrite';

const GlobalContext = createContext(null);

export function useGlobalContext() {
  return useContext(GlobalContext);
}

export default function GlobalProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCurrentUser()
      .then(res => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
      }}>
      {children}
    </GlobalContext.Provider>
  );
}
