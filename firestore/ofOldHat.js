module.exports.tweet = () => {
    var ofOldModule = require('./db')
    var db = ofOldModule.script.firestore()
    const Twit = require('twit');
    const config = require('../config/ofOldHat');
    const Twitter = new Twit(config);

    ofOldHat = () => {
        let tweet = {
            status: 'test'
        }
        let books = ['1984', 'catcher-in-the-rye', 'fahrenheit-451', 'grapes-of-wrath', 'of-mice-and-men', 'orlando',
            'the-brother-karamazov', 'the-illiad', 'the-odyssey']
            // other book list []
        let bookLength = books.length;
        console.log('bookLength', bookLength)
        let randomBook =books[Math.floor(Math.random() * bookLength)]
        // let document = randomBook+
        let randomSubBook = Math.floor(Math.random()*7)+1;

        console.log('randomHome', randomBook+'-'+randomSubBook);
        var docRef = db.collection("verses").doc(randomBook+'-'+randomSubBook);
        docRef.get().then(function (doc) {
            if (doc.exists) {
                let verses = doc.data().data;
                let versesSize = verses.length - 1;
                let randomVerses = Math.floor(Math.random() * versesSize);
                console.log('random verses', randomVerses)
                console.log(verses[randomVerses])
                if(verses[randomVerses].length > 33){
                    tweet.status = verses[randomVerses].toLowerCase().replace(/[0-9]/g,'');
                    Twitter.post('statuses/update', tweet, tweeted)
                    function tweeted(err, data, response) {
                        if (err) {
                            console.log("Something went wrong!", err);
                        }
                        else {
                            console.log("Voila It worked!");
                        }
                    }
                }

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                // res.json({ status: false })
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }
    ofOldHat();
    setInterval(ofOldHat, 1000 * 660);
}
