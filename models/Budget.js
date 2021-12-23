import mongoose from "mongoose";

const budgetSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Budget || mongoose.model("Budget", budgetSchema);
