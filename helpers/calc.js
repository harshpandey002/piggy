import Transaction from "@/models/Transaction";
import moment from "moment";

export const calcBudget = async (budgets) => {
  const updatedBudgets = await Promise.all(
    budgets.map(async (budget) => {
      const transactions = await Transaction.find(
        {
          userId: budget.userId,
          category: budget.category,
          createdAt: {
            $gte: new Date(budget.startDate),
            $lte: new Date(budget.endDate),
          },
        },
        { amount: 1 }
      );

      let balance = 0;

      transactions.forEach((data) => {
        balance += data.amount;
      });

      let expend;
      balance = budget.limit - -1 * balance;

      if (balance < 0) {
        expend = 100;
      } else {
        expend = Math.floor(100 - (balance / budget.limit) * 100);
      }

      budget.balance = balance;
      budget.expend = expend;

      return budget;
    })
  );

  return updatedBudgets;
};

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

function getDates(startDate, stopDate) {
  var dateArray = new Array();
  var currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
}

export function getChartData(budget, transactions) {
  const dateRange = getDates(
    new Date(budget.startDate),
    new Date(budget.endDate)
  );

  let transactionData = JSON.parse(JSON.stringify(transactions));
  const transactionDates = transactionData.map((data) => {
    let date = new Date(data.createdAt);
    return { day: date.getDate(), amount: data.amount };
  });

  let chart = dateRange.map((data) => {
    let date = new Date(data);
    let amount = 0;
    let filterDays = transactionDates.filter(
      (data) => data.day == date.getDate()
    );

    if (filterDays.length) {
      filterDays.forEach((data) => {
        amount += data.amount;
      });
    }

    return { createdAt: moment(data).format("MMM DD"), amount: -1 * amount };
  });

  return chart;
}
