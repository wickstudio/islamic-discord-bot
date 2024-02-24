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
const utils_1 = require("../utils");
module.exports = {
    name: 'play',
    data: new discord_js_1.SlashCommandBuilder().setName('play').setDescription('بدأ تشغيل القرأن'),
    execute(client, interaction) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // Defer the reply to show a waiting message.
            yield interaction.deferReply(); //{ ephemeral: true }
            // Get the voice state of the member who used the command.
            const member = yield ((_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.members.fetch(interaction.user.id));
            if (!(member === null || member === void 0 ? void 0 : member.voice.channel)) {
                yield interaction.editReply({ content: 'يرجى الانضمام إلى قناة صوتية ثم استخدام الأمر.' });
                return;
            }
            // Assuming client.data.readers is correctly typed elsewhere in your code
            const selectMenuOptions = client.config.reciters.map((reader) => new discord_js_1.StringSelectMenuOptionBuilder().setLabel(reader.name).setValue(reader.name));
            const embed = (0, utils_1.createMusicPlayerEmbed)(client, {});
            const Buttons = (0, utils_1.createButtonRow)(0, 0, false, false);
            const select = new discord_js_1.StringSelectMenuBuilder()
                .setCustomId('reciterPlay')
                .setPlaceholder('الرجاء اختيار القارئ')
                .addOptions(selectMenuOptions);
            const row = new discord_js_1.ActionRowBuilder().addComponents(select);
            interaction.editReply({ components: [Buttons, row], embeds: [embed] });
        });
    },
};
