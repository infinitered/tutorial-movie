module.exports = {
  name: 'reset',
  alias: ['delete', 'rm'],
  description: 'Deletes the OMDB API key from your system',
  run: async (toolbox) => {
    // retrieve the tools from the toolbox that we will need
    const { prompt, imdb, print } = toolbox

    // confirmation, because this is destructive
    if (await prompt.confirm('Are you sure you want to reset the IMDB API key?')) {
      // delete the API key
      await imdb.resetApiKey()
      print.info('Successfully deleted IMDB API key.')
    }
  }
}
