"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userDataSchema = new mongoose_1.default.Schema({
    userId: { type: String, unique: true, required: true },
    twitterUsename: { type: String, unique: true, required: true },
    retweetUrl: { type: String, unique: true, required: true },
    createdAt: { type: Date, default: new Date() },
});
const userData = mongoose_1.default.model("airdrop", userDataSchema);
module.exports = userData;
