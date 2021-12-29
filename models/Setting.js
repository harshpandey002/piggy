import mongoose from "mongoose";

const settingSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    initialBalance: {
      type: String,
      required: true,
    },
    futureDate: {
      type: Date,
      required: true,
    },
    returns: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Setting ||
  mongoose.model("Setting", settingSchema);
