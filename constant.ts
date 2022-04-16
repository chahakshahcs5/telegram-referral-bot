export const initKeyboard = [
  [{ text: "Start Tasks" }],
  [{ text: "💰 Check Your Balance" }, { text: "🗣 Invitation Link" }],
  [{ text: "💸 Claim Your $NEAR" }, { text: "📌 Important Message" }],
];
export const cancelKeyboard = [[{ text: "🚫 Cancel" }]];

export const initMsg = (first_name?: string) => `Hello  ${first_name} 

You can earn $NEAR by completing tasks and refering your friends to our bot.`;

export const initTask = `Please complete the following tasks

🔹 Follow our twitter account

🔸 Retweet the pinned tweet

Complete all task and claim your 0.01 $NEAR

Note:  All tasks are mandatory so please complete them carefully. We'll check it manually!`;

export const followTweeter = `Follow our twitter account:
https://www.twitter.com/Nearnft
And send your Twitter account username`;

export const retweet = `Like and Retweet the pinned tweet:
https://twitter.com/NearNft/status/1513468070509281283?s=20&t=H08tFWBm8a3_Y-gcLhOdow

And send us on your retweeted link`;

export const completed = (first_name: string) =>
  `Congratulations ${first_name} 🎊 you completed all the task and  your 0.01 $NEAR will be credited into your wallet within 48 hours.`;

export const showBalance = (balance: number) => `👋 Hello Vodafone

Your current Account balance is 
${balance} NEAR`;

export const showInviteLink = (
  id: number,
  refCount: number,
  botUsername: String
) => `🤝 Vodafone here is your invitation link. Share it with friends to earn $NEAR

https://t.me/${botUsername}?start=${id}

There is/are currently ${refCount} users invited`;

export const claimNearMsg = `Please submit your NEAR wallet address


Note📌: Hear you can withdraw your $NEAR to your wallet ! Please give us valid information.

Send your details in this format

$NEAR balance
NEAR wallet address

Example
0.1
name.near`;

export const importantMsg = `If you are done all the tasks and refer minimum 1 friend then you will get 0.01 $NEAR`;

export const unknownCommand = `❌ Unknown Command!

You have send a Message directly into the Bot's chat or
Menu structure has been modified by Admin.

ℹ️ Do not send Messages directly to the Bot or
reload the Menu by pressing /start`;

export const claimedMsg = `You have already claimed your rewards.`;
