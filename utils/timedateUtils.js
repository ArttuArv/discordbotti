require ('dotenv').config()

const now = () => {
  return new Date()
}

const dayOfTheWeek = () => {

  const day = now().getDay()

  switch (day) {
    case 0:
      return 'sunnuntai'
    case 1:
      return 'maanantai'
    case 2:
      return 'tiistai'
    case 3:
      return 'keskiviikko'
    case 4:
      return 'torstai'
    case 5:
      return 'perjantai'
    case 6:
      return 'lauantai'
  }
}

const monthOfTheYear = () => {

  const month = now().getMonth()

  switch (month) {
    case 0:
      return 'tammikuu'
    case 1:
      return 'helmikuu'
    case 2:
      return 'maaliskuu'
    case 3:
      return 'huhtikuu'
    case 4:
      return 'toukokuu'
    case 5:
      return 'kesäkuu'
    case 6:
      return 'heinäkuu'
    case 7:
      return 'elokuu'
    case 8:
      return 'syyskuu'
    case 9:
      return 'lokakuu'
    case 10:
      return 'marraskuu'
    case 11:
      return 'joulukuu'
  }
}

const timeNow = () => {
  const minutes = now().getMinutes()
  const hours = now().getHours()

  return minutes < 10 ? `${hours}:0${minutes}` : `${hours}:${minutes}` 
}

const cabinBDays = () => {
  const cabinBDays = [
    {
      name: process.env.NIMI1,
      date: now().getMonth() === 1 && now().getDate() === 11
    },
    {
      name: process.env.NIMI2,
      date: now().getMonth() === 7 && now().getDate() === 7
    },
    {
      name: process.env.NIMI3,
      date: now().getMonth() === 9 && now().getDate() === 23
    },
    {
      name: process.env.NIMI4,
      date: now().getMonth() === 3 && now().getDate() === 3
    },
    {
      name: process.env.NIMI5,
      date: now().getMonth() === 0 && now().getDate() === 3
    },
    {
      name: process.env.NIMI6,
      date: now().getMonth() === 11 && now().getDate() === 1
    },
    {
      name: process.env.NIMI7,
      date: now().getMonth() === 9 && now().getDate() === 20
    },
    {
      name: process.env.NIMI8,
      date: now().getMonth() === 4 && now().getDate() === 20
    },
    {
      name: process.env.NIMI8,
      date: now().getMonth() === 1 && now().getDate() === 17
    },
  ]
 
  const cabinBDayToday = cabinBDays.filter(cabinBDay => cabinBDay.date).map(cabinBDay => cabinBDay.name)

  return cabinBDayToday
    ? `\nTÄNÄÄN SYNTTÄREITÄ VIETTÄÄ ${cabinBDayToday}!!!\nPALJON ONNEA ${cabinBDayToday}! :partying_face::partying_face::partying_face:`
    : ''
}

const flagDays = () => {

  const flagDays = [
    {
      name: '🇫🇮 🇫🇮 🇫🇮 🇫🇮 Suomen itsenäisyyspäivä 🇫🇮 🇫🇮 🇫🇮 🇫🇮',
      date: now().getMonth() === 11 && now().getDate() === 6
    },
    {
      name: '🎅 🎅 🎅 🎅 Joulupukin syntymäpäivä 🎅 🎅 🎅 🎅',
      date: now().getMonth() === 11 && now().getDate() === 24
    },
    {
      name: '💕 💕 💕 ystävänpäivä 💕 💕 💕',
      date: now().getMonth() === 1 && now().getDate() === 14
    },
    {
      name: '🍻 🥂 🍻 🥂 vappu 🍻 🥂 🍻 🥂',
      date: now().getMonth() === 4 && now().getDate() === 1
    },
    {
      name: '🥴 🔥 🥴 🔥 juhannus 🥴 🔥 🥴 🔥',
      date: now().getMonth() === 5 && now().getDate() === 24
    },
    {
      name: '🥚 🥚 🥚 🥚 pitkäperjantai 🥚 🥚 🥚 🥚',
      date: now().getMonth() === 3 && now().getDate() === 10
    },
    {
      name: '🪦 🪦 🪦 🪦 Perttu Häkkisen kuolinpäivä Rippistä paskoille 🪦 🪦 🪦 🪦',
      date: now().getMonth() === 7 && now().getDate() === 12
    },
  ]

  const flagDayToday = flagDays.filter(flagDay => flagDay.date)

  return flagDayToday.length > 0
    ? `\nTänään on ${flagDayToday[0].name}!!!`
    : ''
}

const dateAndTimeNow = () => {

  const birthdaysAndFlagdays = cabinBDays() + flagDays()

  return  `Tänään on ${dayOfTheWeek()} ${now().getDate()}. ${monthOfTheYear()}ta. Kello on ${timeNow()}. ${birthdaysAndFlagdays}`
}

const timeToMidnight = () => {

  const now = new Date()
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0)

  return midnight - now

}

const timeToNextThursdayNineAm = () => {

  const now = new Date()
  let nextThursday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0)

  while (nextThursday.getDay() !== 4) {
    nextThursday.setDate(nextThursday.getDate() + 1)
  }

  return nextThursday - now  
}

const timeToNextThursday = () => {

  const now = new Date()
  let nextThursday = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  while (nextThursday.getDay() !== 4) {
    nextThursday.setDate(nextThursday.getDate() + 1)
  }

  return nextThursday - now  
}

const millisToDate = (millis) => {

  const date = new Date(millis)
  const daysOfWeek = [
    'Sunnuntai', 'Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai'
  ]
  const monthsOfYear = [
    'Tammikuu', 'Helmikuu', 'Maaliskuu', 'Huhtikuu', 'Toukokuu', 'Kesäkuu', 'Heinäkuu', 'Elokuu', 'Syyskuu', 'Lokakuu', 'Marraskuu', 'Joulukuu'
  ]

  const dayOfWeek = daysOfWeek[date.getDay()]
  const dayOfMonth = monthsOfYear[date.getMonth()]
  const hoursAndMinutes = timeNow()

  return `${dayOfWeek} ${date.getDate()}. ${dayOfMonth}ta kello ${hoursAndMinutes}`
}

const millisToHours = (millis) => {
  return Math.ceil(millis / (1000 * 60 * 60))
}

const daysUntil = (millis) => {
  return Math.ceil(millis / (1000 * 60 * 60 * 24))
}

module.exports = {
  cabinBDays,
  dateAndTimeNow,
  timeToMidnight,
  timeToNextThursday,
  timeToNextThursdayNineAm,
  millisToDate,
  millisToHours,
  daysUntil
}