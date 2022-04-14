"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unknownCommand = exports.importantMsg = exports.claimNearMsg = exports.showInviteLink = exports.showBalance = exports.followTweeter = exports.initTask = exports.initMsg = exports.cancelKeyboard = exports.initKeyboard = void 0;
exports.initKeyboard = [
    [{ text: "Start Tasks" }],
    [{ text: "💰 Check Your Balance" }, { text: "🗣 Invitation Link" }],
    [{ text: "💸 Claim Your $NEAR" }, { text: "📌 Important Message" }],
];
exports.cancelKeyboard = [[{ text: "🚫 Cancel" }]];
const initMsg = (first_name) => `Hello  ${first_name} 

You can earn $NEAR by completing tasks and refering your friends to our bot.`;
exports.initMsg = initMsg;
exports.initTask = `Please complete the following tasks

🔹 Follow our twitter account

🔸 Retweet the pinned tweet

Complete all task and claim your 0.01 $NEAR

Note:  All tasks are mandatory so please complete them carefully. We'll check it manually!`;
exports.followTweeter = `Follow our twitter account:
https://www.twitter.com/Nearnft
And send your Twitter account username`;
exports.showBalance = `👋 Hello Vodafone

Your current Account balance is 
0 NEAR`;
exports.showInviteLink = `🤝 Vodafone here is your invitation link. Share it with friends to earn $NEAR

https://t.me/nearnftgiveaway_bot?start=r09839821944

There is/are currently 0 users invited`;
exports.claimNearMsg = `Please submit your NEAR wallet address


Note📌: Hear you can withdraw your $NEAR to your wallet ! Please give us valid information.

Send your details in this format

$NEAR balance
NEAR wallet address

Example
0.1
name.near`;
exports.importantMsg = `If you are done all the tasks and refer minimum 1 friend then you will get 0.01 $NEAR`;
exports.unknownCommand = `❌ Unknown Command!

You have send a Message directly into the Bot's chat or
Menu structure has been modified by Admin.

ℹ️ Do not send Messages directly to the Bot or
reload the Menu by pressing /start`;
