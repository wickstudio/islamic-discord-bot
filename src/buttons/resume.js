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
module.exports = {
    name: 'resume',
    execute(client, interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            // Retrieve the music player for the guild
            const existing = client.guildPlayers.get(interaction.guildId);
            // If a player exists and it's currently paused, resume it
            if (existing.player && existing.paused) {
                existing.player.unpause();
                client.guildPlayers.set(interaction.guildId, Object.assign(Object.assign({}, existing), { paused: false }));
                interaction.deferUpdate();
            }
            else {
                // If no music is paused, let the user know
                interaction.reply({ content: 'There is no paused to resume!', ephemeral: true });
            }
        });
    },
};
