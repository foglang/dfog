'use strict';
var phantom = require('phantom');
var events = require('events');

var dfog = function(){

};
var p = dfog.prototype;
p.run = function(uri, cb){
    phantom.create(function (ph) {
        ph.createPage(function (page) {
            page.open(uri, function (status) {
                cb({state: "LOADED"});
                page.includeJs("http://code.jquery.com/jquery-2.1.3.min.js", function() { // This should be updated to a local file to avoid need for internet
                    cb({state: "DOWNLOADED_LIBS"});
                    page.includeJs(__dirname + "/include.js", function () {
                        cb({state: "PROCESSED"});
                        page.evaluate(function () {
                            var doc = document.documentElement.innerHTML;
                            doc = doc.substring(doc.indexOf("<body>") + 6);
                            return doc.substring(0, doc.indexOf("<script"));
                        }, function (result) {
                            cb({state: "DONE", page: result});
                            ph.exit();
                        });
                    });
                });
            });
        });
    }, {dnodeOpts: {weak: false}});
};
module.exports = dfog;
