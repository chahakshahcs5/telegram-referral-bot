"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const telegraf_1 = require("telegraf");
const json2csv_1 = require("json2csv");
require("dotenv").config();
const constant_1 = require("./constant");
const user_data_1 = __importDefault(require("./models/user_data"));
const referral_1 = __importDefault(require("./models/referral"));
const bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN || "");
bot.use((0, telegraf_1.session)());
bot.start((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        bot.telegram.sendMessage(ctx.chat.id, (0, constant_1.initMsg)(ctx.from.first_name));
        bot.telegram.sendMessage(ctx.chat.id, constant_1.initTask, {
            reply_markup: {
                keyboard: constant_1.initKeyboard,
                resize_keyboard: true,
            },
        });
        (_a = ctx.session) !== null && _a !== void 0 ? _a : (ctx.session = {
            state: "start",
            twitterUsername: "",
            retweetUrl: "",
            walletAddress: "",
            claimNear: "",
        });
        if (ctx.startPayload && ctx.from.id.toString() != ctx.startPayload) {
            yield referral_1.default.create({
                userId: ctx.from.id,
                referrerId: ctx.startPayload,
            });
        }
    }
    catch (error) { }
}));
bot.hears("Start Tasks", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield user_data_1.default.findOne({ userId: ctx.from.id });
        if (data) {
            bot.telegram.sendMessage(ctx.chat.id, constant_1.claimedMsg, {
                reply_markup: {
                    keyboard: constant_1.initKeyboard,
                    resize_keyboard: true,
                },
            });
            ctx.session = {
                state: "",
                twitterUsername: "",
                retweetUrl: "",
                walletAddress: "",
                claimNear: "",
            };
        }
        else {
            bot.telegram.sendMessage(ctx.chat.id, constant_1.followTweeter, {
                reply_markup: {
                    keyboard: constant_1.cancelKeyboard,
                    resize_keyboard: true,
                },
            });
            ctx.session = {
                state: "twitter",
                twitterUsername: "",
                retweetUrl: "",
                walletAddress: "",
                claimNear: "",
            };
        }
    }
    catch (error) {
        console.log(error);
    }
}));
bot.hears("🚫 Cancel", (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, constant_1.initTask, {
        reply_markup: {
            keyboard: constant_1.initKeyboard,
            resize_keyboard: true,
        },
    });
    ctx.session = {
        state: "",
        twitterUsername: "",
        retweetUrl: "",
        walletAddress: "",
        claimNear: "",
    };
});
bot.hears("💰 Check Your Balance", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield user_data_1.default.findOne({ userId: ctx.from.id });
        bot.telegram.sendMessage(ctx.chat.id, (0, constant_1.showBalance)(data ? data.balance : 0, ctx.from.first_name), {
            reply_markup: {
                keyboard: constant_1.initKeyboard,
                resize_keyboard: true,
            },
        });
    }
    catch (error) {
        console.log(error);
    }
}));
bot.hears("🗣 Invitation Link", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const referres = yield referral_1.default.find({ referrerId: ctx.from.id });
        bot.telegram.sendMessage(ctx.chat.id, (0, constant_1.showInviteLink)(ctx.from.id, referres.length, process.env.BOT_USERNAME || "", ctx.from.first_name), {
            reply_markup: {
                keyboard: constant_1.initKeyboard,
                resize_keyboard: true,
            },
        });
    }
    catch (error) {
        console.log(error);
    }
}));
bot.hears("💸 Claim Your $NEAR", (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, constant_1.claimNearMsg, {
        reply_markup: {
            keyboard: constant_1.initKeyboard,
            resize_keyboard: true,
        },
    });
    ctx.session = {
        state: "claimNear",
        twitterUsername: "",
        retweetUrl: "",
        walletAddress: "",
        claimNear: "",
    };
});
bot.hears("📌 Important Message", (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, constant_1.importantMsg, {
        reply_markup: {
            keyboard: constant_1.initKeyboard,
            resize_keyboard: true,
        },
    });
});
bot.command("export", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    if (ctx.from.id.toString() == process.env.OWNER_ID) {
        const fields = [
            "userId",
            "username",
            "twitterUsername",
            "retweetUrl",
            "walletAddress",
            "referrerId",
            "balance",
            "createdAt",
        ];
        const data = yield user_data_1.default.find({});
        const csv = (0, json2csv_1.parse)(data, { fields });
        bot.telegram.sendChatAction(ctx.chat.id, "upload_document");
        bot.telegram.sendDocument(ctx.chat.id, {
            source: Buffer.from(csv, "utf8"),
            filename: "data.csv",
        });
    }
    else {
        bot.telegram.sendMessage(ctx.chat.id, constant_1.unknownCommand);
    }
}));
bot.on("text", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        if (!((_b = ctx.session) === null || _b === void 0 ? void 0 : _b.state)) {
            bot.telegram.sendMessage(ctx.chat.id, constant_1.unknownCommand);
        }
        else if (ctx.session.state == "twitter") {
            bot.telegram.sendMessage(ctx.chat.id, constant_1.retweet, {
                reply_markup: {
                    keyboard: constant_1.cancelKeyboard,
                    resize_keyboard: true,
                },
            });
            ctx.session = {
                state: "retweet",
                twitterUsername: ctx.message.text,
                retweetUrl: "",
                walletAddress: "",
                claimNear: "",
            };
        }
        else if (ctx.session.state == "retweet") {
            bot.telegram.sendMessage(ctx.chat.id, constant_1.enterWalletAddress, {
                reply_markup: {
                    keyboard: constant_1.initKeyboard,
                    resize_keyboard: true,
                },
            });
            ctx.session = {
                state: "walletAddress",
                twitterUsername: ctx.session.twitterUsername,
                retweetUrl: ctx.message.text,
                walletAddress: "",
                claimNear: "",
            };
        }
        else if (ctx.session.state == "walletAddress") {
            bot.telegram.sendMessage(ctx.chat.id, (0, constant_1.completed)(ctx.from.first_name), {
                reply_markup: {
                    keyboard: constant_1.initKeyboard,
                    resize_keyboard: true,
                },
            });
            // get referrer data
            const refData = yield referral_1.default.findOne({ userId: ctx.from.id });
            // create an entry for user
            yield user_data_1.default.create({
                userId: ctx.from.id,
                username: ctx.from.username,
                twitterUsername: ctx.session.twitterUsername,
                retweetUrl: ctx.session.retweetUrl,
                walletAddress: ctx.message.text,
                referrerId: refData ? refData.referrerId : "",
                balance: 0.01,
            });
            if (refData) {
                // get referrer user data
                const refUserData = yield user_data_1.default.findOne({
                    userId: refData.referrerId,
                });
                // update balance of referrer user
                yield user_data_1.default.findOneAndUpdate({
                    userId: refData.referrerId,
                }, { $set: { balance: refUserData.balance + 0.01 } });
            }
            ctx.session = {
                state: "",
                twitterUsername: "",
                retweetUrl: "",
                walletAddress: "",
                claimNear: "",
            };
        }
        else if (ctx.session.state == "claimNear") {
            const data = yield user_data_1.default.findOne({ userId: ctx.from.id });
            if (data) {
                bot.telegram.sendMessage(ctx.chat.id, constant_1.claimNear, {
                    reply_markup: {
                        keyboard: constant_1.initKeyboard,
                        resize_keyboard: true,
                    },
                });
                yield user_data_1.default.findByIdAndUpdate(data._id, {
                    $set: {
                        claimNear: ctx.message.text,
                    },
                });
            }
            else {
                bot.telegram.sendMessage(ctx.chat.id, constant_1.userDoesNotExists, {
                    reply_markup: {
                        keyboard: constant_1.initKeyboard,
                        resize_keyboard: true,
                    },
                });
            }
            ctx.session = {
                state: "",
                twitterUsername: "",
                retweetUrl: "",
                walletAddress: "",
                claimNear: "",
            };
        }
    }
    catch (error) {
        console.log(error);
    }
}));
bot.on("message", (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, constant_1.unknownCommand);
});
const secretPath = `/telegraf/${bot.secretPathComponent()}`;
// Set telegram webhook
// yarn add ngrok && ngrok http 5000
bot.telegram.setWebhook(`${process.env.SERVER_URL}${secretPath}`);
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// Set the bot API endpoint
app.use(bot.webhookCallback(secretPath));
const PORT = process.env.PORT || 5000;
mongoose_1.default.connect(process.env.DB_CONNECTION_URL || "").then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});
