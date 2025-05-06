import React, { createContext, useContext, useState } from 'react';
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
});


export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [emi, setEmi] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<FormFields>({
    loanAmount: "",
    interestRate: "",
    termYears: "",
  });

  return (
    <AppContext.Provider value={{ emi, setEmi, formValues, setFormValues }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context.setEmi || !context.setFormValues) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};