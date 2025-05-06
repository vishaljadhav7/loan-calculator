export const calculateEMI = (principal: number, annualRate: number, years: number): number => {
 
    const monthlyRate = (annualRate / 100) / 12;
    
  
    const totalMonths = years * 12;
    

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
               (Math.pow(1 + monthlyRate, totalMonths) - 1);
    
    return emi;
  };
