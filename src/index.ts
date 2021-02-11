import Discord from 'discord.js';
import fs from 'fs';
const client = new Discord.Client();

let briskcount = 0;
client.on('ready', () => {
    console.log('PSSSSSSSSSSSSSS');
    briskcount = parseInt(fs.readFileSync('./brisk.txt', {encoding: 'utf-8'}));
})
const PREFIX = ',';
client.on('message', (message) => {
    const args = parseCommand(message.content, PREFIX);
    if (!args) return;
    const command = args.shift();
    if (command && command in COMMANDS) {
        COMMANDS[command](args, message);
    } 
    
})

interface commandMap {
    [key: string]: (args: string[], message: Discord.Message) => void
}

 
const COMMANDS: commandMap = {
    'brisk': (args: string[], message: Discord.Message): void => {
        if (args.length !== 0) {
            try {
                const num = parseInt(args[0]);
                updateCount(num);
            } catch (error) {
                
            }
        }
        message.channel.send(`Brisk Count: ${briskcount}`);
    }
}

const updateCount = (count: number) => {
    briskcount += count;
    fs.writeFileSync("./brisk.txt", `${briskcount}`);
    
}


const parseCommand = (command: string, prefix: string): string[] => {
    if (!command.startsWith(prefix))
        return [] as string[];
    
    const args = command.split(/ +/);
    args[0] = args[0].substring(1);
    return args;
    
}

client.login(process.env.BOT_TOKEN);