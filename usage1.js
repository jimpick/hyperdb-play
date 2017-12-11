var hyperdb = require('hyperdb')
var hyperdiscovery = require('hyperdiscovery')

var nodes = {
  2: '9480f19b05299d50be41833699e7826b336cde39afcecab7664eaaf8fbf96994'
}

var db = hyperdb('./my.db', {valueEncoding: 'utf-8'})

db.on('ready', function () {
  console.log('Key', db.key.toString('hex'))
  /*
  db.authorize(nodes[2], function (err) {
    if (err) {
      console.error('Error', err)
      return
    }
    console.log('Node 2 authorized')
  })
  */
  var sw = hyperdiscovery(db, {live: true})
  sw.on('connection', function (peer, type) {
    // console.log('got', peer, type)
    console.log('connected to', sw.connections.length, 'peers')
    peer.on('close', function () {
      console.log('peer disconnected')
    })
  })
})

/*
db.put('/hello', 'world3', function (err) {
  if (err) throw err
})
*/

function get() {
  db.get('/hello', function (err, nodes) {
    if (err) throw err
    if (!nodes) {
      console.log('Node /hello not found')
    } else {
      console.log('/hello --> ' + nodes[0].value)
    }
  })
}

get()

db.watch('/hello', get)
