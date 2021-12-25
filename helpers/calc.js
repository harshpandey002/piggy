import Transaction from "@/models/Transaction";

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

      let balance = transactions.reduce(
        (prev, curr) => prev.amount + curr.amount
      );

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
