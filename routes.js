const routes = require('next-routes');

const myRoutes  = new routes()

myRoutes
    .add( '/campaigns/new', '/campaigns/new')
    .add( '/campaigns/:address/requests', '/campaigns/requests')
    .add( '/campaigns/:address/requests/new', '/campaigns/requests/new')
    .add( '/campaigns/:address', '/campaigns/show')

module.exports = myRoutes;

