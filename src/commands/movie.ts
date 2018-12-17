module.exports = {
  name: 'movie',
  description: 'Prints info about the movie CLI',
  run: async context => {
    const { print } = context

    print.newline()
    print.info(print.colors.yellow('Welcome to the movie CLI!'))
    print.newline()
    print.info('  movie search "Road House"')
    print.info('  movie api reset')
  },
}
