"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const telegraf_1 = require("telegraf");
require("dotenv").config();
const constant_1 = require("./constant");
const bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN || "");
bot.start((ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, (0, constant_1.initMsg)(ctx.from.first_name));
    bot.telegram.sendMessage(ctx.chat.id, constant_1.initTask, {
        reply_markup: {
            keyboard: constant_1.initKeyboard,
            resize_keyboard: true,
        },
    });
});
bot.hears("Start Tasks", (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, constant_1.followTweeter, {
        reply_markup: {
            keyboard: constant_1.cancelKeyboard,
            resize_keyboard: true,
        },
    });
});
bot.hears("🚫 Cancel", (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, constant_1.initTask, {
        reply_markup: {
            keyboard: constant_1.initKeyboard,
            resize_keyboard: true,
        },
    });
});
bot.hears("💰 Check Your Balance", (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, constant_1.showBalance, {
        reply_markup: {
            keyboard: constant_1.initKeyboard,
            resize_keyboard: true,
        },
    });
});
bot.hears("🗣 Invitation Link", (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, constant_1.showInviteLink, {
        reply_markup: {
            keyboard: constant_1.initKeyboard,
            resize_keyboard: true,
        },
    });
});
bot.hears("💸 Claim Your $NEAR", (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, constant_1.claimNearMsg, {
        reply_markup: {
            keyboard: constant_1.initKeyboard,
            resize_keyboard: true,
        },
    });
});
bot.hears("📌 Important Message", (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, constant_1.importantMsg, {
        reply_markup: {
            keyboard: constant_1.initKeyboard,
            resize_keyboard: true,
        },
    });
});
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
// mongoose.connect(process.env.DB_CONNECTION_URL || "").then(() => {
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
// });
// bot.launch();
