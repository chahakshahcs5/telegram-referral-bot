import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { Context, Telegraf, session } from "telegraf";
import { parse as json2csv } from "json2csv";
import fs from "fs";
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
  retweet,
  completed,
} from "./constant";
import userData from "./models/user_data";

interface SessionData {
  state: string;
  twitterUsername: string;
  retweetUrl: string;
}

// Define your own context type
interface MyContext extends Context {
  session?: SessionData;
}

const bot = new Telegraf<MyContext>(process.env.BOT_TOKEN || "");
bot.use(session());

bot.start((ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, initMsg(ctx.from.first_name));
  bot.telegram.sendMessage(ctx.chat.id, initTask, {
    reply_markup: {
      keyboard: initKeyboard,
      resize_keyboard: true,
    },
  });
  ctx.session ??= { state: "start", twitterUsername: "", retweetUrl: "" };
});

bot.hears("Start Tasks", (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, followTweeter, {
    reply_markup: {
      keyboard: cancelKeyboard,
      resize_keyboard: true,
    },
  });
  ctx.session = { state: "twitter", twitterUsername: "", retweetUrl: "" };
});

bot.hears("🚫 Cancel", (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, initTask, {
    reply_markup: {
      keyboard: initKeyboard,
      resize_keyboard: true,
    },
  });
  ctx.session = { state: "", twitterUsername: "", retweetUrl: "" };
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

bot.command("export", async (ctx) => {
  if (ctx.from.id.toString() == process.env.OWNER_ID) {
    const fields = [
      "userId",
      "username",
      "twitterUsername",
      "retweetUrl",
      "createdAt",
    ];

    const data = await userData.find({});
    const csv = json2csv(data, { fields });
    bot.telegram.sendChatAction(ctx.chat.id, "upload_document");
    bot.telegram.sendDocument(ctx.chat.id, {
      source: Buffer.from(csv, "utf8"),
      filename: "data.csv",
    });
  } else {
    bot.telegram.sendMessage(ctx.chat.id, unknownCommand);
  }
});

bot.on("text", async (ctx) => {
  try {
    if (!ctx.session?.state) {
      bot.telegram.sendMessage(ctx.chat.id, unknownCommand);
    } else if (ctx.session.state == "twitter") {
      bot.telegram.sendMessage(ctx.chat.id, retweet, {
        reply_markup: {
          keyboard: cancelKeyboard,
          resize_keyboard: true,
        },
      });
      ctx.session = {
        state: "retweet",
        twitterUsername: ctx.message.text,
        retweetUrl: "",
      };
    } else if (ctx.session.state == "retweet") {
      bot.telegram.sendMessage(ctx.chat.id, completed(ctx.from.first_name), {
        reply_markup: {
          keyboard: initKeyboard,
          resize_keyboard: true,
        },
      });
      await userData.create({
        userId: ctx.from.id,
        username: ctx.from.username,
        twitterUsename: ctx.session.twitterUsername,
        retweetUrl: ctx.message.text,
      });
      ctx.session = { state: "", twitterUsername: "", retweetUrl: "" };
    }
  } catch (error) {
    console.log(error);
  }
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

mongoose.connect(process.env.DB_CONNECTION_URL || "").then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
