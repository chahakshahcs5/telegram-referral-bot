import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { Context, Telegraf } from "telegraf";
require("dotenv").config();

import {
  initKeyboard,
  initMsg,
  initTask,
  followTweeter,
  cancelKeyboard,
  showBalance,
  showInviteLink,
  claimNearMsg,
  importantMsg,
  unknownCommand,
} from "./constant";

const bot = new Telegraf<Context>(process.env.BOT_TOKEN || "");

bot.start((ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, initMsg(ctx.from.first_name));
  bot.telegram.sendMessage(ctx.chat.id, initTask, {
    reply_markup: {
      keyboard: initKeyboard,
      resize_keyboard: true,
    },
  });
});

bot.hears("Start Tasks", (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, followTweeter, {
    reply_markup: {
      keyboard: cancelKeyboard,
      resize_keyboard: true,
    },
  });
});

bot.hears("🚫 Cancel", (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, initTask, {
    reply_markup: {
      keyboard: initKeyboard,
      resize_keyboard: true,
    },
  });
});

bot.hears("💰 Check Your Balance", (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, showBalance, {
    reply_markup: {
      keyboard: initKeyboard,
      resize_keyboard: true,
    },
  });
});

bot.hears("🗣 Invitation Link", (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, showInviteLink, {
    reply_markup: {
      keyboard: initKeyboard,
      resize_keyboard: true,
    },
  });
});

bot.hears("💸 Claim Your $NEAR", (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, claimNearMsg, {
    reply_markup: {
      keyboard: initKeyboard,
      resize_keyboard: true,
    },
  });
});

bot.hears("📌 Important Message", (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, importantMsg, {
    reply_markup: {
      keyboard: initKeyboard,
      resize_keyboard: true,
    },
  });
});

bot.on("message", (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, unknownCommand);
});

const secretPath = `/telegraf/${bot.secretPathComponent()}`;

// Set telegram webhook
// yarn add ngrok && ngrok http 5000
bot.telegram.setWebhook(`${process.env.SERVER_URL}${secretPath}`);

const app = express();

app.get("/", (req: Request, res: Response) => {
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
