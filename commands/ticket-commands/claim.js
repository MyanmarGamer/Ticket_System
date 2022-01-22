const config = require('../../botconfig/config.json');
const {
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    Message
} = require("discord.js");
const Data = require("../../models/ticket-user");

module.exports = {
    name: 'claim',
    aliases: [],
    usage: '',
    description: 'Claim the Ticket',
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

                    if (data.claimed == true) return message.reply({
                        embeds: [new MessageEmbed()
                            .setDescription(`This Ticket is Claimed by <@${data.claimedBy}>.`)
                            .setColor(ee.wrongcolor)
                        ],
                        ephemeral: true
                    })
                    await Data.updateOne({
                        channelID: message.channel.id
                    }, {
                        claimed: true,
                        claimedBy: message.author.id
                    });

                    message.channel.permissionOverwrites.edit(message.author.id, {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true,
                        ATTACH_FILES: true,
                        READ_MESSAGE_HISTORY: true,
                        MANAGE_CHANNELS: true
                    });

                    const ClaimedEmbed = new MessageEmbed()
                        .setDescription(`Ticket is Now Claimed by ${message.member}`)
                        .setColor(ee.color)

                    message.channel.send({
                        embeds: [ClaimedEmbed]
                    })

                })
                
            } else {
                return message.reply({
                    embeds: [new MessageEmbed()
                        .setDescription(`${client.allEmojis.x} **You do not have required roles to use \`${prefix}claim\` command!**`)
                        .setColor(ee.wrongcolor)
                    ]
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
}