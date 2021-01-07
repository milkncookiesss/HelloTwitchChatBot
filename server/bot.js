require('dotenv').config();
const tmi = require('tmi.js');
// const { onMessageHandler } = require("../JS/helperfunctions.js")
// const port = 8080;
// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [process.env.CHANNEL_NAME]
};
// Create a client with our options
const client = new tmi.client(opts);
// Connect to Twitch:
client.connect();

// Called every time a message comes in
const onMessageHandler = (target, context, msg, self) => {
  if (self) { return; } // Ignore messages from the bot
  console.log(target);
  console.log(context.subscriber);
  // Remove whitespace from chat message
  const commandName = msg.trim();

  if (commandName === "!emoteonly") {
    client.say(target, `/emoteonly`);
  }

  // If the command is known, let's execute it
  if (commandName === '!dice') {
    const num = rollDice();
    client.say(target, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
}
// Function called when the "dice" command is issued
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}
// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}


// Register our event handlers (defined below)
client.on('connected', onConnectedHandler);
client.on('message', onMessageHandler);
