import { parseCookies } from "nookies";
import baseUrl from "@/helpers/baseUrl";

const { token } = parseCookies();

export const getRange = async () => {
  const res = await fetch(baseUrl + "transaction", {
    headers: {
      Authorization: token,
    },
  });

  const data = await res.json();

  return [data.min - 100, data.max + 100];
};

const filterTransaction = async (filter, set) => {
  const res = await fetch(baseUrl + "transaction/" + JSON.stringify(filter), {
    headers: {
      Authorization: token,
    },
  });
  const data = await res.json();

  // console.log("%c Get all transactions", "color: yellow");
  if (res.ok) {
    // console.log("%c" + data.transactions, "color: green");
    set(data.transactions);
  } else {
    alert(data);
  }
};

export const getDebounce = function () {
  let timer;
  return function (filter, set) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      filterTransaction(filter, set);
    }, 300);
  };
};

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

const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const groupBadgeStyles = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center",
};

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
  { value: "Update Balance", label: "Update Balance" },
];

export const incomeOp = [
  { value: "Salary", label: "Salary" },
  { value: "Extra Income", label: "Extra Income" },
  { value: "Trading", label: "Trading" },
  { value: "Loan", label: "Loan" },
  { value: "Gift", label: "Gift" },
  { value: "Update Balance", label: "Update Balance" },
];

export const groupedOp = [
  {
    label: "Expense",
    options: expenseOp,
  },
  {
    label: "Income",
    options: incomeOp,
  },
];

export const formatGroupLabel = (data) => {
  return (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );
};
