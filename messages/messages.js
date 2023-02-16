const { 
  dateAndTimeNow, 
  timeToMidnight, 
  timeToNextThursday,
  timeToNextThursdayNineAm, 
  millisToDate, 
  daysUntil
} = require('../utils/timedateUtils')
const { getChuckNorrisJoke } = require('../chucknorris')


const sendMessageToGivenChannel = (client, channelName, message) => {

  const guild = client.guilds.cache.first()

  if (!guild)
    return console.error('No guilds found.')

  const channel = guild.channels.cache.find(channel => channel.name === channelName)

  if (!channel)
    return console.error('No channel found.')

  channel.send(message)
    .then(() => console.log(`Message sent to ${channel.name}!`))
    .catch(console.error)
}

const replies = (message) => {

  if (message.author.bot)
    return 

  if (message.content === 'ping') {
    message.reply('Pong!')
  }

  if (message.content.toLowerCase() === 'päivää' || message.content.toLowerCase() === 'päivää!') {
    message.reply(`PÄIVÄÄ!!!🤘😎🤘`)
  }

  if (message.content.toLowerCase().startsWith('hdt') || message.content.toLowerCase().includes('hdt')) {

    daysUntil(timeToNextThursday()) != 0 
      ? message.reply(`${message.author} EI OLE VIELÄ HDT! HDT on ${returnDayRelativeToNextThursday()}! 🌞`)
      : message.reply(`Hyvää Discord Torstaita ${message.author}! 🥳`)
  }
}

const commands = (client, message) => {

  if (message.author.bot)
    return 

  if (message.content.startsWith('!aika')) {
    message.reply(dateAndTimeNow())
  }

  if (message.content.startsWith('!hdt')) {

    daysUntil(timeToNextThursday()) != 0
      ? message.reply(`HDT on ${returnDayRelativeToNextThursday()} (${daysUntil(timeToNextThursday())} päivää)! 🌞`)
      : message.reply(`HDT on ${returnDayRelativeToNextThursday()}! Hyvää Discord Torstaita rakkaat ystävät!🌞🌞🌞`)    
  }

  if (message.content.startsWith('!mökki')) {
    sendMessageToGivenChannel(client, 'yleinen-paskan-lätinä', 'Jaa mökille')
  }

  if (message.content.startsWith('!bot')) {
    message.reply(botCommandsString())
  }

  if (message.content.toLowerCase().includes('mökille') || message.content.toLowerCase().includes('mökillä')) {
    sendMessageToGivenChannel(client, 'yleinen-paskan-lätinä', 'Jaa mökille')
  }

  if (message.content.startsWith('!chuck')) {
    getChuckNorrisJoke()
      .then(joke => message.reply(joke))
  }

}

const channelMessages = (client, message) => {

  // TODO: tulee sit ku tulee

}

const setTimedMessages = (client) => {
  
  const midnight = timeToMidnight()

  // Send a message when the day changes
  setTimeout(() => {
    sendMessageToGivenChannel(client, 'yleinen-paskan-lätinä', dateAndTimeNow())
    console.log('Day changed!')
    console.log(`Interval to midnight: ${midnight} milliseconds`)
  }, midnight)
}  

const setHappyHdtGreeting = (client) => {
  
  const nextThursday = timeToNextThursdayNineAm()

  // Send a message when the day changes to thursday and it's 9 o'clock in the morning
  setTimeout(() => {
    sendMessageToGivenChannel(client, 'yleinen-paskan-lätinä', 'Hyvää HDT:ta ihmisveljet! 🥳🥳🥳')
    console.log('HDT happened!')
    console.log(`Interval to next thursday: ${nextThursday} milliseconds`)
  }, nextThursday)
}

module.exports = { 
  sendMessageToGivenChannel,
  replies,
  channelMessages,
  commands,
  setTimedMessages,
  setHappyHdtGreeting,
}

function returnDayRelativeToNextThursday() {
  const daysUntilHdt = [
    {
      day: 'yliyliyliyliylihuomenna',
      date: daysUntil(timeToNextThursday()) === 6
    },
    {
      day: 'yliyliyliylihuomenna',
      date: daysUntil(timeToNextThursday()) === 5
    },
    {
      day: 'yliyliylihuomenna',
      date: daysUntil(timeToNextThursday()) === 4
    },
    {
      day: 'yliylihuomenna',
      date: daysUntil(timeToNextThursday()) === 3
    },
    {
      day: 'ylihuomenna',
      date: daysUntil(timeToNextThursday()) === 2
    },
    {
      day: 'huomenna',
      date: daysUntil(timeToNextThursday()) === 1
    },
    {
      day: 'tänään',
      date: daysUntil(timeToNextThursday()) === 0
    },
  ]

  const relativeDay = daysUntilHdt.filter(day => day.date)

  return relativeDay[0].day
}

const botCommandsString = () => {

  return 'Nää komennot nyt ainaski löytyy:\n' + 
    '- !aika - Mikä päivä ja paljon kello\n' + 
    '- !hdt - Montako päivää torstaihin\n' + 
    '- !mökki - Jaa mökille..\n' + 
    '- !bot - Botin komennot\n' + 
    '- !chuck - Random Chuck Norris Vizi 🌞\n\n' + 
    'Tulossa EHKÄ:\n' + 
    '- Spotify playlist ultimate automatic collector\n' + 
    '- Old Lemoon Pitsu/kebub-tilaushäzzäkkä\n\n' +
    'ETSITÄÄN BACKEND DEVAAJA PR0TA TEKEMÄÄN JOKU SIMPPELI EXPRESS.JS BACKENDI TÄHÄN BOTTIIN 🥳😎'
}