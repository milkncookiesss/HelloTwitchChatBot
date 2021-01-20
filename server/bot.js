require('dotenv').config();
const tmi = require('tmi.js');
const { dice, gamble, cheerMessage, TicTactoe, sendLove } = require("../JS/helperfunctions.js")
// const port = 8080;
// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: ['milkncookiesss', 'dibz', 'DanielFenner']
};
const listOfPeople = ["Cookie_Nova", "Nightbot", "StreamElements"];
// Create a client with our options
const client = new tmi.client(opts);
// Connect to Twitch:
client.connect();



// Called every time a message comes in
const onMessageHandler = (target, context, msg, self) => {
  const channelName = target.slice(1, target.length);
  const { "badge-info": badgeInfo } = context;
  console.log(`------->`, badgeInfo);
  if (self) { return; } // Ignore messages from the bot
  console.log(`[ ${channelName} ], ${context["display-name"]}: ${msg}`);
  // Remove whitespace from chat message
  const commandName = msg.trim();
  if (commandName === `!ttt`) {
    const game = new TicTactoe(client, target, context, msg, self);
    game.displayTable();
  }
  if (commandName === '!gamble') {
    gamble(client, target, context, msg, self);
  }
  switch (channelName) {
    case 'dibz':
      // sendLove(client, target, context, msg, self, listOfPeople);
      break;
    case 'milkncookiesss':
      // sendLove(client, target, context, msg, self, listOfPeople);
      break;
    // case 'danielfenner':
    //   // const listOfPeople = [];
    //   // console.log(`---------> `,listOfPeople);
    //   break;
  }

  if (commandName === "!emoteonly") {
    client.emoteonly(channelName)
    .then((data) => {
      client.say(target, `Only Emotes, get trolled chat.`);
    })
    .catch((err) => {
      console.err(err);
    })
  }

  // If the command is known, let's execute it
  if (commandName === '!dice') {
    dice(client, target, context, msg, self)
  }
}
// Function called when the "dice" command is issued
function rollDice (x) {
  const sides = x;
  return Math.floor(Math.random() * x) + 1;
}
// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}


// Register our event handlers (defined below)
client.on('connected', (target) => {
  if (target === '#dibz') {
    console.log('we are on dibz channel');
  }
})
client.on('connected', onConnectedHandler);
client.on('message', onMessageHandler);
client.on('cheer', cheerMessage);

