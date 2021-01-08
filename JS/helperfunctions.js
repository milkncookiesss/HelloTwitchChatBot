function rollDice (x) {
  const sides = x;
  return Math.floor(Math.random() * x) + 1;
}

const dice = (client, target, context, msg, self) => {
  const num = rollDice(6);
  client.say(target, `You rolled a ${num}`);
  console.log(`* Executed ${commandName} command`);
}

const gamble = (client, target, context, msg, self) => {
  const num = rollDice(100);

  if (context["display-name"] === 'kitty9o') {
    client.say(target, `${context["display-name"]} here is your win, you baby. BabyRage`)
  } else if (num === 1) {
    client.say(target, `${context["display-name"]} You rolled a ${num}, tough luck.`);
    client.say(target, `/timeout ${context["display-name"]} 600`)
  } else {
    client.say(target, `${context["display-name"]}, You rolled a ${num}, you pass this time.`);
  }
}



module.exports = { dice, gamble };