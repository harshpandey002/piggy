import initDB from "@/helpers/initDb";
import Transaction from "../../models/Transaction";
import Authenticate from "@/helpers/authenticate";
import chalk from "chalk";

initDB();

const getRange = Authenticate(async (req, res) => {
  try {
    const range = await Transaction.find({ userId: req.userId }, { amount: 1 });

    var max = Math.max.apply(
      Math,
      range.map(function (o) {
        return o.amount;
      })
    );

    var min = Math.min.apply(
      Math,
      range.map(function (o) {
        return o.amount;
      })
    );

    res.status(200).json({ max, min });
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

    res.status(200).json({ transaction: newTransaction });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

const updateTransaction = Authenticate(async (req, res) => {
  const { body } = req;
  const id = body._id;

  delete body._id;

  try {
    await Transaction.findOneAndUpdate({ _id: id }, { ...body });
    res.status(200).json({ message: "Transaction Updated" });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

const transaction = (req, res) => {
  switch (req.method) {
    case "GET": {
      getRange(req, res);
      break;
    }
    case "POST": {
      createTransaction(req, res);
      break;
    }
    case "PATCH": {
      updateTransaction(req, res);
      break;
    }
  }
};

export default transaction;
