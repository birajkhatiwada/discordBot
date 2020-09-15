require('dotenv').config()
const {Client, MessageAttachment, Message} = require('discord.js');
const client = new Client();
var GphApiClient = require('giphy-js-sdk-core')

const botAPI = process.env.BOT_API;
const giphyAPI = process.env.GIPHY_API;

// console.log(botAPI);


giphyClient = GphApiClient(giphyAPI);


client.on('ready', ()=>{
    console.log(`Logged in as ${client.user.tag}!`)
})

var greetings = ['hello', 'hi', 'sup', 'wassup', 'wasup'];
var gif = ['gif', 'gifs'];
var sticker = ['sticker', 'stickers'];

client.on('message', msg =>{

    let args = msg.content.split(" ");

    if(args[0] === 'ping'){
        msg.reply('pong');
    }
    if(greetings.includes(args[0])){
        msg.reply('hi :wave:, how ya doing?');
    }
    //gifs search
    if(gif.includes(args[0].toLowerCase())){
        if(!args[1]){
            msg.reply('missed the second argument! it goes \"gifs \'type\'\"');
        }else{
            giphyClient.search('gifs', {'q': args[1]})
            .then((response) => {
                var totalResponse = response.data.length;
                console.log(totalResponse);
                var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponse;
                var responseFinal = response.data[responseIndex];
                msg.channel.send("", {
                    files: [responseFinal.images.fixed_height.url]
                })
            })
            .catch((err)=>{
                msg.reply(':grimacing: there was an error!')
            })
        }

    }
    //sticker search
    if(sticker.includes(args[0].toLowerCase())){
        if(!args[1]){
            msg.reply('missed the second argument! it goes \"sticker \'type\'\"');
        }else{
            giphyClient.search('stickers', {'q': args[1]})
            .then((response) => {
                var totalResponse = response.data.length;
                console.log(totalResponse);
                var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponse;
                var responseFinal = response.data[responseIndex];
                msg.channel.send("", {
                    files: [responseFinal.images.fixed_height.url]
                })
            })
            .catch((err)=>{
                msg.reply(':grimacing: there was an error!')
        })
        }
    }
});

client.login(botAPI);
