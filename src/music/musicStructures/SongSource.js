const testRegex = (regex, identifier) =>
  Array.isArray(regex)
    ? regex.some(r => r.test(identifier))
    : regex.test(identifier)
const getRegex = (regex, identifier) =>
  Array.isArray(regex) ? regex.find(r => r.test(identifier)) : regex

module.exports = class SongSource {
  static test (identifier) {
    return this.customSources.some(([regex]) => testRegex(regex, identifier))
  }

  static async provide (manager, identifier, requestedBy) {
    try {
      const source = this.customSources.find(([regex]) =>
        testRegex(regex, identifier)
      )
      const [regex, cb] = source
      const result = await cb(
        getRegex(regex, identifier).exec(identifier),
        manager,
        requestedBy
      )
      return result
    } catch (e) {
      console.log(e)
    }
  }

  static get customSources () {
    return []
  }

  static async getClosestVideo (client, title) {
    return client.playerManager
      .fetchTracks(`ytsearch:${title}`)
      .then(r => r && r[0])
  }
}
