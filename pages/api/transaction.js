import initDB from "@/helpers/initDb";
import Transaction from "../../models/Transaction";
import Authenticate from "@/helpers/authenticate";
import chalk from "chalk";

initDB();

const getTransactions = Authenticate(async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId });
    res.status(200).json({ transactions });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

const createTransaction = Authenticate(async (req, res) => {
  const { userId, body } = req;
  try {
    const newTransaction = await new Transaction({
      userId,
      ...body,
    }).save();

    console.log(chalk.inverse(newTransaction));
    res.status(200).json({ transaction: newTransaction });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

const transaction = (req, res) => {
  switch (req.method) {
    case "GET": {
      getTransactions(req, res);
      break;
    }
    case "POST": {
      createTransaction(req, res);
      break;
    }
    case "PATCH": {
      break;
    }
  }
};

export default transaction;
