"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userDataSchema = new mongoose_1.default.Schema({
    userId: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    twitterUsername: { type: String, unique: true, required: true },
    retweetUrl: { type: String, unique: true, required: true },
    walletAddress: { type: String, required: true },
    referrerId: Number,
    balance: Number,
    claimNear: String,
    createdAt: { type: Date, default: new Date() },
});
const userData = mongoose_1.default.model("userData", userDataSchema);
exports.default = userData;
