const { Client, GatewayIntentBits } = require('discord.js')
require ('dotenv').config()

const { replies, commands, channelMessages, setTimedMessages, setHappyHdtGreeting } = require("./messages/messages")
const { timeToNextThursday, timeToNextThursdayNineAm, millisToDate, millisToHours, timeToMidnight, daysUntil, dateAndTimeNow } = require("./utils/timedateUtils")

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

  setTimedMessages(client)
  // setHappyHdtGreeting(client)

})

client.on('messageCreate', async (message) => {

  replies(message)
  channelMessages(client, message)
  commands(client, message)

})

client.login(token)
