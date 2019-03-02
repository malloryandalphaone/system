const Discord = require('discord.js');
const client = new Discord.Client();
var prefix = "!"
const fs = require("fs"); 
const moment = require("moment");  
const ms = require("ms");
const wait = require('util').promisify(setTimeout);

client.on("ready", () => {
client.user.setStatus('idle');
  console.log("Reeebel | Logged in! Server count: ${client.guilds.size}");
  client.user.setActivity("Officials.",{type: 'LISTENING'});
});

if (!prefix) {
    var prefix = "!";
}
client.on('message', msg => {
    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;
    if (!msg.guild.member(client.user).hasPermission(8)) return
    var args = msg.content.slice(prefix.length).split(" ");
    var cmd = args[0];
    switch (cmd) {
      case "send":
        if (!args[1]) return msg.reply(`${prefix}send @user [message]`);
        if (!args[2]) return msg.reply(`${prefix}send @user [message]`);
        if (!msg.mentions.users.first()) return msg.reply(`${prefix}send @user [message]`);
        msg.mentions.users.first().send(args.join(" ").slice(args[0].length));
        break;
    }
})


client.on('messageDelete', message => {
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
    if(!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;
 
    var logChannel = message.guild.channels.find(c => c.name === 'system');
    if(!logChannel) return;
 
    let messageDelete = new Discord.RichEmbed()
    .setTitle('**MESSAGE DELETE**')
    .setColor('WHITE')
    .setThumbnail(message.author.avatarURL)
    .setDescription(`**\n**:wastebasket: Successfully \`\`DELETE\`\` **MESSAGE** In ${message.channel}\n\n**Channel:** \`\`${message.channel.name}\`\` (ID: ${message.channel.id})\n**Message ID:** ${message.id}\n**Sent By:** <@${message.author.id}> (ID: ${message.author.id})\n**Message:**\n\`\`\`${message}\`\`\``)
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL)
 
    logChannel.send(messageDelete);
});
client.on('messageUpdate', (oldMessage, newMessage) => {
 
    if(oldMessage.author.bot) return;
    if(!oldMessage.channel.type === 'dm') return;
    if(!oldMessage.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!oldMessage.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;
 
    var logChannel = oldMessage.guild.channels.find(c => c.name === 'system');
    if(!logChannel) return;
 
    if(oldMessage.content.startsWith('https://')) return;
 
    let messageUpdate = new Discord.RichEmbed()
    .setTitle('**MESSAGE EDIT**')
    .setThumbnail(oldMessage.author.avatarURL)
    .setColor('WHITE')
    .setDescription(`**\n**:wrench: Successfully \`\`EDIT\`\` **MESSAGE** In ${oldMessage.channel}\n\n**Channel:** \`\`${oldMessage.channel.name}\`\` (ID: ${oldMessage.channel.id})\n**Message ID:** ${oldMessage.id}\n**Sent By:** <@${oldMessage.author.id}> (ID: ${oldMessage.author.id})\n\n**Old Message:**\`\`\`${oldMessage}\`\`\`\n**New Message:**\`\`\`${newMessage}\`\`\``)
    .setTimestamp()
    .setFooter(oldMessage.guild.name, oldMessage.guild.iconURL)
 
    logChannel.send(messageUpdate);
});


const devs = ["518113766915702789"]// ايدي الخاص بحسابك
 
const adminprefix = "2!";//Narox
client.on('message', message => {
    var argresult = message.content.split(` `).slice(1).join(' ');
      if (!devs.includes(message.author.id)) return;
     
  if (message.content.startsWith(adminprefix + 'pt')) {
    client.user.setGame(argresult);
      message.channel.sendMessage(`**:white_check_mark:   ${argresult}**`)
  } else
    if (message.content === (adminprefix + "Percie")) {
    message.guild.leave();        
  } else  
  if (message.content.startsWith(adminprefix + 'wt')) {// لجعل البوت في حاله الواتشنق
  client.user.setActivity(argresult, {type:'WATCHING'});
      message.channel.sendMessage(`**:white_check_mark:   ${argresult}**`)
  } else
  if (message.content.startsWith(adminprefix + 'setprefix')) {//لتغير البريفكس
  client.user.setPrefix(argresult).then
      message.channel.send(`**Prefix Changed :white_check_mark: ${argresult}** `)
  } else
  if (message.content.startsWith(adminprefix + 'ls')) {// لجعل البوت في حاله الاستماع
  client.user.setActivity(argresult , {type:'LISTENING'});
      message.channel.sendMessage(`**:white_check_mark:   ${argresult}**`)
  } else     //Narox
    if (message.content.startsWith(adminprefix + 'setname')) {// لتغير اسم البوت
  client.user.setUsername(argresult).then
      message.channel.sendMessage(`**${argresult}** : Done `)
  return message.reply("**Name Changed :white_check_mark:**");
  } else
    if (message.content.startsWith(adminprefix + 'setavatar')) {// لتغير صوره البوت
  client.user.setAvatar(argresult);
    message.channel.sendMessage(`**${argresult}** : تم تغير صورة البوت`);
        } else    
  if (message.content.startsWith(adminprefix + 'st')) {// لعمل ستريمنق للبوت
    client.user.setGame(argresult, "https://www.twitch.tv/idk");
      message.channel.sendMessage(`**:white_check_mark:   ${argresult}**`)
  }
    if(message.content === adminprefix + "restart") {// لعمل ريسترت للبوت
      if (!devs.includes(message.author.id)) return;
          message.channel.send(`:warning:️ **Bot restarting by ${message.author.username}**`);
        console.log("\n\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log(`⚠️ Bot restarting... ⚠️`);
        console.log("===============================================\n\n");
        client.destroy();
        child_process.fork(__dirname + "/bot.js");
        console.log(`Bot Successfully Restarted`);
    }
 
  });

client.on("message",async msg => {
    var prefix = '!';
    if(msg.content.startsWith(prefix  + "submit")){
        var channel = msg.guild.channels.find("name", "submissions");
        if(!channel) return msg.reply("- **i find Channel `submissions`.**`")
    let em = client.emojis.find(e => e.name === "bot");
    let fltr = m => m.author.id === msg.author.id
    let name = '';
   await msg.channel.send('- :orange_book:**, Type Your Name?**.').then(e => {
msg.channel.awaitMessages(fltr, {
    time: 600000,
    max: 1
})
.then(co => {
    name = co.first().content
    co.first().delete()
    let age = '';
    e.edit(`- :green_book:**, Type Your Age?**`).then(e => {
     msg.channel.awaitMessages(fltr, {
         time: 600000,
         max: 1
     })  
     .then(co => {
     age = co.first().content
     co.first().delete();
     let from = '';
     e.edit(`- :closed_book:**, Type Name Of The Game?**`).then(e => {
     msg.channel.awaitMessages(fltr, {
         time: 600000,
         max: 1
     })
      .then(co => {
    name = co.first().content
    co.first().delete()
    let bld = '';
    e.edit(`- :blue_book:**, Type Where Are u from?**`).then(e => {
     msg.channel.awaitMessages(fltr, {
         time: 600000,
         max: 1
     })  
     .then(co => {
      from = co.first().content
      co.first().delete();
      e.edit("- **Are You Sure On Your Submit?**").then(o => {
          o.react("❌")
          .then(() => o.react('✅'))
            .then(() =>o.react('❌'))
            let react1 = (reacton, user) => reacton.emoji.name === '✅' && user.id === msg.author.id
            let react2 = (reacton, user) => reacton.emoji.name === '❌' && user.id === msg.author.id
            let cr1 = o.createReactionCollector(react1, { time: 12000 });
            let cr2 = o.createReactionCollector(react2, { time: 12000 });
            cr2.on("collect", r => {
                msg.reply("- **Done Your Submite Has Been Cancelled**").then(k => {
                    o.delete(2222);
                    k.delete(2222);
                 
                })
            })
            cr1.on("collect", r => {
                msg.reply("- **Done Your Submite Has Been Send**").then(b => {
                    o.delete(2222);
                    b.delete(2222);
                   let emb = new Discord.RichEmbed()
                   .setTitle("- Submit to Clan")
                   .addField("**» Name :**", name)
                   .addField("**» Age :**", age)
                   .addField("**» From :**", bld)
                   .addField("**» Name Of The Game :**", from)
                   .addField("**- Submit by :**", msg.author)
                   .addField("**- ID Account :**", msg.author.id)
                   channel.send(emb);
                })
               
            })
      })
     })
     })
     })
    })
})
   })
    }
});

client.login(process.env.BOT_TOKEN);
