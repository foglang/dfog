#!/usr/bin/env node
'use strict';
var meow = require('meow');
var dfog = require('./');
var fs = require('fs');
var cli = require('cli').enable("status", "help", "version");
cli.setApp("dfog", "0.0.0");

cli.parse({
    wait:  ['w', 'Time to wait on post load actions in browser', 'number', 0]
});

cli.main(function(args, options) {
    cli.debug(JSON.stringify(args));
    cli.debug(JSON.stringify(options));

    if(args[0] != null){
        fs.exists(args[0], function(exists) {
            if (exists) {
                cli.ok("Found input file.");
            }
            else{
                cli.fatal("Input file does not exist.");
            }
        });
    }
    else{
        cli.info("dfog code normalizer");
    }
});
