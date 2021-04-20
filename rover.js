const Message = require('./message.js');
const Command = require('./command.js');
class Rover {
  constructor(position, mode, generatorWatts = 110) {
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }
   receiveMessage(message) {
   let response = {
     message: message.name,
     results: []
   }  
   for(let i=0; i< message.commands.length; i++) {
     if(message.commands[i].commandType === 'STATUS_CHECK') {
       response.results.push({completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}
       })
     }
     else if(message.commands[i].commandType === 'MODE_CHANGE') {
       this.mode = message.commands[i].value;
       response.results.push({completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}});
      }
      else if(message.commands[i].commandType === 'MOVE') {
       if(this.mode !== 'LOW_POWER') {
         this.position = message.commands[i].value;
         response.results.push({completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}
       })
       }else if(this.mode === 'LOW_POWER') {
         response.results.push({completed: false, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}})
       }
      
      }
   }  
  return response;
   }
}

module.exports = Rover;