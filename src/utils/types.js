"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const discord_js_1 = __importStar(require("discord.js"));
const quick_db_1 = require("quick.db");
class Client extends discord_js_1.default.Client {
    constructor() {
        super({ intents: [discord_js_1.GatewayIntentBits.GuildVoiceStates, discord_js_1.GatewayIntentBits.Guilds] });
        this.commands = new discord_js_1.Collection();
        this.interactions = new discord_js_1.Collection();
        this.selects = new discord_js_1.Collection();
        this.buttons = new discord_js_1.Collection();
        this.db = new quick_db_1.QuickDB();
        this.reciters = new discord_js_1.Collection();
        this.guildPlayers = new discord_js_1.Collection();
        this.config = require('../config.json');
    }
}
exports.Client = Client;
