const tmi = require('tmi.js');
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [process.env.CHANNEL_NAME]
};
const client = new tmi.client(opts);

function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

const onMessageHandler = function (target, context, msg, self) {
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



module.exports = { onMessageHandler };