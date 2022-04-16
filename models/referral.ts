import mongoose from "mongoose";

const referralSchema = new mongoose.Schema({
  userId: { type: Number, unique: true, required: true },
  referrerId: { type: Number, required: true },
  createdAt: { type: Date, default: new Date() },
});

const referral = mongoose.model("referral", referralSchema);
export default referral;
