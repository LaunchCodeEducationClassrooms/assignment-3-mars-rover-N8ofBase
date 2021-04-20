const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it('constructor sets position and default values for mode and generatorWatts', function() {
    let rover = new Rover(98382);
    expect(rover.position).toEqual(98382);
  });

  it('response returned by receiveMessage contains name of message', function() {
    let rover = new Rover(98382)
      let commands = [
       new Command('MOVE', 4321),
       new Command('STATUS_CHECK'),
       new Command('MODE_CHANGE', 'LOW_POWER'),
       new Command('MOVE', 3579),
       new Command('STATUS_CHECK')
    ];
    let message = new Message('TA power',commands);
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual('TA power');
  });

  it('response returned by receiveMessage includes two results if two commands are sent in the message', function() {
    let rover = new Rover(100)
    let commands = [
       new Command('MOVE', 4321),
       new Command('STATUS_CHECK')
    ];
    let message = new Message('TA power',commands);
    let response = rover.receiveMessage(message);
      expect(response.results[0].roverStatus.position).toEqual(4321)
      expect(response.results[1].completed).toEqual(true)
     });

  it('responds correctly to status check command', function() {
    let rover = new Rover(100)
    let commands = [
       new Command('STATUS_CHECK'),
    ];
    let message = new Message('TA power',commands);
    let response = rover.receiveMessage(message);
      expect(response.results[0].roverStatus.position).toEqual(100);
  });

  it('responds correctly to mode change command', function() {
    let rover = new Rover(100)
    let commands = [
       new Command('MODE_CHANGE', 'LOW_POWER'),
    ];
    let message = new Message('TA power',commands);
    let response = rover.receiveMessage(message);
      expect(response.results[0].completed).toEqual(true);
  });

  it('responds with false completed value when attempting to move in LOW_POWER mode', function() {
     let rover = new Rover(100)
    let commands = [
       new Command('MOVE', 4321),
       new Command('STATUS_CHECK'),
       new Command('MODE_CHANGE', 'LOW_POWER'),
       new Command('MOVE', 3579),
       new Command('STATUS_CHECK')
    ];
    let message = new Message('TA power',commands);
    let response = rover.receiveMessage(message);
    expect(response.results[3].completed).toEqual(false);
  });

  it('responds with position for move command', function() {
    let rover = new Rover(100)
    let commands = [
       new Command('MOVE', 4321),
       new Command('STATUS_CHECK'),
       new Command('MODE_CHANGE', 'LOW_POWER'),
       new Command('MOVE', 3579),
       new Command('STATUS_CHECK')
    ];
    let message = new Message('TA power',commands);
    let response = rover.receiveMessage(message);
    expect(response.results[0].roverStatus.position).toEqual(4321);
  });

});

