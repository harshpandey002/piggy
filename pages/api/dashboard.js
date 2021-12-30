import History from "@/models/History";
import initDB from "@/helpers/initDb";
import Authenticate from "@/helpers/authenticate";
import Transaction from "@/models/Transaction";
import moment from "moment";
import Setting from "@/models/Setting";

initDB();

function getDays(date1, date2) {
  var Difference_In_Time = date2.getTime() - date1.getTime();
  return Difference_In_Time / (1000 * 3600 * 24);
}

const dashboard = Authenticate(async (req, res) => {
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const day = date.getDate();

  try {
    const allTransactions = await Transaction.find(
      { userId: req.userId },
      { amount: 1, createdAt: 1 }
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

    const futureData = await Setting.findOne({
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

    let balance = 0;

    let balanceOverview = allTransactions.map((t) => {
      balance += t.amount;

      return {
        _id: t.id,
        date: moment(t.createdAt).format("MMM Do YYYY"),
        balance,
      };
    });

    for (let i in balanceOverview) {
      if (i == 0) continue;

      if (balanceOverview[i].date == balanceOverview[i - 1].date) {
        balanceOverview.splice(i - 1, 1);
      }
    }

    let days = getDays(futureData.createdAt, futureData.futureDate);

    let futureBalance = Math.floor(
      currentBalance *
        Math.pow(1 + futureData.returns / 100, Math.floor(days / 365))
    );

    const futures = {
      futureBalance,
      returns: futureData.returns,
      futureDate: futureData.futureDate,
      // withoutReturns,
    };

    res.status(200).json({
      walletOverview: responseObj,
      balanceOverview,
      futureData: futures,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error });
  }
});

export default dashboard;
