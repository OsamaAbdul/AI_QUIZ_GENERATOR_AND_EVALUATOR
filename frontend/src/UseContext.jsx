import { createContext, useContext, useEffect, useState } from 'react';

// Create context
const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Optional: Load user from localStorage on first render
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook for easier usage
export const useUser = () => useContext(UserContext);
