const Discord = require('discord.js')

exports.run = async(client, message, args) => {
  
  const charity = new Discord.MessageEmbed()
.setColor("#86FF0E")
.setTitle("**Charity Davet Menüsü**")
.setThumbnail(client.user.displayAvatarURL())
.setDescription(`●▬▬▬▬▬๑۩۞۩๑▬▬▬▬▬●
<a:wave2:840235869981376554> Merhaba Ben <@839835658960633866>
Prefixim: **c!**
Versiyon: 0.1
●▬▬▬▬▬๑۩۞۩๑▬▬▬▬▬●

**<:ekle:840232708797366273> Eklemek İçin
➥ [Tıkla](https://discord.com/oauth2/authorize?client_id=680511287209492493&scope=bot&permissions=2080907455)
<:davet:840154474772824076> Destek Sunucusu İçin
➥ [TIKLA](https://discord.gg/5nVgJbNUtE)
<:web:840232732076015697> Web Sitemize Gitmek İçin
➥ [TIKLA(YAKINDA)](https://discord.gg/5nVgJbNUtE)
<:upvote:840232656347594814> Oy Vermek İçin 
➥ [TIKLA(YAKINDA)](https://discord.gg/5nVgJbNUtE)**`)
.setFooter("Charity © Tüm Hakları Saklıdır")
.setImage("https://cdn.discordapp.com/attachments/771274496609878016/840229016719982612/20210507_170952.jpg")
message.channel.send(charity)
}


exports.conf = {
  enable: true, 
  aliases: ["invite"], 
  permLevel: 0, 
  guildOnly: true
}

exports.help = {
  name: "davet"
}