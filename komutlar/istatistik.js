const Discord = require("discord.js");
const moment = require("moment");
const os = require("os");
require("moment-duration-format");
exports.run = async (client, message, args) => {
  const payidarzaman = moment

    .duration(client.uptime)
    .format(" D [gün], H [saat], m [dakika], s [saniye]");
  const istatistikler = new Discord.MessageEmbed()
    .setColor("#86FF0E")
 .setThumbnail(client.user.displayAvatarURL())
    .addField("**<a:pinging:806881174843555900> __Ping__**",`Mesaj Gecikmesi: ${new Date().getTime() - message.createdTimestamp} ms\nBot Gecikmesi: ${client.ws.ping}ms`, true)
    .addField("**<:users_logo:806853397272985630> __Kullanıcı Sayısı__** ", `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`, true)
    .addField("**<:sunucu:818095291311325194> __Sunucu Sayısı__**", `${client.guilds.cache.size.toLocaleString()}`, true)
    .addField("**<:kanal:840302027372101682> __Kanal Sayısı__**", `${client.channels.cache.size.toLocaleString()}`, true)
    .addField("**<:saat:806842019049635860> __Aktiflik__**", `${payidarzaman}`, true)
    .addField("**<:js:806857123308765184> __Node.JS Versiyon__**", `${process.version}`, true)
    .addField("**<:rem:806842164876542003> __Ram Kullanımı__**", `${(process.memoryUsage().heapUsed / 1024 / 512).toFixed(2) + " MB"}`, true)
    .addField("**<:dclogo:806781623441031169> __Discord.JS__**", `${Discord.version}`, true)
    .addField("**<:bolge:806870987483381830> __Konum__**", `Turkey :flag_tr:`, true)
//    .addField("**__Bot Sahibi__**", `∾ Pâ.dll#7007`, true)
  //  .addField("**__Geliştirici__**", `∾ Pâ.dll#7007`, true)
    .addField("**<:win:806608012118720542> __İşletim Sistemi__**", ` \`Windows 10 | 64 Bit\` `, true)
    .addField("**<:cpu:806871548169814096> __CPU__**",` \`\`\`Intel(R) Xeon(R) CPU @ 2.30GHz\`\`\` `)
 .setImage("https://cdn.discordapp.com/attachments/771274496609878016/840229016719982612/20210507_170952.jpg")
 .setFooter("Charity © Tüm Hakları Saklıdır") 
  return message.channel.send(istatistikler);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['i'],
  permLevel: 0
};

exports.help = {
  name: "istatistik",
  description: "is",
  usage: "is"
};