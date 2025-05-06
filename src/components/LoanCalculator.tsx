import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormHelperText,
} from "@mui/material";
import CalculateIcon from "@mui/icons-material/Calculate";
import { calculateEMI } from "../util/calculateEMI";
import { useAppContext } from "../Context/AppContext";


interface FormFields {
  loanAmount: string;
  interestRate: string;
  termYears: string;
}

interface FormErrors {
  loanAmount: string | null;
  interestRate: string | null;
  termYears: string | null;
}

const LoanCalculator: React.FC = () => {

  const {setEmi , setFormValues, formValues } = useAppContext();
  
  const [errors, setErrors] = useState<FormErrors>({
    loanAmount: null,
    interestRate: null,
    termYears: null,
  });


  const handleFormChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const target = e.target;
    if (!target || !target.name) return;

    const { name, value } = target;

    setFormValues({
      ...formValues,
      [name]: value,
    });

    // Clear error when user starts typing again
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  // Validate and convert input to number
  const validateNumericInput = (
    value: string,
    fieldName: keyof FormFields
  ): number => {
    const parsedValue = parseFloat(value);

    if (isNaN(parsedValue)) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: `${
          fieldName === "loanAmount"
            ? "amount"
            : fieldName === "interestRate"
            ? "rate"
            : "terms (years)"
        } must be a \`number\` type, but the final value was: \`NaN\` (cast from the value \`"${value}"\`).`,
      }));
      return NaN;
    }

    return parsedValue;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({
      loanAmount: null,
      interestRate: null,
      termYears: null,
    });

    const principal = validateNumericInput(formValues.loanAmount, "loanAmount");
    const rate = validateNumericInput(formValues.interestRate, "interestRate");
    const years = validateNumericInput(formValues.termYears, "termYears");

    if (!isNaN(principal) && !isNaN(rate) && !isNaN(years)) {
      const calculatedEMI = calculateEMI(principal, rate, years);
      setEmi(calculatedEMI);
    } else {
      setEmi(null);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Loan Calculator Dashboard
      </Typography>

      <Box
        sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
        component="form"
        onChange={handleFormChange}
        onSubmit={handleSubmit}
        noValidate
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            sx={{ minWidth: "250px" }}
            label="Loan Amount"
            name="loanAmount"
            value={formValues.loanAmount}
            variant="outlined"
            error={!!errors.loanAmount}
            placeholder="e.g., 100000"
          />
          {errors.loanAmount && (
            <FormHelperText error>{errors.loanAmount}</FormHelperText>
          )}
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            sx={{ minWidth: "250px" }}
            label="Interest Rate"
            name="interestRate"
            value={formValues.interestRate}
            variant="outlined"
            error={!!errors.interestRate}
            placeholder="e.g., 5.5"
          />
          {errors.interestRate && (
            <FormHelperText error>{errors.interestRate}</FormHelperText>
          )}
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            sx={{ minWidth: "250px" }}
            label="Term (Years)"
            name="termYears"
            value={formValues.termYears}
            variant="outlined"
            error={!!errors.termYears}
            placeholder="e.g., 30"
          />
          {errors.termYears && (
            <FormHelperText error>{errors.termYears}</FormHelperText>
          )}
        </Box>
        <Box sx={{ mt: 2, textAlign: "center", display: "block" }}>
          <Button
            type="submit"
            variant="contained"
            startIcon={<CalculateIcon />}
          >
            Calculate
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoanCalculator;
