const { Client, GatewayIntentBits } = require('discord.js')
require ('dotenv').config()

const { standardReplies, setTimedMessages, setHappyHdtGreeting } = require("./messages/messages")
const { dateAndTimeNow, timeToMidnight, timeToNextThursday, millisToDate, daysUntil } = require('./utils/timedateUtils')
const { getChuckNorrisJoke } = require('./chucknorris')

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

  // setTimedMessages(client)
  // setHappyHdtGreeting(client)

})

client.on('messageCreate', async (message) => {

  standardReplies(client, message)

})

client.login(token)