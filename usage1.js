var hyperdb = require('hyperdb')
var hyperdiscovery = require('hyperdiscovery')

var db = hyperdb('./my.db', {valueEncoding: 'utf-8'})

db.on('ready', function () {
  hyperdiscovery(db, {live: true}) 
})

db.put('/hello', 'world', function (err) {
  if (err) throw err
  db.get('/hello', function (err, nodes) {
    if (err) throw err
    console.log('/hello --> ' + nodes[0].value)
    console.log('db.local.discoveryKey', db.local.discoveryKey.toString('hex'))
    console.log('db.local.key', db.local.key.toString('hex'))
  })
})
