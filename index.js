//-------------- TANIMLAMALAR --------------
const Discord = require("discord.js");
const client = new Discord.Client({
  disableMentions: "everyone",
  ws: { intents: new Discord.Intents(Discord.Intents.ALL) }
});
require('discord-buttons')(client);
const efDB = require("efdb");
const db = new efDB({
  databaseName: "ekData",
  databaseFolder: "veriler",
  adapter: "YamlDB"
});
const fs = require("fs");
const moment = require("moment");
require("moment-duration-format");

//const millisCreated = new Date().getTime() - client.users.cache.get("554266211043770400").createdTimeStamp.getTime();
//    const daysCreated = moment.duration(millisCreated).format("Y [yıl], D [gün], H [saat], m [dakika], s [saniye]")

//----------- AYARLAMALAR ------------
client.ayarlar = {
  token: "ODQwMjI3NjkzOTcwNTg3NzE4.YJVJBA.wLIw43w_2TKm6YyadyFkHXTFS88",
  gelistirici: ["664395846212780032"],
  oauthSecret: "wLBG7zLbGg3eJA-InRi68xX9tHMF6PNk",
  callbackURL: "https://www.charitybot.cf/callback",
  id: "680511287209492493",
  prefix: "c!",
  goldlog: "839650661367939086"
};
client.commands = new Discord.Collection();

var deasync = require("deasync");

function userBul(ID) {
  return deasync(async (_ID, cb) => {
    let output = null;

    try {
      let user = await client.users.fetch(_ID);

      output = {
        tag: user.tag,
        avatar: user.avatarURL(),
        name: user.username,
        isbot: user.bot
      };
    } catch (err) {
      output = {
        tag: "Bulunamadı#0000",
        isbot: null,
        name: "Bulunamadı",
        avatar: client.user.avatarURL()
      };
    }

    cb(null, output);
  })(ID);
}

function kisalt(str) {
  var newstr = "";
  var koyulan = 0;
  if (str.length > 10) {
    dongu: for (var i = 0; i < str.length; i++) {
      const element = str.split("")[i];
      if (i >= 28) {
        if (koyulan < 3) {
          newstr += " .";
          koyulan++;
        } else {
          break dongu;
        }
      } else newstr += element;
    }
    return newstr;
  } else return str;
}

const zaman = moment
  .duration(client.uptime)
  .format(" D [gün], H [saat], m [dakika], s [saniye]");

function botista() {
  return {
    serverSize: client.guilds.cache.size,
    userSize: client.guilds.cache
      .reduce((a, b) => a + b.memberCount, 0)
      .toLocaleString(),
    emojiSize: client.emojis.cache.size.toLocaleString(),
    channelSize: client.channels.cache.size.toLocaleString(),
    uptime: moment
      .duration(client.uptime)
      .format(" D [gün], H [saat], m [dakika], s [saniye]")
  };
}
client.db = db;
client.stats = botista;
client.kisibul = userBul;
client.tools = {
  kisalt: kisalt
};
client.on("ready", async () => {
  console.log(`Bot Online`);
  require("./dash")(client);
});
let tag = "";

client.login(process.env.token);

const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const db2 = require("quick.db");
const http = require("http");
const express = require("express");
require("./util/eventLoader.js")(client);
const path = require("path");
const snekfetch = require("snekfetch");

const app = express();
app.get("/", (request, response) => {
  console.log("7/24 AKTİF TUTMA İŞLEMİ BAŞARILI");
  response.sendStatus(200);
});
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

//c et gtlient.login(process.env.token);  } else return str;
/// OTOROL SİSTEMİ

client.on("guildMemberAdd", async member => {
  let kanal = await db2.fetch(`otoRK_${member.guild.id}`);

  let rol = await db.fetch(`otoRL_${member.guild.id}`);

  let mesaj = db.fetch(`otoRM_${member.guild.id}`);

  if (!rol) return;

  if (!mesaj) {
    client.channels.cache

      .get(kanal)

      .send(
        "<a:giriss:846796111418359829>" +
          member.user.username +
          " HoşGeldin! Otomatik Rolün Verildi Seninle Beraber" +
          member.guild.memberCount +
          " Kişiyiz!"
      );

    return member.roles.add(rol);
  }

  if (mesaj) {
    var mesajs = mesaj

      .replace("-uye-", `${member.user}`)

      .replace("-uyetag-", `${member.user.tag}`)

      .replace("-rol-", `${member.guild.roles.cache.get(rol).name}`)

      .replace("-server-", `${member.guild.name}`)

      .replace("-uyesayisi-", `${member.guild.memberCount}`)

      .replace(
        "-botsayisi-",

        `${member.guild.members.cache.filter(m => m.user.bot).size}`
      )

      .replace("-bolge-", `${member.guild.region}`)

      .replace("-kanalsayisi-", `${member.guild.channels.cache.size}`);

    member.roles.add(rol);

    return client.channels.cache.get(kanal).send(mesajs);
  }
});

