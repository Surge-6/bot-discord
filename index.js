
const Discord = require("discord.js");
const client = new Discord.Client();


client.on('ready', () => {
    console.log(`> Server "${client.guilds.size}" | > Prefix Bot ${prefix}
> Logged in as ${client.user.tag} | > ID Bot ${client.user.id}`);
    client.user.setActivity(' &help | BY SURGE');
});





client.on('message', surge => {
  if (surge.content === 'ping') {
    surge.reply('Pong!');
  }
});

client.on("message" , surge => {
    if (surge.content === 'السلام') {
      surge.reply('وعليكم السلام');
    }
 });

client.on('message', msg => {
    if (msg.content === `Hi`) {
      msg.reply(`Hello`);
    }
  });

  client.on('message', surge => {
    if (surge.content.startsWith('-avatar')) {
        const user = surge.mentions.users.first() || surge.author;
        const avatarEmbed = new Discord.MessageEmbed()
            .setAuthor(`${user.username} Avatar`)  
            .setTitle(`**Avatar link**`)
            .setURL(user.displayAvatarURL({ dynamic: true })) 
            .setColor('RANDOM')
.setImage(user.displayAvatarURL({ dynamic: true }))
.setDescription(`By SURGE`)
surge.channel.send(avatarEmbed);
    }
}); 

client.on('message', surge => {
    if (surge.content === '-help') { 
  let embed = new Discord.MessageEmbed()    
  .setTitle(`:envelope_with_arrow: command list :envelope_with_arrow:`)  
.addField(`:sparkles: public command :sparkles:`,`**=====================**`)
.addField(` 
${prefix}avatar
${prefix}user
${prefix}id
${prefix}ping
${prefix}bot
 `,`**=====================**`)  
.addField(`:zap: Admin command :zap:`,`**=====================**`)
.addField(` 
${prefix}ban
${prefix}kick
${prefix}bans , لعرض عدد البندين في السيرفر
`,`**=====================**`)
  .setThumbnail(`${client.user.displayAvatarURL({ dynamic: true })}`) 
  .setFooter(`By SURGE`) 
  surge.channel.send(embed);  
    } 
});

client.on('message', message => {
  if (message.content === '-bot') {
      const embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle('__Info about the Bot__')
          .setThumbnail(`${client.user.displayAvatarURL({ dynamic: true })}`)
          .addField('Bot ping', `${client.ws.ping}ms`)
          .addField('Servers', client.guilds.cache.size)
          .addField('Bot owner', `<@692735916862603366>`)
          .setFooter(`Requested By ${message.author.username}`,message.author.displayAvatarURL({dynamic: true}))
      message.channel.send(embed)
  }
});
 

client.on('message', surge => {
    if(surge.content.startsWith('-user')) {
       var professor = new Discord.MessageEmbed()
       .setColor('#985db3')
       .setTitle('> Your User')
       .addField('> Your username:',`${surge.author.username}`)
       .addField('> Your ID:',`${surge.author.id}`)
       .addField('> Year',surge.guild.createdAt.getFullYear())
       .addField('> Month', surge.guild.createdAt.getMonth())
       .addField('> Hours', surge.guild.createdAt.getHours())
       .addField('> Minutes', surge.guild.createdAt.getMinutes())
       .addField('> Second', surge.guild.createdAt.getSeconds())
       surge.channel.send(professor)
    }
});

