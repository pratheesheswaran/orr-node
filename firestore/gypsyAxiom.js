module.exports.tweet = () => {

    var gypsyModule = require('./db')
    var db = gypsyModule.gypsy.firestore();
    let filmList = ['dunkirk', 'forrest-gump', 'moonlight', 'no-country-for-old-men', 'pulp-fiction', 'spotlight', 'blood-diamond'
        , 'django-unchained', 'fight-club', 'inglourious-basterds', 'cuckoo-nest', 'reservoir-dogs', 'monte-cristo', 'godfather'
        , 'grand-budapest', 'godfather-2', 'catch-22', 'catch-me-if-you-can', 'hacksaw-ridge', 'inception', 'into-the-wild', '1984'
        , 'rango', 'the-grapes-of-wrath', 'to-kill-a-mokingbird', 'whiplash']

    const Twit = require('twit');
    const config = require('../config/twit');
    const Twitter = new Twit(config);

    tweetSaying = () => {
        let tweet = {
            status: ''
        }
        // getting data from firebase 

        let totalFilmList = filmList.length
        let randomFilm = Math.floor(Math.random() * totalFilmList)
        console.log(filmList[randomFilm])
        var docRef = db.collection("words").doc(filmList[randomFilm]);
        docRef.get().then(function (doc) {
            if (doc.exists) {
                let sayings = doc.data().data;
                let totalSayings = sayings.length - 1;
                let randomSaying = Math.floor(Math.random() * totalSayings) + 1
                console.log('total sayings', sayings.length)
                console.log('random saying id', randomSaying)
                console.log(sayings[randomSaying])
                // res.json({ status: true, sayings: sayings[randomSaying], film: filmList[randomFilm] })
                tweet.status = sayings[randomSaying] // .replace(/ /g, "")
                Twitter.post('statuses/update', tweet, tweeted)
                function tweeted(err, data, response) {
                    if (err) {
                        console.log("Something went wrong!", err);
                    }
                    else {
                        console.log("Voila It worked!");
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
    tweetSaying();
    setInterval(tweetSaying, 1000 * 900);
}
