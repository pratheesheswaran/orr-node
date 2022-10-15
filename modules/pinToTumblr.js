module.exports.pinToTumblr = () => {
    var tumblr = require('tumblr.js');
    let Parser = require('rss-parser');
    let parser = new Parser();
    var admin = require("firebase-admin");
    var serviceAccount = require("../config/pintresttotumblr-firebase-adminsdk-2cw2p-eb1b426073.json");
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
    let db = admin.firestore();
    var client = tumblr.createClient({
        consumer_key: process.env.TUMBLR_CONSUMER_KEY,
        consumer_secret: process.env.TUMBLR_CONSUMER_SECRET,
        token: process.env.TUMBLR_TOKEN,
        token_secret: process.env.TUMBLR_TOKEN_SECRET,
    });

    let blogName = 'pappater';
    let params = {}

    async function doTumblrPhotoPost() {
        let feed = await parser.parseURL('https://in.pinterest.com/capecapricorn/pappater.rss');
      

        var docRef = db.collection("urls").doc("url");
        docRef.get().then(function (doc) {
            if (doc.exists) {
                console.log("dodododoc", doc.data().data);
                let exsitingUrl = doc.data().data;
                feed.items.forEach((item,index)=>{
                    if(index<=20){
                        let imageUrlFirstLvl = item.content.split("src=")[1].split("><")[0].replace("236x", "1200x");
                        console.log("imageUrlFirstLvl", imageUrlFirstLvl)
                        imageUrlFirstLvl = imageUrlFirstLvl.substring(1, imageUrlFirstLvl.length - 1);
                        params.source = imageUrlFirstLvl;
                        if (!exsitingUrl.includes(imageUrlFirstLvl)) {
                            console.log("no include");
                            // post to tumblr
                            client.createPhotoPost(blogName, params, function (err, resp) {
                                console.log("err", err); // your photo post is submitted to tumblr successfully.
                            });
                            // save to db
                            db.collection("urls").doc("url").set({
                                data: [...exsitingUrl,imageUrlFirstLvl ]
                            })
                                .then(() => {
                                    console.log("Document successfully written!");
                                })
                                .catch((error) => {
                                    console.error("Error writing document: ", error);
                                });
                        }
                    }
                })
              
               

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                res.json({ status: false })
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });

    };
    doTumblrPhotoPost();

} 