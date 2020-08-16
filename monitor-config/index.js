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
    let displayDetails = []
    for(let i = 0; i < len; i++){
        if(displays[i].indexOf('connected') > 1){
            if(displays[i+1].indexOf('connected') === -1){
                if(displays[i+1] !== '')
                    displayDetails.push(displays[i+1].split(/\s+/g))
            }
        }
    }
    for(let display of displays){
        if(display.indexOf('connected') > 1 && display !== ''){
            list.push(display)
        }
    }

    if(list[0].indexOf('primary') > 1){
        console.log('primary display active.switching to larger display')
        const command = generateCommand(list, displayDetails)
        execCommand(command)
 
    }else{
        console.log('primary display not active. no need to switch')        
    }
}

start()


async function execCommand(command){
    const { stdout, stderr } = await exec(command);
    return { stderr, stdout }
}

function generateCommand(displays, connectedDisplayDetails){
    let displayIds= [];
    let displayValues = [];
    let configs = [];
    for(let display of displays){
        let str;
        str = display.split(/\s+/g);
        displayIds.push(str[0]);
    }
    const displayDetails = connectedDisplayDetails.flat();

    for( let detail of displayDetails){
        if(detail !== "") displayValues.push(detail)
    }
    for(let j = 0; j < displayValues.length; j++){
        let value = displayValues[j];
        if(value.includes("x")){
            configs.push(value);
            configs.push(displayValues[j+1].slice(0,5));
        }
    }
    const command = `xrandr --output ${displayIds[1]} --primary --mode ${configs[2]} --rate ${configs[3]} --output ${displayIds[0]} --off`;
    return command;

}