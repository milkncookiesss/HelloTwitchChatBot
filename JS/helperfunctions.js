const { client } = require("tmi.js");

function rollDice (x) {
  const sides = x;
  return Math.floor(Math.random() * x) + 1;
}

const dice = (client, target, context, msg, self) => {
  const num = rollDice(6);
  client.say(target, `You rolled a ${num}`);
}

const gamble = (client, target, context, msg, self) => {
  const num = rollDice(100);
  const { "display-name": displayName } = context;
  const channelName = target.slice(1, target.length);
  
  if (displayName === 'kitty9o') {
    client.say(target, `${displayName} here is your win, you baby. BabyRage`)
  } else if (num === 1) {
    client.say(target, `${displayName} You rolled a ${num}!! dibzPog WINNER WINNER CHICKEN DINNER!! dibzPog`);
    client.timeout(channelName, displayName, 600, `They won the gamble by rolling 1.`)
    .then((data) => {
      console.log(`the ban was successful`);
    })
    .catch((err) => {
      console.error(err);
    })
  } else if (num > 1 && num <= 29) {
    client.say(target, `${displayName}, You rolled a ${num}, try again. KEKW`);
    client.timeout(channelName, displayName, 1, `They did not win the roll.`)
    .then((data) => {
      console.log(`see ya`);
    })
    .catch(err => console.error(err))
  } else if (num === 69) {
    client.say(target, `${displayName} rolled a ${num}, milkncG nice.... fucking nice....`);
  } else {
    client.say(target, `${displayName}, You rolled a ${num}, dibzHYPE you pass this time! dibzHYPE`);
  }
}

const cheerMessage = (channel, userstate, message) => {
  console.log(`${channel}
    ${userstate}`);
}

const sendLove = (client, target, context, msg, self, listOfPeople) => {
  const channelName = target.slice(1, target.length);
  const hearts = {
    "dibz": "dibzHeart",
    "danielfenner": "fenLove",
    "milkncookiesss": "milkncH"
  };
  const { "display-name": displayName, username } = context;
  const { subscriber, "badge-info": badgeInfo } = context;
  const timer = username.length * 150;
  if (!listOfPeople.includes(username) && (subscriber || badgeInfo ) && (displayName !== "Nightbot" || displayName !== "Streamelements")) {
    // setTimeout(() => {client.say(target, `${displayName} ${hearts[channelName]}`);}, timer);
    console.log(`${displayName} ${hearts[channelName]} timer is : ${timer}`);
    listOfPeople.push(username);
  }
}

class TicTactoe {
  constructor (client, target, context, msg, self) {
    this.target = target;
    this.client = client;
    this.board = [[0,0,0],[0,0,0],[0,0,0]]
  }

  displayTable = () => {
    this.client.say(this.target, `[${this.board[0]}]`);
    this.client.say(this.target, `[${this.board[1]}]`);
    this.client.say(this.target, `[${this.board[2]}]`);
  }
}


module.exports = { dice, gamble, cheerMessage, TicTactoe, sendLove };