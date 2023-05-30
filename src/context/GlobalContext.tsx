import React, { useState, useEffect, createContext, useContext } from 'react';

export const GlobalContext = createContext({
  isMobile: false
});

export const GlobalProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <GlobalContext.Provider value={{ isMobile }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useScreenSize = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useScreenSize must be used within a ScreenSizeProvider');
  }

  return context.isMobile;
};
