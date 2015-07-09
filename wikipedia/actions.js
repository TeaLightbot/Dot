var https = require("https");

(function(actions) {
    actions.query = function(bot, from, to, text, split, sendTo){
        var options = {
            accept: '*/*',
            host: 'en.wikipedia.org',
            port: 443,
            path: '/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + split.slice(1).join("%20")
        };
        var response = "";
        https.get(options, function(res) {
            console.log("Got response: " + res.statusCode);

            res.on("data", function(chunk) {
                response += chunk;
                console.log("BODY: " + chunk);
            });

            res.on("end", function() {
                response = JSON.parse(response);
                
                extract = response.query.pages[Object.keys(response.query.pages)[0]].extract;
                bot.emit("response", from + ": " + extract || "Page not found.", sendTo);
            });
        }).on('error', function(e) {
            console.log("Got error: " + e.message);
        });
    };
})(module.exports)