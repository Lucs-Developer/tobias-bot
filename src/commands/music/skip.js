const { Command } = require("../../");

module.exports = class Skip extends Command {
  constructor(client, path) {
    super(client, path, {
      name: 'skip',
      category: 'music',
      utils: {
        requirements: { guildOnly: true, sameVoiceChannelOnly: true, guildPlaying: true }
      }
    })
  }

  run({ message, guild }) {
    const guildPlayer = this.client.playerManager.get(guild.id);
    message.react('⏩').then(() => guildPlayer.next())
  }
}