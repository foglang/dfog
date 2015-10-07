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
                page.includeJs(__dirname + "/include.js", function () {
                    page.evaluate(function () {
                        var doc = document.documentElement.innerHTML;
                        doc = doc.substring(doc.indexOf("<body>") + 6);
                        return doc.substring(0, doc.indexOf("<script"));
                    }, function (result) {
                        cb(null, result);
                        ph.exit();
                    });
                });
            });
        });
    }, {dnodeOpts: {weak: false}});
};
module.exports = dfog;
