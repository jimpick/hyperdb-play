var hyperdb = require('hyperdb')
var hyperdiscovery = require('hyperdiscovery')

// var key = '81b4f5e66bee5864775013b0daa4dabaf044bf3e89aab3017cfed7fe9531385a' // discovery
var key = '770d3668c54d8c881883259e084841eaff923cb6d05610d9e2fc7d765201a105'

var db = hyperdb('./my.db', key, {valueEncoding: 'utf-8'})

db.on('ready', function () {
  console.log('db.local.key', db.local.key.toString('hex'))

  var sw = hyperdiscovery(db, {live: true})
	sw.on('connection', function (peer, type) {
		// console.log('got', peer, type) 
		console.log('connected to', sw.connections.length, 'peers')
		peer.on('close', function () {
			console.log('peer disconnected')
		})
	})
})

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
