"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDoesNotExists = exports.claimNear = exports.enterWalletAddress = exports.claimedMsg = exports.unknownCommand = exports.importantMsg = exports.claimNearMsg = exports.showInviteLink = exports.showBalance = exports.completed = exports.retweet = exports.followTweeter = exports.initTask = exports.initMsg = exports.cancelKeyboard = exports.initKeyboard = void 0;
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
exports.retweet = `Like and Retweet the pinned tweet:
https://twitter.com/NearNft/status/1513468070509281283?s=20&t=H08tFWBm8a3_Y-gcLhOdow

And send us on your retweeted link`;
const completed = (first_name) => `Congratulations ${first_name} 🎊 you completed all the task and  your 0.01 $NEAR will be credited into your wallet within 48 hours.`;
exports.completed = completed;
const showBalance = (balance, username) => `👋 Hello ${username}

Your current Account balance is 
${balance} NEAR`;
exports.showBalance = showBalance;
const showInviteLink = (id, refCount, botUsername, username) => `🤝 ${username} here is your invitation link. Share it with friends to earn $NEAR

https://t.me/${botUsername}?start=${id}

There is/are currently ${refCount} users invited`;
exports.showInviteLink = showInviteLink;
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
exports.claimedMsg = `You have already claimed your rewards.`;
exports.enterWalletAddress = `📝 Please enter your wallet address.`;
exports.claimNear = `We will send $NEAR to your submitted wallet address within 48 hours`;
exports.userDoesNotExists = `Sorry, You don't have any $NEAR to claim.`;
