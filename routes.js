const routes = require('next-routes');

const myRoutes  = new routes()

myRoutes
    .add( '/campaigns/new', '/campaigns/new')
    .add( '/campaigns/:address', '/campaigns/show')

module.exports = myRoutes;

