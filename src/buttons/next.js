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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const voice_1 = require("@discordjs/voice");
const ytdl_core_1 = __importDefault(require("ytdl-core"));
module.exports = {
    name: 'next',
    execute(client, interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check for an existing music player in the guild
            const existing = client.guildPlayers.get(interaction.guildId);
            // If there's an existing player, stop it and clear the interval
            if (existing) {
                yield existing.player.stop(); // Stop the current player
                // Fetch the reciter details based on the user's selection
                const reciter = client.reciters.get(existing.reciter);
                console.log(existing.index);
                existing.index++;
                const { url: youtubeURL, title, shortUrl, duration, durationSec, bestThumbnail } = reciter[existing.index]; // Ensure this URL is valid and accessible
                const stream = (0, ytdl_core_1.default)(youtubeURL, { filter: 'audioonly' });
                const resource = (0, voice_1.createAudioResource)(stream);
                existing.player.play(resource);
                interaction.deferUpdate();
            }
        });
    },
};
