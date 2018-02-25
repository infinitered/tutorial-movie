const API_MESSAGE = `
Before using the movie CLI, you'll need an API key from OMDB.

Go here: http://www.omdbapi.com/apikey.aspx?__EVENTTARGET=freeAcct

Once you have your API key, enter it below.

API KEY>`

module.exports = {
  name: 'search',
  alias: ['s'],
  run: async (toolbox) => {
    // retrieve the tools from the toolbox that we will need
    const { parameters, print, prompt, imdb } = toolbox

    // check if there's a name provided on the command line first
    let name = parameters.first

    // if not, let's prompt the user for one and then assign that to `name`
    if (!name) {
      const result = await prompt.ask({ type: 'input', name: 'name', message: 'What movie?' })
      if (result && result.name) name = result.name
    }

    // if they didn't provide one, we error out
    if (!name) {
      print.error('No movie name specified!')
      return
    }

    // check if we have an IMDB API key
    if (await imdb.getApiKey() === false) {
      // didn't find an API key. let's ask the user for one
      const result = await prompt.ask({ type: 'input', name: 'key', message: API_MESSAGE })

      // if we received one, save it
      if (result && result.key) {
        imdb.saveApiKey(result.key)
      } else {
        // no API key, exit
        return
      }
    }

    // now retrieve the info from IMDB
    const movie = await imdb.getMovie(name)
    if (!movie) {
      print.error(`Couldn't find that movie, sorry!`)
      return
    }

    // success! We have movie info. Print it out on the screen
    print.debug(movie)
  }
}
