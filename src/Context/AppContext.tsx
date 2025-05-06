import React, { createContext, useContext, useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

interface FormFields {
  loanAmount: string;
  interestRate: string;
  termYears: string;
}

interface AppContextType {
  emi: number | null;
  setEmi: (emi: number | null) => void;
  formValues: FormFields;
  setFormValues: React.Dispatch<React.SetStateAction<FormFields>>;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextType>({
  emi: null,
  setEmi: () => {},
  formValues: {
    loanAmount: "",
    interestRate: "",
    termYears: "",
  },
  setFormValues: () => {},
  darkMode: false,
  toggleDarkMode: () => {},
});

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [emi, setEmi] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<FormFields>({
    loanAmount: "",
    interestRate: "",
    termYears: "",
  });
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

 
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: darkMode ? '#90caf9' : '#1976d2',
          },
          background: {
            default: darkMode ? '#121212' : '#ffffff',
            paper: darkMode ? '#1e1e1e' : '#ffffff',
          },
        },
      }),
    [darkMode]
  );

  return (
    <AppContext.Provider value={{ 
      emi, 
      setEmi, 
      formValues, 
      setFormValues, 
      darkMode, 
      toggleDarkMode 
    }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};