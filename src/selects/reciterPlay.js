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
// Import necessary classes and types from discord.js and @discordjs/voice
const discord_js_1 = require("discord.js");
const voice_1 = require("@discordjs/voice");
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const utils_1 = require("../utils");
// Define the module.exports object for this command
module.exports = {
    name: 'reciterPlay',
    // Asynchronous function to handle the command execution
    execute(client, interaction) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Defer the update as the action may take a while
                yield interaction.deferUpdate();
                // Fetch the reciter details based on the user's selection
                const reciter = client.reciters.get(interaction.values[0]);
                // Get the member who initiated the command and their voice channel
                const member = yield ((_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.members.fetch(interaction.user.id));
                const voiceChannel = member === null || member === void 0 ? void 0 : member.voice.channel;
                // Check if the user is in a voice channel
                if (!voiceChannel) {
                    yield interaction.editReply({ content: 'يرجى الانضمام إلى قناة صوتية ثم استخدام الأمر.' });
                    return;
                }
                // Check for an existing music player in the guild
                const existing = client.guildPlayers.get(interaction.guildId);
                // If there's an existing player, stop it and clear the interval
                if (existing) {
                    yield existing.player.stop(); // Stop the current player
                    clearInterval(existing.updateInterval); // Clear the existing interval
                    // Optionally, you can also disconnect from the voice channel if desired
                    // existing.connection.disconnect();
                }
                // Check if the bot has permissions to join and speak in the voice channel
                const permissions = voiceChannel.permissionsFor(client.user.id);
                if (!(permissions === null || permissions === void 0 ? void 0 : permissions.has(discord_js_1.PermissionsBitField.Flags.Connect)) || !permissions.has(discord_js_1.PermissionsBitField.Flags.Speak)) {
                    yield interaction.editReply('أحتاج إلى الصلاحيات للانضمام والتحدث في قناتك الصوتية!');
                    return;
                }
                // Connect to the voice channel
                const connection = (0, voice_1.joinVoiceChannel)({
                    channelId: voiceChannel.id,
                    guildId: interaction.guild.id,
                    adapterCreator: interaction.guild.voiceAdapterCreator,
                });
                // Create an audio player and stream for the recitation
                const player = (0, voice_1.createAudioPlayer)();
                const { url: youtubeURL, title, shortUrl, duration, durationSec, bestThumbnail } = reciter[0]; // Ensure this URL is valid and accessible
                const stream = (0, ytdl_core_1.default)(youtubeURL, { filter: 'audioonly' });
                const resource = (0, voice_1.createAudioResource)(stream);
                // Play the audio resource in the voice channel
                player.play(resource);
                connection.subscribe(player);
                // Create an embed and buttons for the music player interface
                const Embed = (0, utils_1.createMusicPlayerEmbed)(client, {
                    title: title,
                    url: shortUrl,
                    duration: duration,
                    current: 0,
                    total: durationSec,
                    thumbnail: bestThumbnail.url,
                    reciter: interaction.values[0],
                });
                const Buttons = (0, utils_1.createButtonRow)(reciter.length, 1, true, false);
                let updateInterval;
                // Assuming client.data.readers is correctly typed elsewhere in your code
                const selectMenuOptions = client.config.reciters.map((reader) => new discord_js_1.StringSelectMenuOptionBuilder().setLabel(reader.name).setValue(reader.name));
                const select = new discord_js_1.StringSelectMenuBuilder().setCustomId('reciterPlay').setPlaceholder('تغيير القارئ').addOptions(selectMenuOptions);
                const row = new discord_js_1.ActionRowBuilder().addComponents(select);
                // Event listener when the player starts playing
                player.on(voice_1.AudioPlayerStatus.Playing, () => {
                    const startTime = Date.now();
                    // Set up the interval to update the embed
                    updateInterval = setInterval(() => {
                        // Calculate the new current time
                        const guildPlayer = client.guildPlayers.get(interaction.guildId);
                        if (!guildPlayer) {
                            clearInterval(updateInterval);
                            return;
                        }
                        const newCurrentTime = (0, utils_1.getCurrentTimeSomehow)(guildPlayer.startTime); // Implement this based on your player's time tracking
                        const updatedButtons = (0, utils_1.createButtonRow)(guildPlayer.Records, guildPlayer.index, true, guildPlayer.paused);
                        // Update the embed with the new current time
                        const { url: youtubeURL, title, shortUrl, duration, durationSec, bestThumbnail } = reciter[guildPlayer.index]; // Ensure this URL is valid and accessible
                        const updatedEmbed = (0, utils_1.createMusicPlayerEmbed)(client, {
                            title: title,
                            url: shortUrl,
                            duration: duration,
                            total: durationSec,
                            thumbnail: bestThumbnail.url,
                            current: newCurrentTime,
                            reciter: interaction.values[0],
                        });
                        // Update the reply with the new embed and buttons
                        interaction.editReply({ embeds: [updatedEmbed], components: [updatedButtons, row] }).catch(console.error);
                    }, 5000); // Update every 5 seconds, adjust as necessary
                    const guildPlayer = client.guildPlayers.get(interaction.guildId);
                    if (!guildPlayer) {
                        // Save the player and interval in the client's guildPlayers map
                        client.guildPlayers.set(interaction.guildId, {
                            paused: false,
                            startTime: startTime,
                            index: 0,
                            reciter: interaction.values[0],
                            Records: reciter.length,
                            player: player,
                            updateInterval: updateInterval,
                            connection: connection,
                            messageId: interaction.message.id,
                        });
                        // Send the initial reply with the music player embed and buttons
                        interaction.editReply({ embeds: [Embed], components: [Buttons] }).catch(console.error);
                    }
                    else {
                        // Save the player and interval in the client's guildPlayers map
                        client.guildPlayers.set(interaction.guildId, Object.assign(Object.assign({}, guildPlayer), { startTime: startTime, updateInterval: updateInterval }));
                    }
                });
                // Event listener for when the player finishes playing
                player.on(voice_1.AudioPlayerStatus.Idle, () => {
                    clearInterval(updateInterval); // Clear the interval when the audio stops playing
                    const guildPlayer = client.guildPlayers.get(interaction.guildId);
                    if (reciter[guildPlayer.index + 1]) {
                        const { url: youtubeURL, title, shortUrl, duration, durationSec, bestThumbnail } = reciter[guildPlayer.index + 1]; // Ensure this URL is valid and accessible
                        const stream = (0, ytdl_core_1.default)(youtubeURL, { filter: 'audioonly' });
                        const resource = (0, voice_1.createAudioResource)(stream);
                        client.guildPlayers.set(interaction.guildId, Object.assign(Object.assign({}, guildPlayer), { index: guildPlayer.index + 1 }));
                        // Play the audio resource in the voice channel
                        player.play(resource);
                    }
                });
                // Event listener for errors in the audio player
                player.on('error', (error) => {
                    clearInterval(updateInterval); // Clear the interval on error
                    console.error(`Error: ${error.message}`);
                    // Notify the user of the error
                    interaction.followUp({ content: `Error occurred: ${error.message}`, ephemeral: true }).catch(console.error);
                });
            }
            catch (error) {
                console.error(error);
                // Notify the user if there's an error in executing the command
                yield interaction.editReply({ content: 'حدث خطأ أثناء محاولة تشغيل الصوت.' });
            }
        });
    },
};
