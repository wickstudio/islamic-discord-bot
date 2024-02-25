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
exports.createButtonRow = exports.createMusicPlayerEmbed = exports.adkarAPI = exports.getCurrentTimeSomehow = exports.calculateLineCount = exports.getRandomInt = exports.wrapText = exports.fetchAzkar = void 0;
const discord_js_1 = require("discord.js");
const canvas_1 = require("canvas");
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const fonts = fs_1.default.readdirSync('assets/fonts');
for (const font of fonts) {
    (0, canvas_1.registerFont)(`./assets/fonts/${font}`, { family: font.split('.')[0] });
}
const adkarAPIMorning = [
    {
        color: 'black',
        timeOfDay: 'morning',
        url: 'https://api.islamicadkar.xyz/api/adkar/morning',
        schedule: '0 6 * * *', // 6 AM
    },
    {
        color: 'black',
        timeOfDay: 'morning',
        url: 'https://api.islamicadkar.xyz/api/adkar/morning',
        schedule: '0 7 * * *', // 7 AM
    },
    {
        color: 'black',
        timeOfDay: 'morning',
        url: 'https://api.islamicadkar.xyz/api/adkar/morning',
        schedule: '0 8 * * *', // 8 AM
    },
    {
        color: 'black',
        timeOfDay: 'morning',
        url: 'https://api.islamicadkar.xyz/api/adkar/morning',
        schedule: '0 9 * * *', // 9 AM
    },
    {
        color: 'black',
        timeOfDay: 'morning',
        url: 'https://api.islamicadkar.xyz/api/adkar/morning',
        schedule: '0 10 * * *', // 10 AM
    },
    {
        color: 'black',
        timeOfDay: 'morning',
        url: 'https://api.islamicadkar.xyz/api/adkar/morning',
        schedule: '0 11 * * *', // 11 AM
    },
    {
        color: 'black',
        timeOfDay: 'morning',
        url: 'https://api.islamicadkar.xyz/api/adkar/morning',
        schedule: '0 12 * * *', // 12 PM
    },
    {
        color: 'black',
        timeOfDay: 'morning',
        url: 'https://api.islamicadkar.xyz/api/adkar/morning',
        schedule: '0 13 * * *', // 1 PM
    },
    {
        color: 'black',
        timeOfDay: 'morning',
        url: 'https://api.islamicadkar.xyz/api/adkar/morning',
        schedule: '0 14 * * *', // 2 PM
    },
    {
        color: 'black',
        timeOfDay: 'morning',
        url: 'https://api.islamicadkar.xyz/api/adkar/morning',
        schedule: '0 15 * * *', // 3 PM
    },
    {
        color: 'black',
        timeOfDay: 'morning',
        url: 'https://api.islamicadkar.xyz/api/adkar/morning',
        schedule: '0 16 * * *', // 4 PM
    },
    {
        color: 'black',
        timeOfDay: 'morning',
        url: 'https://api.islamicadkar.xyz/api/adkar/morning',
        schedule: '0 17 * * *', // 5 PM
    },
    {
        color: 'black',
        timeOfDay: 'morning',
        url: 'https://api.islamicadkar.xyz/api/adkar/morning',
        schedule: '0 18 * * *', // 6 PM
    },
    {
        color: 'black',
        timeOfDay: 'evening',
        url: 'https://api.islamicadkar.xyz/api/adkar/evening',
        schedule: '0 18 * * *', // 6 PM
    },
    {
        color: 'black',
        timeOfDay: 'evening',
        url: 'https://api.islamicadkar.xyz/api/adkar/evening',
        schedule: '0 19 * * *', // 7 PM
    },
    {
        color: 'black',
        timeOfDay: 'evening',
        url: 'https://api.islamicadkar.xyz/api/adkar/evening',
        schedule: '0 20 * * *', // 8 PM
    },
    {
        color: 'black',
        timeOfDay: 'evening',
        url: 'https://api.islamicadkar.xyz/api/adkar/evening',
        schedule: '0 21 * * *', // 9 PM
    },
    {
        color: 'white',
        timeOfDay: 'night',
        url: 'https://api.islamicadkar.xyz/api/adkar/night',
        schedule: '0 21 * * *', // 9 PM
    },
    {
        color: 'white',
        timeOfDay: 'night',
        url: 'https://api.islamicadkar.xyz/api/adkar/night',
        schedule: '0 22 * * *', // 10 PM
    },
    {
        color: 'white',
        timeOfDay: 'night',
        url: 'https://api.islamicadkar.xyz/api/adkar/night',
        schedule: '0 23 * * *', // 11 PM
    },
    {
        color: 'white',
        timeOfDay: 'night',
        url: 'https://api.islamicadkar.xyz/api/adkar/night',
        schedule: '0 0 * * *', // 12 AM
    },
    {
        color: 'white',
        timeOfDay: 'night',
        url: 'https://api.islamicadkar.xyz/api/adkar/night',
        schedule: '0 1 * * *', // 1 AM
    },
    {
        color: 'white',
        timeOfDay: 'night',
        url: 'https://api.islamicadkar.xyz/api/adkar/night',
        schedule: '0 2 * * *', // 2 AM
    },
    {
        color: 'white',
        timeOfDay: 'night',
        url: 'https://api.islamicadkar.xyz/api/adkar/night',
        schedule: '0 3 * * *', // 3 AM
    },
    {
        color: 'white',
        timeOfDay: 'night',
        url: 'https://api.islamicadkar.xyz/api/adkar/night',
        schedule: '0 4 * * *', // 4 AM
    },
    {
        color: 'white',
        timeOfDay: 'night',
        url: 'https://api.islamicadkar.xyz/api/adkar/night',
        schedule: '0 5 * * *', // 5 AM
    },
    {
        color: 'white',
        timeOfDay: 'night',
        url: 'https://api.islamicadkar.xyz/api/adkar/night',
        schedule: '0 6 * * *', // 6 AM
    },
];
exports.adkarAPI = adkarAPI;
function fetchAzkar(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(url);
            const data = yield response.data;
            return data; // Assuming the API returns the Azkar data in a structure like the AzkarData interface
        }
        catch (error) {
            console.error('Could not fetch Azkar:', error);
            return 'Failed to fetch Azkar.';
        }
    });
}
exports.fetchAzkar = fetchAzkar;
function getRandomInt(min, max) {
    min = Math.ceil(min); // Ensure the minimum is rounded up to the nearest whole number
    max = Math.floor(max); // Ensure the maximum is rounded down to the nearest whole number
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.getRandomInt = getRandomInt;
function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' '); // Split the text into words
    var line = ''; // Initialize the line
    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' '; // Add the next word to the line
        var metrics = context.measureText(testLine); // Measure the text
        var testWidth = metrics.width; // Get the width of the text
        // If the line is too wide and it's not the first word, start a new line
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y); // Draw the current line
            line = words[n] + ' '; // Start a new line with the current word
            y += lineHeight; // Move down to the next line
        }
        else {
            line = testLine; // Otherwise, add the word to the current line
        }
    }
    context.fillText(line, x, y); // Draw the last line
}
exports.wrapText = wrapText;
function calculateLineCount(context, text, maxWidth) {
    var words = text.split(' '); // Split the text into words
    var line = ''; // Initialize the line
    var lineCount = 0;
    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' '; // Add the next word to the line
        var metrics = context.measureText(testLine); // Measure the text
        var testWidth = metrics.width; // Get the width of the text
        // If the line is too wide and it's not the first word, start a new line
        if (testWidth > maxWidth && n > 0) {
            line = words[n] + ' '; // Start a new line with the current word
            lineCount++;
        }
        else {
            line = testLine; // Otherwise, add the word to the current line
        }
    }
    // Account for the last line if it has content
    if (line.trim().length > 0) {
        lineCount++;
    }
    return lineCount;
}
exports.calculateLineCount = calculateLineCount;
function createProgressBar(current, total) {
    const barLength = 15;
    const currentProgress = Math.round((barLength * current) / total);
    return '▬'.repeat(currentProgress) + '🔘' + '▬'.repeat(barLength - currentProgress < 0 ? 0 : barLength - currentProgress);
}
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const partInSeconds = seconds % 60;
    return `${minutes}:${partInSeconds.toString().padStart(2, '0')}`;
}
function createMusicPlayerEmbed(client, { title, url, duration, current, total, thumbnail, reciter }) {
    var _a, _b;
    const progressBar = createProgressBar(current || 0, total || 120);
    const embed = new discord_js_1.EmbedBuilder().setColor('#0099ff').setTitle('تشغيل القرآن');
    if (title)
        embed.setDescription(`[${title}](${url})`);
    if (duration)
        embed.addFields({ name: 'المدة', value: `${formatTime(current)} / ${duration}`, inline: true }, { name: 'القارئ', value: `${reciter || 'None'}`, inline: true }, { name: '\u200B', value: progressBar, inline: false } // The progress bar
        );
    else
        embed
            .addFields({ name: 'المدة', value: `00:00 / 00:00`, inline: true }, { name: 'القارئ', value: `${reciter || 'None'}`, inline: true }, { name: '\u200B', value: progressBar, inline: false } // The progress bar
        )
            .setDescription('Nothing is currently playing.');
    if (thumbnail)
        embed.setThumbnail(thumbnail);
    embed
        .setTimestamp()
        .setFooter({ text: ((_a = client.user) === null || _a === void 0 ? void 0 : _a.displayName) || '', iconURL: ((_b = client.user) === null || _b === void 0 ? void 0 : _b.avatarURL()) || client.user.defaultAvatarURL });
    return embed;
}
exports.createMusicPlayerEmbed = createMusicPlayerEmbed;
function createButtonRow(all, index, isPlaying, paused) {
    const row = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
        .setCustomId('previous')
        .setLabel('⏮')
        .setStyle(discord_js_1.ButtonStyle.Secondary)
        .setDisabled(index === 0), // Disable if at the start
    new discord_js_1.ButtonBuilder()
        .setCustomId(paused ? 'resume' : 'pause')
        .setLabel(paused ? '▶' : `||`)
        .setStyle(discord_js_1.ButtonStyle.Success)
        .setDisabled(!isPlaying), // Disable if at the start
    new discord_js_1.ButtonBuilder()
        .setCustomId('next')
        .setLabel('⏭')
        .setStyle(discord_js_1.ButtonStyle.Secondary)
        .setDisabled(index === all) // Disable if at the end
    );
    return row;
}
exports.createButtonRow = createButtonRow;
// Function to calculate the current time of the song
function getCurrentTimeSomehow(startTime) {
    if (!startTime) {
        return 0;
    }
    const currentTime = Date.now();
    const elapsedTimeMs = currentTime - startTime;
    return Math.floor(elapsedTimeMs / 1000); // Convert milliseconds to seconds
}
exports.getCurrentTimeSomehow = getCurrentTimeSomehow;
