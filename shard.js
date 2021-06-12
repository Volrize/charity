const Discord = require('discord.js');
const client = new Discord.Client()
const express = require('express');
const ayarlar = require('./ayarlar.json');
const captain = new Discord.ShardingManager('./index.js', {
    totalShards: 2,
    token: (process.env.token)
});
// nbr kodrılar
//https://discord.com/api/webhooks/852974391548575794/thZDtuzFryqxID0uFtqLdiT_t4BrO2YhZMXc-wUr1jLjGRKxaVQr3UsPTV7DpfPNG5F3
captain.on('shardCreate', shard => {
  console.log(`${shard.id+1} IDli Başlatıldı ve Kullanıma Hazır.`)
    const webhook = new Discord.WebhookClient("852974391548575794","thZDtuzFryqxID0uFtqLdiT_t4BrO2YhZMXc-wUr1jLjGRKxaVQr3UsPTV7DpfPNG5F3")
    webhook.send(`Shard **${shard.id+1}/${shard.id+1} [Bağlanılıyor]** :idle: \nCharity Discord'a Bağlanıyor.\n--------------------------------------------`)
    setTimeout(() => {
  const webhook = new Discord.WebhookClient("852974391548575794","thZDtuzFryqxID0uFtqLdiT_t4BrO2YhZMXc-wUr1jLjGRKxaVQr3UsPTV7DpfPNG5F3")
  webhook.send(`Shard **${shard.id+1}/${shard.id+1} [Bağlanıldı]** :online: \nCharity Discord'a Bağlandı ve Hazır.\n--------------------------------------------`)
  }, 3000)
});
// WebHook Oluşturup ID ve token gir
setTimeout(() => {
    captain.broadcastEval("process.exit()");
}, 8600000);
captain.spawn();
 