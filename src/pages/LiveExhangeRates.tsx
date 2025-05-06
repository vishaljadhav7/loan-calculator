import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

interface ICurrencyInfo {
  base_code: string;
  conversion_rates: {
    [key: string]: number;
  };
}

const LiveExchangeRates: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currencyInfo, setCurrencyInfo] = useState<ICurrencyInfo>({
    base_code: "",
    conversion_rates: {},
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currency, setCurrency] = useState<string>("USD");

  // List of available currencies
  const currencies = [
    "USD", 
    "INR", 
    "EUR", 
    "GBP",  
    "JPY",  
    "AUD",  
    "CAD",  
    "CHF", 
    "CNY", 
    "AED", 
  ];

  const getAllRates = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(
        `https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_REACT_API}/latest/${currency}`
      );
      if (res.status !== 200) {
        throw new Error("Error while fetching exchange rates!");
      }
      const { data } = res;
      setCurrencyInfo({
        base_code: data.base_code,
        conversion_rates: data.conversion_rates,
      });
    } catch (error: any) {
      setError(error.message || "Failed to fetch exchange rates");
    } finally {
      setLoading(false);
    }
  };


 
  useEffect(() => {
    getAllRates();
  }, [currency]); 

  
  const rateEntries = Object.entries(currencyInfo.conversion_rates).map(
    ([code, rate]) => ({
      code,
      rate,
    })
  );

  // Pagination logic
  const paginatedRates = rateEntries.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); 
  };

  const handleCurrencyChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCurrency(event.target.value as string);
    setPage(0); 
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 2, my: 2 }}>
      <Typography variant="h6" component="h2" gutterBottom align="center">
        Live Exchange Rates (Base: {currencyInfo.base_code || currency})
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="currency-select-label">Base Currency</InputLabel>
        <Select
          labelId="currency-select-label"
          value={currency}
          label="Base Currency"
          onChange={handleCurrencyChange}
        >
          {currencies.map((curr) => (
            <MenuItem key={curr} value={curr}>
              {curr}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && rateEntries.length === 0 && (
        <Typography align="center" color="text.secondary" sx={{ my: 2 }}>
          No exchange rates available.
        </Typography>
      )}

      {!loading && !error && rateEntries.length > 0 && (
        <Paper sx={{ p: 2, boxShadow: 1 }}>
          <TableContainer sx={{ maxHeight: 400, overflow: "auto" }}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ backgroundColor: "grey.100", fontWeight: "bold" }}
                  >
                    Currency Code
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ backgroundColor: "grey.100", fontWeight: "bold" }}
                  >
                    Exchange Rate
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedRates.map((entry) => (
                  <TableRow
                    key={entry.code}
                    sx={{ "&:hover": { backgroundColor: "grey.50" } }}
                  >
                    <TableCell align="center">{entry.code}</TableCell>
                    <TableCell align="center">{entry.rate.toFixed(4)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={rateEntries.length}
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

export default LiveExchangeRates;