#!/usr/bin/env node
'use strict';
const { exec } = require('child_process');
exec('xrandr -q | grep "connected"', (error, stdout, stderr) => {
    if(error) {
        console.error(`exec error: ${error}`)
        return;
    }
    if(stderr) console.error(`${stderr}`);
    const lines = stdout.split(/\r\n|\r|\n/g);
    if(lines[0].indexOf('primary') > 1){
        console.log('primary display active')
        console.log(`switching to ${lines[1]}`)
    }else{
        console.log('primary display not active')
        
    }
    //console.log(stdout);
});

// get the current monitor xrandr --listmonitors
// if the current monitor is built in, 
//      switch to other monitor