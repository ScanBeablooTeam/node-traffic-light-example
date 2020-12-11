## node-traffic-light-example

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the index file with the code you have commented / uncommented


### Fucntions in this script

To set a relay to on or off you can use:
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
`getIoState` get a 'ASCII' hex code from the brainbox and converts it into binary, should you want get the state of the io

NOTE:
We found that if all relays are off it will return `11111111` or `00000000` (8 bytes) depending on the state of Dln lines. This will not include the relays since they are all off.

If any of the relays are on then you will recive 12 bytes. The first 4 bytes are the relays. <br />
`100011111111` < in this example relay 0 is set to 1 <br />
`101011111111` < in this example relays 0 and 2 are set to 1
