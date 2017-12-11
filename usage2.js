var hyperdb = require('hyperdb')
var hyperdiscovery = require('hyperdiscovery')

var key = 'aec2cc36287348181ada65ad635238cc98f33e5636c1e4eabda115e3c871545a'

var db = hyperdb('./my.db', key, {valueEncoding: 'utf-8'})

db.on('ready', function () {
  console.log('db.local.key', db.local.key.toString('hex'))
  setInterval(() => {
    put()
  }, 2000)
  setTimeout(() => {
    get()
    db.watch('/hello', get)
  }, 1000)

  var sw = hyperdiscovery(db, {live: true})
	sw.on('connection', function (peer, type) {
		// console.log('got', peer, type) 
		console.log('connected to', sw.connections.length, 'peers')
		peer.on('close', function () {
			console.log('peer disconnected')
		})
	})
})

function get () {
  db.get('/hello', function (err, nodes) {
    if (err) throw err
    if (!nodes) {
      console.log('Node /hello not found')
    } else {
      console.log('/hello --> ' + nodes[0].value)
    }
  })
}

function put () {
  db.put('/hello', 'world' + Math.floor(Math.random() * 1000), function (err) {
    if (err) throw err
  })
}

