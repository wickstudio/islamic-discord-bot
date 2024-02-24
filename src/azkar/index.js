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
const canvas_1 = require("canvas");
const discord_js_1 = require("discord.js");
const utils_1 = require("../utils");
const path_1 = __importDefault(require("path"));
exports.default = {
    run(client, timeOfDay, apiUrl, color) {
        return __awaiter(this, void 0, void 0, function* () {
            // Fetch all entries in the database
            const allEntries = yield client.db.all();
            // Filter out entries whose keys start with 'azkar'
            const azkarEntries = allEntries.filter((entry) => entry.id.startsWith('azkar'));
            for (const guild of azkarEntries) {
                try {
                    const channel = client.channels.cache.get(guild.value.channelId);
                    const canvas = yield (0, canvas_1.createCanvas)(1109, 500);
                    const ctx = canvas.getContext('2d');
                    // Load an image
                    const image = yield (0, canvas_1.loadImage)(path_1.default.resolve(`./assets/${timeOfDay}/${(0, utils_1.getRandomInt)(1, 3)}.png`));
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                    // Fetch the Azkar text
                    const zkr = yield (0, utils_1.fetchAzkar)(apiUrl);
                    // Set the font size and style
                    ctx.fillStyle = color;
                    ctx.font = '25px AlHurraTxtBold Bold'; // Adjust the font size and style as needed
                    ctx.textAlign = 'center'; // Align text horizontally to center
                    ctx.textBaseline = 'middle'; // Align text vertically to middle
                    const lines = yield (0, utils_1.calculateLineCount)(ctx, zkr.message, 500);
                    // The username and Azkar text will be centered at these x positions
                    const centerX = canvas.width / 2;
                    const centerY = canvas.height / 2;
                    console.log(zkr.message);
                    // Draw the Azkar text
                    yield (0, utils_1.wrapText)(ctx, zkr.message, centerX, centerY - ((lines / 2) * 45) / 2, 500, 30);
                    const attachment = new discord_js_1.AttachmentBuilder(canvas.toBuffer(), { name: 'azkar.png' });
                    channel.send({ files: [attachment] });
                }
                catch (e) {
                    console.error(e);
                }
            }
        });
    },
};
