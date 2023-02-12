const { Client, GatewayIntentBits } = require('discord.js')
require ('dotenv').config()

const { dateAndTimeNow, timeToMidnight, timeToNextThursday, millisToDate, daysUntil } = require('./utils/timedateUtils')

const token = process.env.TOKEN
const permissions = process.env.PERMISSIONS

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent
  ] 
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)

  setTimedMessages()
  setHappyHdtGreeting()

})

client.on('messageCreate', async (message) => {

  if (message.author.bot)
    return

  if (message.content === 'ping') {
    message.reply('Pong!')
  }

  if (message.content === 'hdt' || message.content === 'HDT') {
    daysUntil(timeToNextThursday()) != 0 
      ? message.reply(`${message.author} EI OLE VIELÄ HDT! HDThen on aikaa ${daysUntil(timeToNextThursday())} päivää! :sun_with_face:`)
      : message.reply(`Hyvää HDT:ta ${message.author}! :partying_face:`)
  }

  if (message.content === '!aika') {
    message.reply(dateAndTimeNow())
  }

  if (message.content === '!hdt') {
    message.reply(`HDThen on aikaa ${daysUntil(timeToNextThursday())} päivää! :sun_with_face:`)
  }

  if (message.content === '!mökki') {
    const channel = client.channels.cache.get('yleinen-paskan-lätinä');
    if (channel) {
      channel.send('Jaa mökille');
    }
  }

})

function setTimedMessages() {
  
  const midnight = timeToMidnight()

  console.log(`Interval to midnight: ${midnight} milliseconds`);

  // Send a message when the day changes
  setTimeout(() => {
    const channel = client.channels.cache.get('yleinen-paskan-lätinä');
    if (channel) {
      channel.send(dateAndTimeNow());
    }
  }, midnight);
}  

function setHappyHdtGreeting() {
  
  const nextThursday = timeToNextThursday()

  console.log(`Interval to next thursday: ${nextThursday} milliseconds`);

  // Send a message when the day changes to thursday and it's 9 o'clock in the morning
  setTimeout(() => {
    const channel = client.channels.cache.get('yleinen-paskan-lätinä');
    if (channel) {
      channel.send('Hyvää HDT:ta ihmisveljet! :partying_face:');
    }
  }, nextThursday);
}  

client.login(token)