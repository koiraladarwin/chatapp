import { createContext, useState, ReactNode, useEffect } from 'react';

export const AuthContext = createContext<string | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      try {
        const payload = JSON.parse(atob(jwt.split('.')[1]));
        const userIdFromClaims = payload.jti
        setUserId(userIdFromClaims);
      } catch (error) {
        console.error('Failed to parse JWT', error);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={userId}>
      {children}
    </AuthContext.Provider>
  );
};

