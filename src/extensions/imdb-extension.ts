import * as imdb from 'imdb-api'

module.exports = (toolbox) => {
  const { filesystem } = toolbox

  // location of the movie config file
  const MOVIE_CONFIG = `${filesystem.homedir()}/.movie`

  // memoize the API key once we retrieve it
  let imdbKey: string | false = false

  // get the API key
  async function getApiKey(): Promise<string | false> {
    // if we've already retrieved it, return that
    if (imdbKey) return imdbKey

    // get it from the config file?
    imdbKey = await readApiKey()

    // return the key
    return imdbKey
  }

  // read an existing API key from the `MOVIE_CONFIG` file, defined above
  async function readApiKey(): Promise<string | false> {
    return filesystem.exists(MOVIE_CONFIG) && filesystem.readAsync(MOVIE_CONFIG)
  }

  // save a new API key to the `MOVIE_CONFIG` file
  async function saveApiKey(key): Promise<void> {
    return filesystem.writeAsync(MOVIE_CONFIG, key)
  }

  // reset the API key
  async function resetApiKey(): Promise<void> {
    await filesystem.removeAsync(MOVIE_CONFIG)
  }

  // get a movie
  async function getMovie(movieName: string): Promise<imdb.Movie | null> {
    const key = await getApiKey()
    if (key) {
      return imdb.get(movieName, { apiKey: key, timeout: 30000 })
    } else {
      return
    }
  }

  // attach our tools to the toolbox
  toolbox.imdb = { getApiKey, saveApiKey, getMovie, resetApiKey }
}
