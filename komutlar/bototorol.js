
const Discord = require('discord.js')
const db = require('efdb')

exports.run = async(client, message, args) => {
  
  if(!args[0]) return message.channel.send("<:sagoki:840956405090615316> Bot otorolü rolünü ayarlamak için __c!Bot-otorol @rol__")
  
  const rol = message.mentions.roles.first()
  if(!rol) return message.channel.send("<:sagoki:840956405090615316> Lütfen bir rol etiketleyin")
  
  db.set(`bototorol_${message.guild.id}`, rol.id)
  
  message.channel.send("<:sagoki:840956405090615316> Başarılı bir şekilde bot otorol ayarlandı.")
};

exports.conf = {
  enable: true, 
  aliases: [], 
  permLevel: 0,
  guildOnly: true
}

exports.help = {
  name: "bot-otorol"
}