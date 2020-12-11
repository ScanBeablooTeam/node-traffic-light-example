/**
 * Example code for brainboxes using ASCII commands
 */
const { EDDevice } = require('@brainboxes/io');


const device_ip_address = '80.3.134.131'; // the ip of the device you want to connect to (works with port forwarding: must edit the port in npm module)

// define a new device
const brainbox = new EDDevice(device_ip_address, 8, 8);

/** 
 * Set up event listeners
 * response
 * connect
 * disconnect
 * error
 */

// connect
brainbox.on('connect', () => console.log('connected to:', device_ip_address));

// disconnect
brainbox.on('disconnect', () => console.log('disconnected from:', device_ip_address));

// response
brainbox.on('response', data => console.log('recived data:', data));

// error
brainbox.on('error', err => console.log(`error on device ${device_ip_address}:`, err));


// connect to the device and then preform tasks.
brainbox.connect(() => {

  const targetRelay = 0; // the index of the relay you want to set [0, 1, 2, 3]
  const stateToSet = 0; // the state you want to set it to [0, 1]
  toggleRelay(targetRelay, stateToSet)
    .then(
      () => console.log(`success: set relay ${targetRelay} to state ${stateToSet}`),
      () => console.log(`error: failed to set relay ${targetRelay} to state ${stateToSet}`)
    )

  // getIoState()
  //   .then(response => {
  //     console.log(response)
  //     // do somthing with the respinse
  //   })

  return;

})


/**
 * Brainboxes fucntions
 * 
 * - toggleRelay(relay, state)
 * - getIoState()
 */

async function toggleRelay (relay, state) {

  // only 4 relays are avaibale [0,1,2,3] do nothing if invalid
  if (relay > 3) {
    console.log(`relay ${relay} is invalid`);
    return;
  };

  /**
   * Available commands
   * 
   * #01A001 – will toggle relay 0 closed
   * #01A101 – will toggle relay 1 closed
   * #01A201 – will toggle relay 2 closed
   * #01A301 – will toggle relay 3 closed
   * 
   * #01A000 – will toggle relay 0 open
   * #01A100 – will toggle relay 1 open
   * #01A200 – will toggle relay 2 open
   * #01A300 – will toggle relay 3 open
   */
  
  let command;
  switch (relay) {
    case 0:
      state == 0 ? command = '#01A001' : command = '#01A000';
      break;
    
    case 1:
      state == 0 ? command = '#01A101' : command = '#01A100';
      break;
      
    case 2:
      state == 0 ? command = '#01A201' : command = '#01A200';
      break;

    case 3:
      state == 0 ? command = '#01A301' : command = '#01A300';
      break;

    default:
      console.log('bad command')
      return;
  }

  const response = await brainbox.sendCommand(command);
  return response;

}


async function getIoState () {
  
  // command @01 gets the state of all IO
  const deviceCurrentState = await brainbox.sendCommand('@01');

  return (parseInt(deviceCurrentState, 16).toString(2)).padStart(8, '0') // convert hex to binary 

}
