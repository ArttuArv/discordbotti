const axios = require('axios')

const chuckNorrisApiUrl = 'https://api.chucknorris.io/jokes/random'

const getChuckNorrisJoke = async () => {
  const response = await axios.get(chuckNorrisApiUrl)
  
  return response.data.value
}

module.exports = {
  getChuckNorrisJoke
}