const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = new express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3002;
var router = express.Router();
var router = require('./router/index');
app.use('/', router);
var cron = require('node-cron');
require('dotenv').config();
const { pinToTumblr } = require('./modules/pinToTumblr');

// app.use(express.static("build"));
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/', function (req, res) {
    // res.send('Server is up')
    res.sendFile(path.join(__dirname + '/build/index.html'));

});

if (true) {
    // scriptEcho prod 0 * * * *
    var scriptEcho = require('./firestore/scriptEcho')
    scriptEcho.tweet();
    // cron.schedule("20 * * * * ", () => {
    //     scriptEcho.tweet();
    // });
    // adas

    // of Old Had prod
    var ofOldHat = require('./firestore/ofOldHat')
    // ofOldHat.tweet();
    cron.schedule("20 * * * * ", () => {
        ofOldHat.tweet();
    });

    // gooseWritings prod
    var gooseWritings = require('./modules/gooseWritings');
    // gooseWritings.goose();
    cron.schedule("0 */6 * * *", () => {
        gooseWritings.goose();
    });

    // fuckWithWord prod
    var fuckWithWord = require('./firestore/fuckWithWord')
    // fuckWithWord.tweet();
    cron.schedule("29 * * * *", () => {
        fuckWithWord.tweet();
    });

    // typewriter news prod
    var typewriterNews = require('./modules/typewriterNews')
    // typewriterNews.tweet();
    cron.schedule("*/15 * * * *", () => {
        typewriterNews.tweet();
    });

    // hey kitty kitty prod
    var heyKittyKitty = require('./firestore/heyKittyKitty');
    // heyKittyKitty.tweet()
    cron.schedule("0 * * * *", () => {
        heyKittyKitty.tweet()
    });

    // sametypewriter prod 
    var sameTypewriter = require('./modules/sameTypewriter');
    // sameTypewriter.tweet();
    cron.schedule("0 */12 * * *", () => {
        sameTypewriter.tweet();
    });

    // cron.schedule("*/1 * * * * *", () => {
    //     console.log("pintotumblr sgarts");
    //     pinToTumblr();
    // });


    // // usSlashUi prod
    // var uxSlashUi = require('./modules/uxSlashUi');
    // cron.schedule("*/15 * * * *", () => {
    //     uxSlashUi.tweet();
    // });

    // cron.schedule("20 * * * * ", () => {

    // });

}


// // // scrapDribb 
// var scrapDribb = require('./modules/dribb');
// scrapDribb.scrapDrib()
// cron.schedule('0 */24 * * *', () => {

// });

// // sadLog.txt 
// var sadLog = require('./modules/sadLog');
// sadLog.logSad()

// add words to scriptEcho 
// var addWordsToScript= require('./modules/addDataScriptEcho')
// addWordsToScript.addWords();

// add verses to ofOldHat
// var versesOfOldHat = require('./modules/markovChain');
// versesOfOldHat.markovChain();

// var sendMail = require('./modules/sendMail');
// sendMail.sendMail()
// var fyodoarCrawler= require('./modules/fyodorDestoyevsky')
// fyodoarCrawler.crawl()
// var tumblrAudio = require('./modules/tumblrAudio');
// tumblrAudio.crawl();
app.listen(port, () => {
    console.log('server is running up')
})
