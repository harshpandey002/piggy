import mongoose from "mongoose";

const transactionSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    transactions: [
      {
        type: new mongoose.Schema(
          {
            gain: {
              type: Boolean,
              required: true,
            },
            category: {
              type: String,
              required: true,
            },
            necessary: {
              type: Boolean,
              default: true,
            },
            amount: {
              type: Number,
              required: true,
            },
            note: {
              type: String,
            },
          },
          { timestamps: true }
        ),
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);