client.on('message', surge => {
    if (!surge.guild) return;
  
    if (surge.content.startsWith('-kick')) {
      if (!surge.member.hasPermission("KICK_MEMBERS"))  return;
      const user = surge.mentions.users.first();
      if (user) {
        const member = surge.guild.member(user);
        if (member) {
          member
            .kick('Optional reason that will display in the audit logs')
            .then(() => {
              surge.reply(`Successfully kicked ${user.tag}`);
            })
            .catch(err => {
              surge.reply('I was unable to kick the member');
              console.error(err);
            });
        } else {
          surge.reply("That user isn't in this guild!");
        }
      } else {
        surge.reply("You didn't mention the user to kick!");
      }
    }
  });

  client.on('message', surge => {
    if (!surge.guild) return;
    if (surge.content.startsWith('-ban')) {
      if (!surge.member.hasPermission("BAN_MEMBERS"))  return;
      const user = surge.mentions.users.first();
      if (user) {
        const member = surge.guild.member(user);
        if (member) {
          member
            .ban({
              reason: 'They were bad!',
            })
            .then(() => {
              surge.reply(`Successfully banned ${user.tag}`);
            })
            .catch(err => {
              surge.reply('I was unable to ban the member');
              console.error(err);
            });
        } else {
          surge.reply("That user isn't in this guild!");
        }
      } else {
        surge.reply("You didn't mention the user to ban!");
      }
    }
  });


client.on('guildMemberAdd', surge => {
    var channel = surge.guild.channels.cache.find(ch => ch.name === 'hi');
    if(!channel) return;
    var embed = new Discord.MessageEmbed()
     .setColor('RED')
     .setTitle('**Member Add , Account Information**')
     .addField('Welcome to the server', `${surge}`)
     .addField('Year',surge.guild.createdAt.getFullYear())
     .addField('Month', surge.guild.createdAt.getMonth())
     .addField('Hours', surge.guild.createdAt.getHours())
     .addField('Minutes', surge.guild.createdAt.getMinutes())
     .addField('Second', surge.guild.createdAt.getSeconds())
    channel.send(embed);
});



client.on('message', surge => {
  if (surge.content.split(" ")[0].toLowerCase() === "-clear") {
         const word = surge.content;
         const number = word.slice(7, word.length);
         const int = Number(number);
          if(!surge.member.hasPermission("MANAGE_MESSAGES")){
             return surge.channel.send("**i need to be given Manage Messages permissions to use this command**");
 }
          if(int >= 101){
             return surge.channel.send("**The max number of messages you can delete is 100**");
 }
          if(!surge.member.hasPermission("MANAGE_MESSAGES")){
             return surge.channel.send("**Looks like you dont have the permissions to do that**");
 }
          if(int == ""){
             return surge.channel.send("**supply A Number to Delete**");
         }else if (isNaN(int)){
             return surge.channel.send('**Must be a number**')
         }
         surge.channel.bulkDelete(int).then(() => {
             return surge.channel.send(`**Cleared ${int} messages.**` ).then(m => m.delete(5000))
     });
     }
 })

client.on('message', surge => {
    if (surge.content.startsWith("-bans")) {
      if (!surge.channel.guild) return;
      surge.channel
       surge.guild.fetchBans()
        .then(bans => surge.channel.send(`:small_orange_diamond: **Server Ban List :** ${bans.size} `))
  .catch(console.error);
}
});

