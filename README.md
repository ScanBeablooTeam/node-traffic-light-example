## node-traffic-light-example

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the index file with the code you have commented / uncommented


### Fucntions in this script

To set a replay to on or off you can use:
```javascript
toggleRelay(0, 1) // turn relay 0 on
```
`toggleRelay` takes 2 arguments:
- relay > The index of the relay you want to target
- state > The state you want to set it too e.g. off = 0 and on = 1

To the current state of all the lines / relays on the Brainbox you can use;
```javascript
getIoState()
```
`getIoState` returns binary. Dln / Power are index 0-7 and the relays are 8-11

Example: Find the state of relay 0
```javascript

async function getRelay0 () {

  let ioState = await getioState();
  ioState = String(ioState); // convert to string

  const relay0 = ioState.slice(8,9) // extract relay 0's state
  
  // continue code here... e.g convert relay to an int with parseInt(relay0)

}

```