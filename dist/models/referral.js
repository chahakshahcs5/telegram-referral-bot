"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const referralSchema = new mongoose_1.default.Schema({
    userId: { type: Number, unique: true, required: true },
    referrerId: { type: Number, required: true },
    createdAt: { type: Date, default: new Date() },
});
const referral = mongoose_1.default.model("referral", referralSchema);
exports.default = referral;
