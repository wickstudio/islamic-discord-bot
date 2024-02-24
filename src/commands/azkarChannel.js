"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    name: 'azkar',
    data: new discord_js_1.SlashCommandBuilder()
        .setName('azkar')
        .setDescription('إعداد قناة الإذكار')
        .addChannelOption((option) => option.setName('channel').setDescription('القناة الخاصة بالأذكار').addChannelTypes(discord_js_1.ChannelType.GuildText).setRequired(true)),
    execute(client, interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            // Defer the reply to show a waiting message.
            yield interaction.deferReply({ ephemeral: true });
            const channel = interaction.options.get('channel');
            client.db.set(`azkar_${interaction.guildId}`, {
                channelId: channel === null || channel === void 0 ? void 0 : channel.value,
            });
            interaction.editReply({ content: `تم أعداد قناة الأذكار بنجاح` });
        });
    },
};
