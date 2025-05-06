import React, { useEffect, useState } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TablePagination,
  Button,
  useTheme
} from '@mui/material';
import { useAppContext } from '../Context/AppContext';

interface AmortizationRow {
  month: number;
  payment: number;
  principalPaid: number;
  interestPaid: number;
  remainingBalance: number;
}

const AmortizationSchedule: React.FC = () => {
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationRow[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const theme = useTheme();
  
  const { formValues, emi, setEmi } = useAppContext();
  const { interestRate, loanAmount, termYears } = formValues;

  const generateAmortizationSchedule = (
    principal: number,
    annualRate: number,
    years: number,
    emi: number
  ): AmortizationRow[] => {
    const monthlyRate = (annualRate / 100) / 12;
    const totalMonths = years * 12;
    let remainingBalance = principal;
    const schedule: AmortizationRow[] = [];

    for (let month = 1; month <= totalMonths; month++) {
      const interestPaid = remainingBalance * monthlyRate;
      const principalPaid = emi - interestPaid;
      remainingBalance = remainingBalance - principalPaid;

      if (remainingBalance < 0) remainingBalance = 0;

      schedule.push({
        month,
        payment: emi,
        principalPaid,
        interestPaid,
        remainingBalance,
      });
    }

    return schedule;
  };

  useEffect(() => {
    if (!emi) {
      setAmortizationSchedule([]);
      return;
    }

    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate);
    const years = parseFloat(termYears);

    if (isNaN(principal) || isNaN(rate) || isNaN(years)) {
      setAmortizationSchedule([]);
      return;
    }

    setAmortizationSchedule(generateAmortizationSchedule(principal, rate, years, emi));
    setPage(0);
  }, [emi, loanAmount, interestRate, termYears]);

  const handleChangePage = (_, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); 
  };

  const paginatedSchedule = amortizationSchedule.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ padding: 2, marginY: 2 }}>
      <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-around"}}>
        <Typography variant="h6" component="h1" gutterBottom align="center">
          Monthly EMI: {emi?.toFixed(2)}
        </Typography>    
         <Button 
          color='primary'
         onClick={() => setEmi(null)}>
          RESET TABLE
         </Button>
      </Box>
      {amortizationSchedule.length > 0 && (
        <Paper sx={{ p: 2, boxShadow: 1 }}>
          <Typography variant="h6" component="h2" gutterBottom align="center">
            Amortization Schedule (USD)
          </Typography>
          <TableContainer sx={{ maxHeight: 400, overflow: 'auto' }}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ 
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'grey.100', 
                    fontWeight: 'bold' 
                  }}>
                    Month
                  </TableCell>
                  <TableCell align="center" sx={{ 
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'grey.100', 
                    fontWeight: 'bold' 
                  }}>
                    Payment
                  </TableCell>
                  <TableCell align="center" sx={{ 
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'grey.100', 
                    fontWeight: 'bold' 
                  }}>
                    Principal Paid
                  </TableCell>
                  <TableCell align="center" sx={{ 
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'grey.100', 
                    fontWeight: 'bold' 
                  }}>
                    Interest Paid
                  </TableCell>
                  <TableCell align="center" sx={{ 
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'grey.100', 
                    fontWeight: 'bold' 
                  }}>
                    Remaining Balance
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedSchedule.map((row) => (
                  <TableRow
                    key={row.month}
                    sx={{ 
                      '&:hover': { 
                        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'grey.50' 
                      } 
                    }}
                  >
                    <TableCell align="center">{row.month}</TableCell>
                    <TableCell align="center">${row.payment.toFixed(2)}</TableCell>
                    <TableCell align="center">${row.principalPaid.toFixed(2)}</TableCell>
                    <TableCell align="center">${row.interestPaid.toFixed(2)}</TableCell>
                    <TableCell align="center">${row.remainingBalance.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={amortizationSchedule.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </Box>
  );
};

export default AmortizationSchedule;