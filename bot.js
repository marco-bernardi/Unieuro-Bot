const { Console } = require('console');
const puppeteer = require('puppeteer');//headless browser emulator
const { Telegraf } = require('telegraf')
const request = require('request');


//TELEGRAM
const bot = new Telegraf('BOT-TOKEN')
bot.launch()

//VAR
let time = 5000;

async function run (url, model) {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setRequestInterception(true);//blocks images ,fonts and css
    page.on('request', (request) => {
        if (request.resourceType() === 'image') request.abort();
        else if (request.resourceType() === 'media') request.abort();
        else if (request.resourceType() === 'font') request.abort();
        else if (request.resourceType() === 'stylesheet') request.abort();
        else request.continue();
      }); 
    await page.goto(url);
    const heading1 = await page.$eval('#features > div.details-table-head.features > div > div > span:nth-child(2)',(el) => el.textContent)
    if (heading1 != "Non Disponibile"){
        console.log("Porca Madonna ci sono")
        if (model == 3060){
            bot.telegram.sendMessage('-1001215133533', 'Sono disponibili le 3060TI Da unieuro accorri.\n\nhttps://www.unieuro.it/online/Schede-grafiche/DUAL-RTX3060TI-O8G-pidASU60YV0G12M0NA00')
        } else if (model == 3070){
            bot.telegram.sendMessage('-1001215133533', 'Sono disponibili le 3070 Da unieuro accorri.\n\nhttps://www.unieuro.it/online/Schede-grafiche/DUAL-RTX3070-O8G-pidASU90YV0FQ0M0NA00')
        }
    } else{
        console.log("Porca Madonna non ci sono")
    }
    page.close();
    browser.close();
}
setInterval(async function () {
    run("https://www.unieuro.it/online/Schede-grafiche/DUAL-RTX3060TI-O8G-pidASU60YV0G12M0NA00", 3060);
    run("https://www.unieuro.it/online/Schede-grafiche/DUAL-RTX3070-O8G-pidASU90YV0FQ0M0NA00", 3070);
  }, time);



