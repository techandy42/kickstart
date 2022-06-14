// exports a function that allows next pages to have dynamic routes

// second set of paratheses return a function
const routes = require('next-routes')()

// :varname specifies the parameter being passed to the link string
// first string: link / second string: directory in the folder structure
routes
  .add('/campaigns/new', '/campaigns/new')
  .add('/campaigns/:address', '/campaigns/show')
  .add('/campaigns/:address/requests', '/campaigns/requests/index')
  .add('/campaigns/:address/requests/new', '/campaigns/requests/new')

module.exports = routes
