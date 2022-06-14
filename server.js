const { createServer } = require('http')
const next = require('next')

// changes the behaviour of the server
const app = next({
  dev: process.env.NODE_ENV !== 'production',
})

const routes = require('./routes')
const handler = routes.getRequestHandler(app)

app.prepare().then(() => {
  createServer(handler).listen(3000, (err) => {
    if (err) throw err
    console.log('Ready on http://localhost:3000')
  })
})
