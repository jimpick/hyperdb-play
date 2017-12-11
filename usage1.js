var hyperdb = require('hyperdb')
var hyperdiscovery = require('hyperdiscovery')

var db = hyperdb('./my.db', {valueEncoding: 'utf-8'})

db.on('ready', function () {
  var sw = hyperdiscovery(db, {live: true})
  sw.on('connection', function (peer, type) {
    // console.log('got', peer, type)
    console.log('connected to', sw.connections.length, 'peers')
    peer.on('close', function () {
      console.log('peer disconnected')
    })
  })
})

db.put('/hello', 'world3', function (err) {
  if (err) throw err
  db.get('/hello', function (err, nodes) {
    if (err) throw err
    console.log('/hello --> ' + nodes[0].value)
    console.log('db.local.discoveryKey', db.local.discoveryKey.toString('hex'))
    console.log('db.local.key', db.local.key.toString('hex'))
  })
})
