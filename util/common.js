export const dropStyles1 = {
  option: (provided, state) => ({
    ...provided,
  }),
  menuList: (provided, state) => ({
    ...provided,
    // maxHeight: 200,
  }),
  control: (provided, state) => ({
    ...provided,
    borderColor: "#cccccc",
    borderRadius: 5,
    boxShadow: "none",
    "&:focus": {
      boxShadow: "none",
    },
    "&:hover": {
      borderColor: "#8a8a8a",
    },
  }),

  container: (provided, state) => ({
    ...provided,
    width: "100%",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    padding: "0rem 0.5rem",
    cursor: "pointer",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
  }),
};

export const dropStyles2 = {
  option: (provided, state) => ({
    ...provided,
  }),
  menuList: (provided, state) => ({
    ...provided,
    // maxHeight: 200,
  }),
  control: (provided, state) => ({
    ...provided,
    border: "none",
    borderBottom: "1px solid #cccccc",
    borderRadius: 0,
    boxShadow: "none",
    fontSize: "1.4rem",
    "&:focus": {
      boxShadow: "none",
    },
    "&:hover": {
      borderColor: "#8a8a8a",
    },
  }),

  container: (provided, state) => ({
    ...provided,
    width: "100%",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    padding: "0rem 0.3rem",
    cursor: "pointer",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
  }),
};

export const getTheme = (theme) => ({
  ...theme,
  borderRadius: 0,
  colors: {
    ...theme.colors,
    primary25: "#f3f3f3",
    primary50: "#e6e6e6",
    primary: "#272727",
  },
});

export const expenseOp = [
  { value: "Food and Drinks", label: "Food and Drinks" },
  { value: "Education", label: "Education" },
  { value: "Gym Essentials", label: "Gym Essentials" },
  { value: "Groceries", label: "Groceries" },
  { value: "Transport", label: "Transport" },
  { value: "Personal", label: "Personal" },
  { value: "Bills & Fees", label: "Bills & Fees" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Shopping", label: "Shopping" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Car", label: "Car" },
  { value: "Home", label: "Home" },
];

export const incomeOp = [
  { value: "Salary", label: "Salary" },
  { value: "Extra Income", label: "Extra Income" },
  { value: "Trading", label: "Trading" },
  { value: "Loan", label: "Loan" },
  { value: "Gift", label: "Gift" },
  { value: "Other", label: "Other" },
];
