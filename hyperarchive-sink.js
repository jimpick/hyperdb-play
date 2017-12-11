var hyperdrive = require('hyperdrive')
var swarm = require('hyperdiscovery')

var key = '3aa939890bf9735643828ca566c58b89e688b02e4e7468776076ad07782df466'

var archive = hyperdrive('./database', key)
archive.on('ready', function () {
  console.log('discoveryKey', archive.discoveryKey.toString('hex'))
  console.log('key', archive.key.toString('hex'))
  var sw = swarm(archive)
  sw.on('connection', function (peer, type) {
    // console.log('got', peer, type) 
    console.log('connected to', sw.connections.length, 'peers')
    peer.on('close', function () {
      console.log('peer disconnected')
    })
  })
})
