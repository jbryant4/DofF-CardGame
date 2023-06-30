import { useState, useEffect, createContext, useContext } from 'react';

export const GlobalContext = createContext({
  isMobile: false,
  isAdmin: false,
  setAdmin: _value => {}
});

export const GlobalProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <GlobalContext.Provider value={{ isAdmin, isMobile, setAdmin }}>
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
