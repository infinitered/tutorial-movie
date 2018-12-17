module.exports = {
  name: 'api',
  run: async context => {
    const { print, parameters } = context
    print.debug(parameters)
  },
}
