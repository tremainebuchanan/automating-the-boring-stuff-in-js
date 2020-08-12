#!/usr/bin/env node
'use strict';
const { exec } = require('child_process');
exec('xrandr --output HDMI-1 --primary --mode 1920x1080 --rate 60.00 --output eDP-1 --off', (error, stdout, stderr) => {
    if(error) {
        console.error(`exec error: ${error}`)
        return;
    }
    if(stderr) console.error(`${stderr}`);
});