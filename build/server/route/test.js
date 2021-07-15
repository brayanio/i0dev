const server = require('../util/server.js')
const Service = require('../_service.js')

module.exports = server.post('test', async body => {
    if( body.random ) {
    console.log('test.random', body.max)
    return Service.Test.Random( body.max )
}
if( body.caps ) {
    console.log('test.caps', body.str)
    return Service.Test.Caps( body.str )
} 
})