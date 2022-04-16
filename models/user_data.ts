import mongoose from "mongoose";

const userDataSchema = new mongoose.Schema({
  userId: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  twitterUsername: { type: String, unique: true, required: true },
  retweetUrl: { type: String, unique: true, required: true },
  balance: Number,
  createdAt: { type: Date, default: new Date() },
});

const userData = mongoose.model("userData", userDataSchema);
export default userData;
