import Budget from "@/models/Budget";
import Transaction from "@/models/Transaction";
import initDB from "@/helpers/initDb";
import { calcBudget, getChartData, getDates } from "@/helpers/calc";
import Authenticate from "@/helpers/authenticate";

initDB();

const budgetDetail = Authenticate(async (req, res) => {
  const id = req.query.id;
  try {
    let budget = await Budget.find({ _id: id });
    budget = JSON.parse(JSON.stringify(budget));
    budget = await calcBudget(budget);
    budget = budget[0];

    let transactions = await Transaction.find(
      {
        userId: budget.userId,
        category: budget.category,
        createdAt: {
          $gte: new Date(budget.startDate),
          $lte: new Date(budget.endDate),
        },
      },
      { amount: 1, createdAt: 1, note: 1 }
    ).sort({ createdAt: -1 });

    let chart = getChartData(budget, transactions);

    res.status(200).json({ transactions, chart, detail: budget });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

export default budgetDetail;
