"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = __importDefault(require("discord.js"));
var fs_1 = __importDefault(require("fs"));
var client = new discord_js_1.default.Client();
var briskcount = 0;
client.on('ready', function () {
    console.log('PSSSSSSSSSSSSSS');
    briskcount = parseInt(fs_1.default.readFileSync('./brisk.txt', { encoding: 'utf-8' }));
});
var PREFIX = ',';
client.on('message', function (message) {
    var args = parseCommand(message.content, PREFIX);
    if (!args)
        return;
    var command = args.shift();
    if (command && command in COMMANDS) {
        COMMANDS[command](args, message);
    }
});
var COMMANDS = {
    'brisk': function (args, message) {
        if (args.length !== 0) {
            try {
                var num = parseInt(args[0]);
                updateCount(num);
            }
            catch (error) {
            }
        }
        message.channel.send("Brisk Count: " + briskcount);
    }
};
var updateCount = function (count) {
    briskcount += count;
    fs_1.default.writeFileSync("./brisk.txt", "" + briskcount);
};
var parseCommand = function (command, prefix) {
    if (!command.startsWith(prefix))
        return [];
    var args = command.split(/ +/);
    args[0] = args[0].substring(1);
    return args;
};
client.login(process.env.BOT_TOKEN);
