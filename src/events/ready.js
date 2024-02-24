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
const utils_1 = require("../utils");
const node_cron_1 = __importDefault(require("node-cron"));
const azkar_1 = __importDefault(require("../azkar"));
module.exports = {
    name: 'ready',
    execute(client) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const zkr of utils_1.adkarAPI) {
                // if (zkr.timeOfDay == 'night') {
                //   azkar.run(client, zkr.timeOfDay, zkr.url, zkr.color);
                // }
                node_cron_1.default.schedule(zkr.time, () => {
                    azkar_1.default.run(client, zkr.timeOfDay, zkr.url, zkr.color);
                });
            }
        });
    },
};