client.on("message", async surge => {
  if (!surge.guild || surge.author.bot) return;
  if (!surge.content.startsWith(prefix)) return;
  if (surge.content.startsWith("-bc")) {
    if (!surge.member.hasPermission("ADMINISTRATOR")) return surge.reply ('You dont have Permissions.');
    if (surge.guild.interval) return surge.reply ('**بث آخر قيد التشغيل ، الرجاء الانتظار حتى ينتهي**')
    let args = surge.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!args) 
      return surge.reply ('**يرجى إرسال رسالة بعد الأمر لإرسالها**');
      
      surge.channel
      .send(
        ">>> **[1] جميع الاعضاء\n[2] الاعضاء المتصلين\n[3] الرتب الخاصة\n[0] الغاء الأمر**"
      )
      .then(m => {
        surge.channel
          .awaitMessages(msg => msg.author.id === surge.author.id, {
            max: 1,
            time: 1000 * 60 * 2,
            errors: ["time"]
          })
          .then(async (c) => {
          var members = null;
            if (c.first().content === "1") {
              members = surge.guild.members.array ();
              c.first().delete();
              m.delete();
            }
            if (c.first().content === "2") {
              members = surge.guild.members
                .filter(m => m.presence.status !== "offline").array();

              c.first().delete();
              m.delete();
            }
            if (c.first().content == "0") {
              c.first().delete();
              m.delete();
              surge.channel.send("**تم الغاء الامر بنجاح**");
            }
            if (c.first().content === "3") {
              m.edit("**>>> ادخل اسم الرتبة من فضلك**").then(ms => {
                surge.channel
                  .awaitMessages(msg => msg.author.id === surge.author.id, {
                    max: 1,
                    time: 1000 * 60 * 2,
                    errors: ["time"]
                  })
                  .then(c => {
                    let role = surge.guild.roles.find(
                      role => role.name === c.first().content
                    );
                    if (!role)
                      return surge.channel
                        .send("**:x: لا استطيع العثور على الرتبة الخاصة بالرسالة**")
                        .then(() => {
                          ms.delete();
                          c.first().delete();
                        });
                    let roleID = role.id;
                    members = surge.guild.roles.get(roleID).members.array();
                    c.first().delete();
                    m.delete();
                  });
              });
            }
          
          if (members == null) return surge.reply ('**رقم غير صالح**');
          if (members.length == 0) return surge.reply ('**لم يتم العثور على الرقم.**');
          else {
            const msg = await surge.channel.send (`**جاري إرسال الرسالة إلى ${members.length} عضواً...**`)
            var count = 0;
            var ycount = 0;
            var xcount = 0;
            surge.guild.interval = await setInterval (() => {
              if (!members [count]) {
                clearInterval (surge.guild.inter);
                msg.edit (new Discord.RichEmbed().setDescription(`** :mailbox_with_mail:  ؛ تم أرسال الرسالة الى  ${ycount} عضواً\n:lock: ؛ و لم أستطع أرسال الرسالة إلى ${xcount} عضواً**`).setTimestamp());
                surge.guild.interval = false;
              } else if (!members[count].user.bot) {
                members [count].send (`${args}`).then (() => {
                  ycount++;
                }).catch (err => {
                  return xcount++;
                });
              }
              count++;
            }, 500)
          }
          })
          .catch(() => m.delete());
      });
  } else if (surge.content.startsWith("-setname")) {
    let args = surge.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!surge.author.id === "692735916862603366") return; ///تعديل مهم حط الايدي تبعك
    client.user.setUsername(args);
    surge.channel.send(`تم تغيير الاسم الى ..**${args}** `);
    } else if (surge.content.startsWith(prefix + "setavatar")) {
    let args = surge.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!surge.author.id === "692735916862603366") return; /// تعديل مهم حط الايدي تبعك
    client.user.setAvatar(args).catch(err => surge.reply("send a valid url"));
    surge.channel.send(`تم تغيير الصورة الى :**${args}** `);
  }
});

client.on('message' , surge => {
    if(surge.author.bot) return;
    if(surge.content.startsWith("-ping")) {
      if (!surge.channel.guild) return;
      surge.channel
      surge.channel.send('SURGE').then((msg) => {
     if (!surge.channel.guild) return;
     surge.channel
  var PinG = `${Date.now() - msg.createdTimestamp}`
  var ApL = `${Math.round(client.ping)}`
        msg.edit(`\`\`\`javascript\nTime taken: ${PinG} ms.\nDiscord API: ${ApL} ms.\`\`\``);
   })
    }  
   });



client.on('message', surge => {
    if (surge.author.bot) return;
    if (surge.content.startsWith('-id')) {
      var user = surge.guild.member (surge.mentions.members.first() || surge.author);
        const embed = new Discord.MessageEmbed()
    .setColor("RANDOM") 
     .addField(`ID USER : [ ${user.id} ]`,`${user.user}`)
     .setThumbnail(user.user.avatarURL())
    .setFooter(`- Requested By: ${surge.author.tag}`)
    surge.channel.send({embed});
        }
    });




client.login(process.env.BOT_TOKEN);
