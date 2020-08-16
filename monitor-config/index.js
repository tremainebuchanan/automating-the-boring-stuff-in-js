#!/usr/bin/env node
'use strict';

const util = require('util');
const exec  = util.promisify(require('child_process').exec);

const commands = {
    connected: 'xrandr -q'
}
async function start(){
    const { stderr, stdout} = await execCommand(commands["connected"])
    const displays = stdout.split(/\r\n|\r|\n/g);
    let list = [];
    // get the list of connected devices
    const len = displays.length;
    for(let i = 0; i < len; i++){
        if(displays[i].indexOf('connected') > 1){
            if(displays[i+1].indexOf('connected') === -1){
                console.log(displays[i+1])
            }
        }
    }
    // for(let display of displays){
    //     if(display.indexOf('disconnected') === -1 && display !== ''){
    //         list.push(display)
    //     }
    // }
    // console.log(displays)
    // if(list[0].indexOf('primary') > 1){
    //     console.log('primary display active')
    //     console.log(`switching to ${list[1]}`)
 
    // }else{
    //     console.log('primary display not active. no need to switch')        
    // }

    //const { ste, std } = await execCommand(commands["detailed"]);
    //console.log(std)

    // const { ste, std } = await execCommand(commands["connected"]);
    // const details = std.split(/\r\n|\r|\n/g);
    // console.log(details)
}

start()


async function execCommand(command){
    const { stdout, stderr } = await exec(command);
    return { stderr, stdout }
}

// get the current monitor xrandr --listmonitors
// if the current monitor is built in, 
//      switch to other monitor