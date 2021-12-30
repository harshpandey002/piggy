import History from "@/models/History";
import initDB from "@/helpers/initDb";
import Authenticate from "@/helpers/authenticate";
import Transaction from "@/models/Transaction";

initDB();

const dashboard = Authenticate(async (req, res) => {
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const day = date.getDate();

  try {
    const allTransactions = await Transaction.find(
      { userId: req.userId },
      { amount: 1 }
    );

    const recentTransactions = await Transaction.find(
      {
        userId: req.userId,
        category: { $ne: "Update Balance" },
        createdAt: { $gte: firstDay, $lt: lastDay },
      },
      { amount: 1, gain: 1, necessary: 1 }
    );

    const historyData = await History.findOne({
      userId: req.userId,
    });

    const {
      lastMonthBalance,
      lastMonthIncome,
      lastMonthExpense,
      lastMonthWaste,
    } = historyData;

    let currentBalance = 0;
    let currentIncome = 0;
    let currentExpense = 0;
    let currentWaste = 0;

    allTransactions.forEach((t) => {
      currentBalance += t.amount;
    });

    recentTransactions.forEach((t) => {
      if (t.gain) {
        currentIncome += t.amount;
      } else {
        currentExpense += -1 * t.amount;
      }
      if (!t.necessary) {
        currentWaste += -1 * t.amount;
      }
    });

    const responseObj = {
      lastMonthBalance,
      lastMonthIncome,
      lastMonthExpense,
      lastMonthWaste,
      balancePerDay: Math.floor(currentBalance / day),
      incomePerDay: Math.floor(currentIncome / day),
      expensePerDay: Math.floor(currentExpense / day),
      wastePerDay: Math.floor(currentWaste / day),
      currentBalance,
      currentIncome,
      currentExpense,
      currentWaste,
    };

    res.status(200).json({
      walletOverview: responseObj,
      balanceOverview: [],
      futureData: {},
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error });
  }
});

export default dashboard;
