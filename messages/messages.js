const { 
  dateAndTimeNow, 
  timeToMidnight, 
  timeToNextThursday, 
  millisToDate, 
  daysUntil
} = require('../utils/timedateUtils')


const sendMessageToGivenChannel = (client, channelName, message) => {

  const guild = client.guilds.cache.first();
  if (!guild)
    return console.error('No guilds found.');

  const channel = guild.channels.cache.find(channel => channel.name === channelName);

  if (!channel)
    return console.error('No channel found.');

  channel.send(message)
    .then(() => console.log(`Message sent to ${channel.name}!`))
    .catch(console.error);

};

const standardReplies = (client, message) => {

  if (message.author.bot)
  return 

  if (message.content === 'ping') {
    message.reply('Pong!')
  }

  if (message.content.toLowerCase().startsWith('hdt')) {
    daysUntil(timeToNextThursday()) != 0 
      ? message.reply(`${message.author} EI OLE VIELÄ HDT! HDThen on aikaa ${daysUntil(timeToNextThursday())} päivää! :sun_with_face:`)
      : message.reply(`Hyvää HDT:ta ${message.author}! :partying_face:`)
  }

  if (message.content.startsWith('!aika')) {
    message.reply(dateAndTimeNow())
  }

  if (message.content.startsWith('!hdt')) {
    message.reply(`HDThen on aikaa ${daysUntil(timeToNextThursday())} päivää! :sun_with_face:`)
  }

  if (message.content.startsWith('!mökki')) {
    sendMessageToGivenChannel(client, 'yleinen-paskan-lätinä', 'Jaa mökille')
  }

  if (message.content.startsWith('!bot')) {
    message.reply('Nää komennot nyt ainaski löytyy:\n- !aika\n- !hdt\n- !mökki\n- !bot\n\nTulossa EHKÄ:\n- Spotify playlist ultimate automatic collector\n- Old Lemoon Pitsu/kebub-tilaushäzzäkkä')
  }

  if (message.content.toLowerCase().includes('mökille') || message.content.toLowerCase().includes('mökillä')) {
    sendMessageToGivenChannel(client, 'yleinen-paskan-lätinä', 'Jaa mökille')
  }
}

const setTimedMessages = (client) => {
  
  const midnight = timeToMidnight()

  console.log(`Interval to midnight: ${midnight} milliseconds`);

  // Send a message when the day changes
  setTimeout(() => {
    sendMessageToGivenChannel(client, 'yleinen-paskan-lätinä', dateAndTimeNow())
  }, midnight);
}  

const setHappyHdtGreeting = (client) => {
  
  const nextThursday = timeToNextThursday()

  console.log(`Interval to next thursday: ${nextThursday} milliseconds`);

  // Send a message when the day changes to thursday and it's 9 o'clock in the morning
  setTimeout(() => {
    sendMessageToGivenChannel(client, 'yleinen-paskan-lätinä', 'Hyvää HDT:ta ihmisveljet! :partying_face:')
  }, nextThursday);
}  

module.exports = { 
  sendMessageToGivenChannel,
  standardReplies,
  setTimedMessages,
  setHappyHdtGreeting
}