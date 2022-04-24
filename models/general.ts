import mongoose from "mongoose";

const generalSchema = new mongoose.Schema({
  retweetUrl: String,
});

const general = mongoose.model("general", generalSchema);
export default general;
