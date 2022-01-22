const config = require('../../botconfig/config.json');
const {
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    Message
} = require("discord.js");
const Data = require("../../models/ticket-user");

module.exports = {
    name: 'delete',
    aliases: [],
    usage: '',
    description: 'Delete the Ticket',
    cooldown: 0,
    userPermissions: [],
    botPermissions: [],
    ownerOnly: false,
    toggleOff: false,

    run: async (client, message, args, ee, prefix) => {
        try {

            if (message.member.roles.cache.has(config.ticket.roles.head_supporter) || message.member.roles.cache.has(config.ticket.roles.head_bot_creator) || message.member.roles.cache.has(config.ticket.roles.moderator) || message.member.roles.cache.has(config.ticket.roles.supporter) || message.member.roles.cache.has(config.ticket.roles.staff) || message.member.roles.cache.has(config.ticket.roles.bot_creator)) {

                Data.findOne({
                    channelID: message.channel.id
                }, async (err, data) => {
                    if (err) throw err;
                    if (!data) return message.reply({
                        embeds: [new MessageEmbed()
                            .setTitle(`No Data Found For This Ticket!`)
                            .setColor(ee.wrongcolor)
                        ]
                    })

                    message.channel.send({
                        embeds: [new MessageEmbed()
                            .setTitle(`Ticket will be deleted in a few seconds!`)
                            .setColor(ee.wrongcolor)
                        ]
                    })
                    // await Data.findOneAndDelete({
                    //     channelID: interaction.channel.id
                    // });
                    setTimeout(() => {
                        message.channel.delete();
                    }, 10 * 1000)

                })

            } else {
                return message.reply({
                    embeds: [new MessageEmbed()
                        .setDescription(`${client.allEmojis.x} **You do not have required roles to use \`${prefix}close\` command!**`)
                        .setColor(ee.wrongcolor)
                    ]
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
}