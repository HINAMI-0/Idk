const Discord = require("discord.js");
const client = new Discord.Client();

const Canvas = require("canvas");


client.on("ready", () => {
  console.log("hooo");
});


client.on("guildMemberAdd", async member => {
  if(member.guild.id === '774642153389293569'){
    const channel = member.guild.channels.cache.find(channel => channel.id === '799608854773628938');
    if(!channel) return;
    
    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');
    const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/799608854773628938/799925980470575154/kontol.png');
    ctx.drawImage(background, 0, 0, canvas.width-5, canvas.height-5);
    
    ctx.strokeStyle = '#303030';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = '32px Impact';
    ctx.fillStyle = '#070600';
    ctx.fillText('Welcome To Legacy', canvas.width / 2.5, canvas.height / 3.53);
    
    ctx.font = '45px Impact';
    ctx.fillStyle = '#070600';
    ctx.fillText(`${member.user.username}#${member.user.discriminator}`, canvas.width / 2.4, canvas.height / 1.9);
    
    
    ctx.font = '32px Impact';
    ctx.fillStyle = '#070600';
    ctx.fillText(`Kamu Member ke ${client.guilds.cache.get("774642153389293569").memberCount}!`, canvas.width / 2.44, canvas.height / 1.41);
    
    ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'test.png');
    const welcomeembed = new Discord.MessageEmbed()
    .setAuthor(`Welcome ${member.user.username}`)
    .setColor('#00FFFF')
    .setDescription(`Hey ${member.user}`)
    
    .setImage("attachment://test.png")
    .attachFiles(attachment)
    channel.send("Welcome To Our Server", welcomeembed)
  }
});

client.on('message', message => {
	if (message.content === '!join') {
		client.emit('guildMemberAdd', message.member);
	}
});
