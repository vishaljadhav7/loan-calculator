import React, { createContext, useContext, useState } from 'react';

interface AppContextType {
  emi: number | null;
  setEmi: (emi: number | null) => void;
}

const AppContext = createContext<AppContextType>({
  emi: null,
  setEmi: () => {},
});


export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [emi, setEmi] = useState<number | null>(null);

  return (
    <AppContext.Provider value={{ emi, setEmi }}>
      {children}
    </AppContext.Provider>
  );
};


export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context.setEmi) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};