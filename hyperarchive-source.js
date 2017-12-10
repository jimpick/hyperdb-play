var hyperdrive = require('hyperdrive')
var swarm = require('hyperdiscovery')

var archive = hyperdrive('./database')
archive.on('ready', function () {
  console.log('discoveryKey', archive.discoveryKey.toString('hex'))
  console.log('key', archive.key.toString('hex'))
  var sw = swarm(archive)
  sw.on('connection', function (peer, type) {
    console.log('got', peer, type) 
    console.log('connected to', sw.connections.length, 'peers')
    peer.on('close', function () {
      console.log('peer disconnected')
    })
  })
})
