import mongoose from "mongoose";

const schemaProps = {
  type: Number,
  required: true,
};

const historySchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  lastMonthBalance: schemaProps,
  lastMonthIncome: schemaProps,
  lastMonthExpense: schemaProps,
  lastMonthWaste: schemaProps,
});

export default mongoose.models.History ||
  mongoose.model("History", historySchema);
