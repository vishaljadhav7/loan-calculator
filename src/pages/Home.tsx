import React from 'react';
import LoanCalculator from '../components/LoanCalculator';
import { Box } from '@mui/material';
import AmortizationSchedule from '../components/AmortizationSchedule';
import { useAppContext } from '../Context/AppContext';

const Home: React.FC = () => {
const {emi} = useAppContext();

return (
    <Box>
    <LoanCalculator/>
     {emi && <AmortizationSchedule/>}
    </Box>
  );
};

export default Home;