// OTOROL SON

//bot otorol 
client.on("guildMemberAdd", member => {

  if (member.user.bot !== true) {

  } else {

    let enginar = db.fetch(`bototorol_${member.guild.id}`)

    if (!enginar) return;

    setTimeout(function() { member.roles.add(db.fetch(`bototorol_${member.guild.id}`)) }, 100)

  };

}); 

//bot otorol son

// SAYAÇ SİSTEMİ

client.on("guildMemberAdd", async member => {
  const kanal = await db.fetch(`sayacK_${member.guild.id}`);
  if (!kanal) return;
  const sayaç = await db.fetch(`sayacS_${member.guild.id}`);
  const sonuç = sayaç - member.guild.memberCount;
  const mesaj = await db.fetch(`sayacHG_${member.guild.id}`);
  ///....

  ///....
  if (!mesaj) {
    return client.channels.cache
      .get(kanal)
      .send(
        "<:giris2:846796202372628531> `" +
          member.user.username +
          "`**Adlı Kullanıcı Aramıza Katıldı!** `" +
          sayaç +
          "` **Kişi Olmamıza** `" +
          sonuç +
          "` **Kişi Kaldı.** `" +
          member.guild.memberCount +
          "` **Kişiyiz!**"
      );
  }

  if (member.guild.memberCount == sayaç) {
    return client.channels
      .get(kanal)
      .send(
        `<:yeey:846839163398520832> **Sayaç Sıfırlandı!** \`${member.guild.memberCount}\` **Kişiyiz!**`
      );
    await db.delete(`sayacK_${member.guild.id}`);
    await db.delete(`sayacS_${member.guild.id}`);
    await db.delete(`sayacHG_${member.guild.id}`);
    await db.delete(`sayacBB_${member.guild.id}`);
  }
  if (mesaj) {
    const mesaj31 = mesaj
      .replace("-uyetag-", `${member.user.tag}`)
      .replace("-server-", `${member.guild.name}`)
      .replace("-uyesayisi-", `${member.guild.memberCount}`)
      .replace(
        "-botsayisi-",
        `${member.guild.members.filter(m => m.user.bot).size}`
      )
      .replace("-bolge-", `${member.guild.region}`)
      .replace("-kanalsayisi-", `${member.guild.channels.size}`)
      .replace("-kalanuye-", `${sonuç}`)
      .replace("-hedefuye-", `${sayaç}`);
    return client.channels.cache.get(kanal).send(mesaj31);
  }
});

client.on("guildMemberRemove", async member => {
  const kanal = await db.fetch(`sayacK_${member.guild.id}`);
  const sayaç = await db.fetch(`sayacS_${member.guild.id}`);
  const sonuç = sayaç - member.guild.memberCount;
  const mesaj = await db.fetch(`sayacBB_${member.guild.id}`);
  if (!kanal) return;
  if (!sayaç) return;
  ///....

  if (!mesaj) {
    return client.channels.cache
      .get(kanal)
      .send(
        "<:cikis2:846838015582273566> `" +
          member.user.username +
          "` **Adlı Kullanıcı Aramızdan Ayrıldı.**`" +
          sayaç +
          "` **Kişi Olmamıza** `" +
          sonuç +
          "` **Kişi Kaldı.** `" +
          member.guild.memberCount +
          "` **Kişiyiz!**"
      );
  }

  if (mesaj) {
    const mesaj31 = mesaj
      .replace("-uye-", `${member.user.tag}`)
      .replace("-server-", `${member.guild.name}`)
      .replace("-uyesayisi-", `${member.guild.memberCount}`)
      .replace(
        "-botsayisi-",
        `${member.guild.members.filter(m => m.user.bot).size}`
      )
      .replace("-bolge-", `${member.guild.region}`)
      .replace("-kanalsayisi-", `${member.guild.channels.cache.size}`)
      .replace("-kalanuye-", `${sonuç}`)
      .replace("-hedefuye-", `${sayaç}`);
    return client.channels.cache.get(kanal).send(mesaj31);
  }
});
// SAYAÇ son 

