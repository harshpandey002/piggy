import Authenticate from "@/helpers/authenticate";
import initDB from "@/helpers/initDb";
import Budget from "@/models/Budget";
import Setting from "@/models/Setting";
import Transaction from "@/models/Transaction";

initDB();

async function createTransaction(req, res) {
  let amount = req.body;
  amount = JSON.parse(JSON.stringify(amount.initialBalance));
  try {
    const transactions = await Transaction.find(
      { userId: req.userId },
      { amount: 1 }
    );

    const settingInfo = await Setting.findOne({ userId: req.userId });

    let result = settingInfo.initialBalance;

    transactions.forEach((d) => {
      result = result + d.amount;
    });

    result = amount - result;

    const body = {
      userId: req.userId,
      necessary: true,
      gain: result > 0,
      category: "Update Balance",
      amount: result,
      note: "",
    };

    await new Transaction(body).save();

    await Setting.updateOne(
      { userId: req.userId },
      { $set: { initialBalance: amount } }
    );

    res.status(200).json({ message: "Current balance updated" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
}

const updateSettings = Authenticate(async (req, res) => {
  const id = req.userId;
  let settingData = req.body;
  settingData = JSON.parse(JSON.stringify(settingData));
  try {
    if (settingData.initialBalance) {
      createTransaction(req, res);
      return;
    }

    await Setting.updateOne(
      { userId: id },
      {
        $set: {
          futureDate: settingData.futureDate,
          returns: settingData.returns || 0,
        },
      }
    );

    res.status(200).json({ message: "Settings Updated" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error });
  }
});

const resetAccount = Authenticate(async (req, res) => {
  const id = req.userId;
  let amount = req.body;
  amount = JSON.parse(JSON.stringify(amount.initialBalance));
  try {
    await Transaction.deleteMany({ userId: id });
    await Budget.deleteMany({ userId: id });

    const body = {
      userId: id,
      necessary: true,
      gain: true,
      category: "Update Balance",
      amount,
      note: "",
    };

    await new Transaction(body).save();

    await Setting.updateOne(
      { userId: req.userId },
      { $set: { initialBalance: amount } }
    );

    res.status(200).json({ message: "Account Reset Successful" });
  } catch (error) {
    res.status(404).json({ error });
  }
});

const getSettings = Authenticate(async (req, res) => {
  const id = req.userId;
  try {
    const settings = await Setting.find({ userId: id });
    res.status(200).json(settings[0]);
  } catch (error) {
    res.status(404).json({ error });
  }
});

const setting = async (req, res) => {
  switch (req.method) {
    case "GET":
      getSettings(req, res);
      break;
    case "POST":
      updateSettings(req, res);
      break;
    case "DELETE":
      resetAccount(req, res);
      break;
  }
};

export default setting;
