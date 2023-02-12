
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
      name: 'ISO ROTSI PASU',
      date: now().getMonth() === 1 && now().getDate() === 11
    },
    {
      name: 'ISO PIHA JONE',
      date: now().getMonth() === 7 && now().getDate() === 8
    },
    {
      name: 'DOGSU DOGE',
      date: now().getMonth() === 7 && now().getDate() === 8 // EI TIEDOSSA
    },
    {
      name: 'PIKKU POIKA',
      date: now().getMonth() === 7 && now().getDate() === 8 // EI TIEDOSSA
    },
    {
      name: 'KONIN POSTI',
      date: now().getMonth() === 0 && now().getDate() === 3
    },
    {
      name: 'ANTTERO ARVELO',
      date: now().getMonth() === 11 && now().getDate() === 1
    },
  ]

  const cabinBDayToday = cabinBDays.filter(cabinBDay => cabinBDay.date)

  if (cabinBDayToday.length > 0) {
    return `\nTÄNÄÄN ON ${cabinBDayToday[0].name} SYNTTÄRIT!!!\nPALJON ONNEA ${cabinBDayToday[0].name}! :partying_face::partying_face::partying_face:`
  } else 
    return ''
}

const dateAndTimeNow = () => {
  return  `Tänään on ${dayOfTheWeek()} ${now().getDate()}. ${monthOfTheYear()}ta. Kello on ${timeNow()}. ${cabinBDays()}`
}

const timeToMidnight = () => {

  const now = new Date()
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0)

  return midnight - now;

}

const timeToNextThursday = () => {

  const now = new Date()
  let nextThursday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0)

  while (nextThursday.getDay() !== 4) {
    nextThursday.setDate(nextThursday.getDate() + 1)
  }

  return nextThursday - now;  
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

const daysUntil = (millis) => {
  return Math.ceil(millis / (1000 * 60 * 60 * 24));
}

module.exports = {
  dateAndTimeNow,
  timeToMidnight,
  timeToNextThursday,
  millisToDate,
  daysUntil
}