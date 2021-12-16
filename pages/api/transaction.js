import initDB from "@/helpers/initDb";
import Transaction from "../../models/Transaction";
import Authenticate from "@/helpers/authenticate";

initDB();

const getTransactions = Authenticate(async (req, res) => {
  try {
    const data = await Transaction.find({ userId: req.userId });
    const transactions = data[0].transactions.reverse();
    res.status(200).json({ transactions });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

const createTransaction = Authenticate(async (req, res) => {
  const body = req.body;
  try {
    const transaction = await Transaction.findOne({ userId: req.userId });
    transaction.transactions.push(body);
    transaction.save();

    res.status(200).json({ transaction: body });
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
