import initDB from "@/helpers/initDb";
import Transaction from "../../../models/Transaction";
import Authenticate from "@/helpers/authenticate";
import chalk from "chalk";

initDB();

const getQueryObject = (filter) => {
  let queryObj = {};
  let sort = {};

  queryObj.userId = filter.id;

  if (!!filter.max) {
    queryObj.amount = { $lte: filter.max, $gte: filter.min };
  }

  if (!!filter.category) {
    queryObj.category = filter.category;
  }

  if (!!filter.note) {
    queryObj.note = { $regex: filter.note, $options: "i" };
  }

  if (!!filter.amount) {
    sort.amount = filter.amount;
  } else {
    sort.createdAt = filter.createdAt;
  }

  return { find: queryObj, sort };
};

const getTransactions = Authenticate(async (req, res) => {
  let filter = req.query;
  filter = JSON.parse(filter.filter);
  filter.id = req.userId;
  const { find, sort } = getQueryObject(filter);

  // res
  //   .status(200)
  //   .json({ transactions: [{ category: "Transaction Sucessfull" }] });

  try {
    const transactions = await Transaction.find({
      ...find,
    }).sort({
      ...sort,
    });

    res.status(200).json({ transactions });
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
  }
};

export default transaction;
