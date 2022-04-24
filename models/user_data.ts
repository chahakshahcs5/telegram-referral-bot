import mongoose from "mongoose";

const userDataSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  twitterUsername: { type: String, required: true },
  retweetUrl: { type: String, required: true },
  walletAddress: { type: String, required: true },
  referrerId: Number,
  balance: Number,
  claimNear: String,
  createdAt: { type: Date, default: new Date() },
});

const userData = mongoose.model("userData", userDataSchema);
export default userData;
