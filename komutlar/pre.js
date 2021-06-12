const Discord = require('discord.js')
const db = require('efdb')

exports.run = async(client, message, args) => {
  
  if(message.author.id !== '664395846212780032') return message.channel.send('Bu komutu kullanabilmek için sahibim olmalısın')

if(args[0] == 'ver') {
  if(!args[1]) return message.channel.send("id gir")
 db.set(`pre_${message.guild.id}`, 'aktif')
}

if(args[0] == 'al') {
  if(!args[1]) return message.channel.send("id gir")
db.set(`pre_${message.guild.id}`, 'kapali')
}

}


exports.conf = {
  enable: true, 
  aliases: ["pre"], 
  permLevel: 0,
  guildOnly: true
}

exports.help = {
  name: "premium"
}