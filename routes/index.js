var express = require('express');
const puppeteer = require('puppeteer-extra')
var router = express.Router();

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

console.log("CRAWLER START");
  let testVal;
  let baseVal = 0;
  let coin_price = [{
    coin_name : "BTC",
    coin_price : "loading"
  }];
  let browser, page;
  const doPuppeteer = {
    async open() {
  browser = await puppeteer.launch({ headless: false }); // headless 

  page = await browser.newPage(); //new page open
  await page.setViewport({
    width: 1920,
    height: 1080
})
  await page.setDefaultNavigationTimeout(0);


  await page.goto("https://www.binance.com/kr/trade/BTC_USDT");
  await page.waitFor(100);
 // await page.waitForSelector('#__next > div > header > div.css-1jcgxc0 > div');
  await page.hover('#__next > div > header > div.css-1jcgxc0 > div');

  await page.click('div.css-13019sn > div:nth-child(29)');
  await page.waitForSelector('.SZUwG > span');

},
async getText() {
  return page.evaluate(() => {
    return document.querySelector('.SZUwG > span').innerText;
    });
  }
};

async function conText() {
await doPuppeteer.open();
const fiValue = await doPuppeteer.getText();
//console.log(fiValue)
console.log("CRAWLERING COMPLETE")

setInterval(async () => {
  const fiValue = await doPuppeteer.getText();

//  console.log(fiValue)
  // console.log('BTC :',fiValue );
  coin_price[0].coin_price = fiValue;
}, 1000);

};

conText();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api', function (req, res, next) {
  var ranNum = Math.floor(Math.random() * 10) + 1;
  // var jform = {
  //   "coin_name" : "BTC",
  //   "coin_price" : fiValue
  
  // };
  res.status(200).json(coin_price)
})
module.exports = router;
